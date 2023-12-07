import { useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import './Editor.css';

function Editor() {
  const { lan } = useLanguage();
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
              {lan === 'en' ? 'Variables' : 'Переменные'}
            </div>
            <div
              className={headersVisible ? 'active tab-header' : 'tab-header'}
              onClick={headersClickHandler}
            >
              {lan === 'en' ? 'Headers' : 'Заголовки'}
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
            placeholder={
              lan === 'en' ? 'enter variables...' : 'введите переменные...'
            }
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
            placeholder={
              lan === 'en' ? 'enter headers...' : 'введите заголовки...'
            }
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
