import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import CodeMirror from '@uiw/react-codemirror';
import './Editor.css';
import { prettify } from '../../utils/prettifier';

interface EditorProps {
  value?: string;
  readonly?: boolean;
  onQueryChange?(code: string): void;
  onVariablesChange?(variables: string): void;
  onHeadersChange?(variables: string): void;
}

function Editor(props: EditorProps) {
  const { value, onVariablesChange, onQueryChange, readonly, onHeadersChange } =
    props;
  const { lan } = useLanguage();
  const [variablesVisible, setVariablesVisible] = useState(true);
  const [headersVisible, setHeadersVisible] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [text, setText] = useState(value);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');

  const codeChange = (value: string) => {
    setText(value);
    if (onQueryChange) {
      onQueryChange(value);
    }
  };

  useEffect(() => {
    if (readonly) {
      setText(value);
    }
  });

  const setInitialQuery = (event: React.MouseEvent<HTMLElement>) => {
    if (!event.target.innerText.trim().length) {
      setText('query Example {}');
    }
  };

  const variablesChange = (value: string) => {
    setVariables(value);
    if (onVariablesChange) {
      onVariablesChange(value);
    }
  };

  const headersChange = (value: string) => {
    setHeaders(value);
    if (onHeadersChange) {
      onHeadersChange(value);
    }
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
    setText(prettify(value));
  };

  return (
    <>
      <div className="max-width">
        {!readonly ? (
          <div
            title="Prettify"
            onClick={runPrettify}
            className="prettify-button"
          >
            <img className="icon" src="src/assets/images/prettifyIcon.png" />
          </div>
        ) : (
          <></>
        )}
        <CodeMirror
          className={
            readonly
              ? 'position-readonly width100 max-width CodeMirror'
              : 'width100 max-width CodeMirror '
          }
          value={text}
          height="320px"
          onChange={codeChange}
          onMouseDown={setInitialQuery}
        />
        {!readonly ? (
          <div className="flex-buttons">
            <div className="flex">
              <div
                className={
                  variablesVisible ? 'active tab-header' : 'tab-header'
                }
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
        ) : (
          <></>
        )}
        {!readonly && showParameters && variablesVisible ? (
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
            onChange={headersChange}
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
