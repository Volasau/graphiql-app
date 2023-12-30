import './Panel.css';
import Editor from '../TextEditor/Editor';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import { Suspense, lazy } from 'react';
import { ResponseError, SchemaObject } from '../../utils/types';
import { fetchSchema } from './SchemaAPI';
const DocumentationSchema = lazy(
  () => import('../DocumentationSchema/DocumentationSchema')
);

function EditorPanel() {
  const { lan } = useLanguage();
  const [showExplorer, setShowExplorer] = useState(false);
  const [endpoint, setEndpoint] = useState('');
  const [query, setQuery] = useState('');
  const [variables, setVariables] = useState('');
  const [headers, setHeaders] = useState('');
  const [result, setResult] = useState('');
  const [errorResult, setErrorResult] = useState(false);
  const [objects, setObjects] = useState<SchemaObject[]>([]);

  //const [clientSchema, setClientSchema] = useState<string | null>(null);

  const errorHandler = (err: ResponseError) => {
    setErrorResult(true);
    setResult(
      `Error: ${err.message} at line ${err.locations[0].line}, column ${err.locations[0].column}`
    );
  };

  const getSchema = async () => {
    if (endpoint.trim() !== '') {
      const schemaTypes = await fetchSchema(endpoint);
      setObjects(schemaTypes);
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
            setErrorResult(false);
          } else {
            errorHandler(res.errors[0]);
          }

          // in case errors appear in response with ok status
          if (res.errors?.length) {
            errorHandler(res.errors[0]);
          }
        });
      })
      .catch((error) => console.error(error));
  };

  const apiChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const explorerClickHandler = () => {
    if (objects.length) {
      setShowExplorer(!showExplorer);
    }
  };

  return (
    <>
      <div data-testid="panel" className="max-width">
        <div className="flexi api-block flex-wrap">
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
            className="link btn btn__adaptiv"
            disabled={!endpoint.trim().length}
          >
            {lan === 'en' ? 'Get schema' : 'Получить схему'}
          </button>
          <button onClick={runRequest} className="link btn btn__adaptiv">
            {lan === 'en' ? 'Run request' : 'Выполнить запрос'}
          </button>
        </div>
        <div className="color-light flex-wrap">
          <Editor
            error={false}
            onQueryChange={setQuery}
            onVariablesChange={setVariables}
            onHeadersChange={setHeaders}
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
