import './Panel.css';
import Editor from '../TextEditor/Editor';
import Viewer from '../ResponseViewer/Viewer';
import Explorer from '../Explorer/Explorer';
import { request, gql } from 'graphql-request';
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
  //const endpoint = 'https://rickandmortyapi.com/graphql';
  const [types, setTypes] = useState([]);

  // get fields from type Character
  const getSchema = () => {
    const introspectionQuery = gql`
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
    request(endpoint, introspectionQuery)
      .then((data) => {
        const types = data.__schema.queryType.fields;
        setTypes(types);
      })
      .catch((error) => console.error(error));
  };

  const runRequest = () => {
    const variablesJson = variables ? JSON.parse(variables) : null;
    const headersJson = headers ? JSON.parse(headers) : null;
    request(endpoint, query, variablesJson, headersJson)
      .then((data) => {
        setResult(JSON.stringify(data, null, 3));
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
      <div className="width100">
        <div className="flex api-block">
          <span className="margin-right-small">API: </span>
          <input
            className="margin-right-small input font-small"
            type="text"
            placeholder={
              lan === 'en' ? 'enter API url...' : 'введите API url...'
            }
            onChange={apiChangeHandler}
          />
          <button className="button color-mediumlight" onClick={getSchema}>
            {lan === 'en' ? 'Get schema' : 'Получить схему'}
          </button>
          <div title="Run request" className="run-button" onClick={runRequest}>
            <img className="icon" src="src/assets/images/runIcon.png" />
          </div>
        </div>
        <div className="color-light flex-wrap">
          <Editor
            onQueryChange={queryChangeHandler}
            onVariablesChange={variablesChangeHandler}
            onHeadersChange={headersChangeHandler}
          ></Editor>
          <Viewer widthHalf={showExplorer} value={result}></Viewer>
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
            {showExplorer ? <Explorer types={types} endpoint={endpoint}></Explorer> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
