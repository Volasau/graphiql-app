import './Panel.css';
import Editor from '../TextEditor/Editor';
import Viewer from '../ResponseViewer/Viewer';
import Explorer from '../Explorer/Explorer';
import { request, gql } from 'graphql-request';
import { ChangeEvent, useState } from 'react';

function EditorPanel() {
  const [showExplorer, setShowExplorer] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  //const endpoint = 'https://rickandmortyapi.com/graphql';
  const [fields, setFields] = useState([]);

  // get fields from type Character
  const getSchema = () => {
    const introspectionQuery = gql`
      query {
        __type(name: "Character") {
          name
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    `;
    request(endpoint, introspectionQuery)
      .then((data) => {
        const t = data.__type.fields;
        setFields(t);
      })
      .catch((error) => console.error(error));
  };

  const apiChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const explorerClickHandler = () => {
    setShowExplorer(!showExplorer);
  };

  return (
    <>
      <div className="width100">
        <div className="flex color-light baseline">
          <div title="Run" className="run-button">
            <img className="icon" src="src/assets/images/runIcon.png" />
          </div>
          <div title="Prettify" className="prettify-button padding-top-small">
            <img className="icon" src="src/assets/images/prettifyIcon.png" />
          </div>
        </div>
        <div className="flex api-block">
          <span className="margin-right-small">API: </span>
          <input
            className="margin-right-small input font-small"
            type="text"
            placeholder="enter API url..."
            onChange={apiChangeHandler}
          />
          <button className="button color-mediumlight" onClick={getSchema}>
            Get schema
          </button>
        </div>
        <div className="color-light flex-wrap">
          <Editor></Editor>
          <Viewer widthHalf={showExplorer}></Viewer>
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
            {showExplorer ? <Explorer fields={fields}></Explorer> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
