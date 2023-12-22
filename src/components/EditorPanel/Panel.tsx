import './Panel.css';
import Editor from '../TextEditor/Editor';
import Explorer from '../Explorer/Explorer';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';

export interface Field {
  name: string;
  type: {
    name: string;
    kind: string;
  };
}

export interface SchemaData {
  name: string;
  description: string;
  type: {
    name: string;
    kind: string;
  };
}

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
  const [types, setTypes] = useState([]);

  // get types
  const getSchema = () => {
    const introspectionQuery = `
      query {
        __schema {
          queryType {
            fields {
              name
              description
              type {
                name
                kind
              }
            }
          }
        }
      }
    `;
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: introspectionQuery }),
    })
      .then((response) => {
        response.json().then(({ data }) => {
          const types = data.__schema.queryType.fields;
          setTypes(types);
        });
      })
      .catch((error) => console.error(error));
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
            {showExplorer ? (
              <Explorer types={types} endpoint={endpoint}></Explorer>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
