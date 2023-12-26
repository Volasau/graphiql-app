import './Panel.css';
import Editor from '../TextEditor/Editor';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import DocumentationSchema from '../DocumentationSchema/DocumentationSchema';

export interface SchemaObject {
  name: string;
  type: string;
  args: [];
  fields: [];
}

export interface SchemaFieldData {
  args: [];
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
  type: {
    name: string;
    kind: string;
    ofType: object;
  };
}

export interface SchemaTypeData {
  description: string;
  enumValues: [];
  fields: [];
  inputFields: [];
  interfaces: [];
  kind: string;
  name: string;
  possibleTypes: [];
}

const getType = (obj): string => {
  if (obj.kind === 'OBJECT') {
    return obj.name;
  }
  return obj.ofType ? getType(obj.ofType) : '';
};

const getFieldType = (obj): string => {
  if (obj.name !== null) {
    return obj.name;
  }
  return obj.ofType ? getFieldType(obj.ofType) : '';
};

function EditorPanel() {
  const { lan } = useLanguage();
  const [showExplorer, setShowExplorer] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [result, setResult] = useState('');
  const [errorResult, setErrorResult] = useState(false);
  //const endpoint = 'https://rickandmortyapi.com/graphql';
  const [objects, setObjects] = useState<SchemaObject[]>([]);

  // get types
  const getSchema = () => {
    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    })
      .then((res) => res.json())
      .then((schemaJSON) => {
        const introspectionData = schemaJSON.data.__schema;
        const queryType = introspectionData.queryType.name;
        let arrTypes: SchemaFieldData[] = [];
        const schemaTypes: SchemaObject[] = [];
        const allTypes: SchemaTypeData[] = [];
        introspectionData.types.map((item: SchemaTypeData) => {
          if (item.name === queryType) {
            arrTypes = item.fields;
          }
        });
        introspectionData.types.map((item: SchemaTypeData) => {
          if (item.kind !== 'SCALAR') {
            allTypes.push(item);
          }
        });

        arrTypes.map((item) => {
          schemaTypes.push({
            name: item.name,
            type: item.type.name || '[' + getType(item.type) + ']',
            args: item.args.map((el) => {
              return {
                name: el.name,
                type: getFieldType(el.type),
              };
            }),
            fields: allTypes
              .filter((el) => el.name === getType(item.type))
              .at(0)
              ?.fields.map((elem) => {
                return {
                  name: elem.name,
                  type: getFieldType(elem.type),
                };
              }),
          });
        });
        setObjects(schemaTypes);
        return printSchema(buildClientSchema({ __schema: introspectionData }));
      })
      .catch((error) => console.error('Error:', error));
  };

  const runRequest = () => {
    const variablesJson = variables ? JSON.parse(variables) : null;
    const headersJson = headers
      ? JSON.parse(headers)
      : {
          'Content-Type': 'application/json',
        };

    fetch(endpoint, {
      method: 'POST',
      headers: headersJson,
      body: JSON.stringify({
        query: query,
        variables: variablesJson,
      }),
    })
      .then((response) => {
        response.json().then((res) => {
          if (response.ok) {
            setResult(JSON.stringify(res.data, null, 3));
          } else {
            const err = res.errors[0];
            setErrorResult(true);
            setResult(
              `Error: ${err.message} at line ${err.locations[0].line}, column ${err.locations[0].column}`
            );
          }
        });
      })
      .catch((error) => console.error(error));
  };

  const apiChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const queryChangeHandler = (value: string) => {
    setQuery(value);
  };

  const variablesChangeHandler = (value: string) => {
    setVariables(value);
  };

  const headersChangeHandler = (value: string) => {
    setHeaders(value);
  };

  const explorerClickHandler = () => {
    setShowExplorer(!showExplorer);
  };

  return (
    <>
      <div className="max-width">
        <div className="flex api-block flex-wrap">
          <span className="margin-right-small">API: </span>
          <input
            className="margin-right-small input font-small"
            type="text"
            placeholder={
              lan === 'en' ? 'enter API url...' : 'введите API url...'
            }
            onChange={apiChangeHandler}
          />
          <button onClick={getSchema} className="link btn">
            {lan === 'en' ? 'Get schema' : 'Получить схему'}
          </button>
          <button onClick={runRequest} className="link btn">
            {lan === 'en' ? 'Run request' : 'Выполнить запрос'}
          </button>
        </div>
        <div className="color-light flex-wrap">
          <Editor
            error={false}
            onQueryChange={queryChangeHandler}
            onVariablesChange={variablesChangeHandler}
            onHeadersChange={headersChangeHandler}
          ></Editor>
          <div className={showExplorer ? 'width-half topL' : 'width-full topL'}>
            <Editor value={result} readonly={true} error={errorResult}></Editor>
          </div>
          <div className="flex explorer-block">
            <div
              title={showExplorer ? 'collapse' : 'expand'}
              className="arrow-button"
              onClick={explorerClickHandler}
            >
              <img
                className="icon"
                src={
                  showExplorer
                    ? 'src/assets/images/collapseIcon.png'
                    : 'src/assets/images/expandIcon.png'
                }
              />
            </div>
            {showExplorer ? <DocumentationSchema types={objects} /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
