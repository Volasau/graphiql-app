import './Panel.css';
import Editor from '../TextEditor/Editor';
// import Explorer from '../Explorer/Explorer';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import { getIntrospectionQuery } from 'graphql';
import { Suspense, lazy } from 'react';
const DocumentationSchema = lazy(
  () => import('../DocumentationSchema/DocumentationSchema')
);

export interface SchemaObjectField {
  name: string;
  type: string;
}

export interface SchemaObject {
  name: string;
  type: string;
  args: SchemaObjectField[];
  fields: SchemaObjectField[] | undefined;
}

export interface TypeObject {
  name: string;
  kind: string;
  ofType: TypeObject;
}

export interface SchemaFieldData {
  args: [];
  name: string;
  description: string;
  isDeprecated: boolean;
  deprecationReason: string;
  type: TypeObject;
}

export interface InputFieldData {
  name: string;
  description: string;
  defaultValue: unknown; //???
  type: TypeObject;
}

export interface SchemaTypeData {
  description: string;
  enumValues: [];
  fields: [];
  inputFields: InputFieldData[];
  interfaces: [];
  kind: string;
  name: string;
  possibleTypes: [];
}

const getType = (obj: TypeObject): string => {
  if (obj.kind === 'OBJECT') {
    return obj.name;
  }
  return obj.ofType ? getType(obj.ofType) : '';
};

const getFieldType = (obj: TypeObject): string => {
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
  //const [clientSchema, setClientSchema] = useState<string | null>(null);
  const fetchSchema = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: getIntrospectionQuery(),
        }),
      });

      const schemaJSON = await response.json();
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

      arrTypes.map((item: SchemaFieldData) => {
        schemaTypes.push({
          name: item.name,
          type: item.type.name || '[' + getType(item.type) + ']',
          args: item.args.map((el: InputFieldData) => {
            return {
              name: el.name,
              type: getFieldType(el.type),
            };
          }),
          fields: allTypes
            .filter((el) => el.name === getType(item.type))
            .at(0)
            ?.fields.map((elem: SchemaFieldData) => {
              return {
                name: elem.name,
                type: getFieldType(elem.type),
              };
            }),
        });
      });

      // add input objects
      allTypes.map((item: SchemaTypeData) => {
        if (item.kind === 'INPUT_OBJECT') {
          schemaTypes.push({
            name: item.name,
            type: item.name,
            args: [],
            fields: item.inputFields.map((elem: InputFieldData) => {
              return {
                name: elem.name,
                type: getFieldType(elem.type),
              };
            }),
          });
        }
      });

      setObjects(schemaTypes);
    } catch (error) {
      console.error('Error fetching schema:', error);
    }
  };

  const getSchema = () => {
    if (endpoint.trim() !== '') {
      fetchSchema();
      setShowExplorer(true);
    }
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
    if (objects.length) {
      setShowExplorer(!showExplorer);
    }
  };

  return (
    <>
      <div data-testid="panel" className="max-width">
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
          <button
            onClick={getSchema}
            className="link btn"
            disabled={!endpoint.trim().length}
          >
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
            <button
              onClick={explorerClickHandler}
              className="link btn height30"
              disabled={!objects.length}
            >
              {lan === 'en'
                ? showExplorer
                  ? 'collapse'
                  : 'expand'
                : showExplorer
                  ? 'свернуть'
                  : 'развернуть'}
            </button>
            <Suspense fallback={<p>Loading schema...</p>}>
              {showExplorer && objects.length ? (
                <DocumentationSchema objects={objects} />
              ) : (
                <></>
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
