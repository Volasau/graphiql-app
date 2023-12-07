import { useState } from 'react';
import './Editor.css';

function Editor() {
  const [variablesVisible, setVariablesVisible] = useState(true);
  const [headersVisible, setHeadersVisible] = useState(false);
  const [showParameters, setShowParameters] = useState(false);

  const variablesClickHandler = () => {
    setVariablesVisible(true);
    setHeadersVisible(false);
  };

  const headersClickHandler = () => {
    setHeadersVisible(true);
    setVariablesVisible(false);
  };

  const parametersClickHandler = () => {
    setShowParameters(!showParameters);
  };

  return (
    <>
      <div className="max-width">
        <textarea
          cols={100}
          rows={20}
          className="paddingSmall font-small border width100"
        ></textarea>
        <div className="flex-buttons">
          <div className="flex">
            <div
              className={variablesVisible ? 'active tab-header' : 'tab-header'}
              onClick={variablesClickHandler}
            >
              Variables
            </div>
            <div
              className={headersVisible ? 'active tab-header' : 'tab-header'}
              onClick={headersClickHandler}
            >
              Headers
            </div>
          </div>
          <div
            title={showParameters ? 'collapse' : 'expand'}
            className="arrow-button"
            onClick={parametersClickHandler}
          >
            <img
              className="icon"
              src={
                showParameters
                  ? 'src/assets/images/collapseVerticalIcon.png'
                  : 'src/assets/images/expandVerticalIcon.png'
              }
            />
          </div>
        </div>
        {showParameters && variablesVisible ? (
          <textarea
            id="variables"
            placeholder="enter variables..."
            cols={100}
            rows={10}
            className="paddingSmall font-small border width100"
          ></textarea>
        ) : (
          <></>
        )}
        {showParameters && headersVisible ? (
          <textarea
            id="headers"
            placeholder="enter headers..."
            cols={100}
            rows={10}
            className="paddingSmall font-small border width100"
          ></textarea>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Editor;
