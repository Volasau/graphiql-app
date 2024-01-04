import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import CodeMirror from '@uiw/react-codemirror';
import collapseVerticalIcon from '../../assets/images/collapseVerticalIcon.png';
import expandVerticalIcon from '../../assets/images/expandVerticalIcon.png';
import './Editor.css';
import { prettify } from '../../utils/prettifier';

interface EditorProps {
  value?: string;
  readonly?: boolean;
  error?: boolean;
  onQueryChange?(code: string): void;
  onVariablesChange?(variables: string): void;
  onHeadersChange?(variables: string): void;
}

function Editor(props: EditorProps) {
  const {
    value,
    onVariablesChange,
    onQueryChange,
    readonly,
    error,
    onHeadersChange,
  } = props;
  const { lan } = useLanguage();
  const [variablesVisible, setVariablesVisible] = useState(true);
  const [headersVisible, setHeadersVisible] = useState(false);
  const [showParameters, setShowParameters] = useState(false);
  const [text, setText] = useState(value);
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [countClick, setCountClick] = useState(0);

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
  }, [readonly, value]);

  const setInitialQuery = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (countClick === 0 && !readonly) {
      if (!target.innerText.trim().length) {
        setText('query {}');
      }
    }
    setCountClick(1);
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

  const buttonTitle = showParameters
    ? lan === 'en'
      ? 'collapse'
      : 'Свернуть'
    : lan === 'en'
      ? 'expand'
      : 'Развернуть';

  const runPrettify = () => {
    if (text) {
      setText(prettify(text));
    }
  };

  return (
    <>
      <div className="max-width">
        {!readonly ? (
          <button onClick={runPrettify} className="link btn btn__pritter">
            {lan === 'en' ? 'Prettify' : 'Форматировать'}
          </button>
        ) : (
          <></>
        )}
        <CodeMirror
          className={readonly && error ? 'CodeMirror' : ''}
          value={text}
          readOnly={readonly}
          height="320px"
          onChange={codeChange}
          onMouseDown={setInitialQuery}
        />
        {!readonly ? (
          <div className="flex-buttons">
            <div className="flex">
              <button
                onClick={variablesClickHandler}
                className={variablesVisible ? 'active link btn' : 'link btn'}
              >
                {lan === 'en' ? 'Variables' : 'Переменные'}
              </button>
              <button
                onClick={headersClickHandler}
                className={headersVisible ? 'active link btn' : 'link btn'}
              >
                {lan === 'en' ? 'Headers' : 'Заголовки'}
              </button>
            </div>
            <div
              title={buttonTitle}
              className="arrow-button"
              onClick={parametersClickHandler}
            >
              <img
                className="icon"
                src={showParameters ? collapseVerticalIcon : expandVerticalIcon}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {!readonly && showParameters && variablesVisible ? (
          <CodeMirror
            className="paddingSmall font-small border width100 max-width variables"
            value={variables}
            onChange={variablesChange}
            height="100px"
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
