import './Panel.css';
import Editor from '../TextEditor/Editor';
import Viewer from '../ResponseViewer/Viewer';
import { useState } from 'react';
import Explorer from '../Explorer/Explorer';

function EditorPanel() {
  const [showExplorer, setShowExplorer] = useState(false);

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
            {showExplorer ? <Explorer></Explorer> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditorPanel;
