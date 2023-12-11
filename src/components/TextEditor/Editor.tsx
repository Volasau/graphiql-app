import { useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import CodeMirror from '@uiw/react-codemirror';
import './Editor.css';
import { prettify } from '../../utils/prettifier';

interface EditorProps {
  onQueryChange(code: string): void;
  onVariablesChange(variables: string): void;
}

function Editor(props: EditorProps) {
  const { lan } = useLanguage();
  const [variablesVisible, setVariablesVisible] = useState(true);
  const [headersVisible, setHeadersVisible] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [value, setValue] = useState('');
  const [variables, setVariables] = useState('');
  const headers = '';

  const codeChange = (value: string) => {
    setValue(value);
    props.onQueryChange(value);
  };

  const variablesChange = (value: string) => {
    setVariables(value);
    props.onVariablesChange(value);
  };

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

  const runPrettify = () => {
    setValue(prettify(value));
  };

  return (
    <>
      <div className="max-width">
        <div title="Prettify" onClick={runPrettify} className="prettify-button">
          <img className="icon" src="src/assets/images/prettifyIcon.png" />
        </div>
        <CodeMirror
          className="width100 max-width CodeMirror"
          value={value}
          height="320px"
          onChange={codeChange}
        />
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
          <CodeMirror
            className="paddingSmall font-small border width100 max-width"
            value={variables}
            onChange={variablesChange}
            height="100px"
            width="600px"
            placeholder={
              lan === 'en' ? 'enter variables...' : 'введите переменные...'
            }
          />
        ) : (
          <></>
        )}
        {showParameters && headersVisible ? (
          <CodeMirror
            className="paddingSmall font-small border width100 max-width"
            value={headers}
            height="100px"
            width="600px"
            placeholder={
              lan === 'en' ? 'enter headers...' : 'введите заголовки...'
            }
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Editor;
