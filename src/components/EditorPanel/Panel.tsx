import './Panel.css';
import Editor from '../TextEditor/Editor';
import { ChangeEvent, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import { Suspense, lazy } from 'react';
import { ResponseError, SchemaObject } from '../../utils/types';
import { fetchSchema } from './SchemaAPI';
import { ToastContainer, toast } from 'react-toastify';
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

  const showToast = (error: string) => {
    toast.error(
      lan === 'en'
        ? `Error fetching data: \n for ${endpoint} \n ${error}. \n  Please make sure the url is valid and you have access.`
        : `Ошибка получения данных: \n для ${endpoint} \n ${error}. \n  Убедитесь в правильности и доступности адреса.`
    );
  };

  const errorHandler = (err: ResponseError) => {
    setErrorResult(true);
    const errMessage = err.locations
      ? `Error: ${err.message} at line ${err.locations[0].line}, column ${err.locations[0].column}`
      : `Error: ${err.message}`;
    setResult(errMessage);
  };

  const getSchema = async () => {
    if (endpoint.trim() !== '') {
      const { error, result } = await fetchSchema(endpoint);
      if (error) {
        toast.error(
          lan === 'en'
            ? `Error fetching schema: \n for ${endpoint} \n ${error}. \n  Please make sure the url is valid and you have access.`
            : `Ошибка получения схемы: \n для ${endpoint} \n ${error}. \n  Убедитесь в правильности и доступности адреса.`
        );
      }
      setObjects(result);
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
        response
          .json()
          .then((res) => {
            if (response.ok) {
              setResult(
                JSON.stringify(res.data ? res.data : 'Do data found', null, 3)
              );
              setErrorResult(false);
            } else {
              const errMessage = res.errors
                ? res.errors[0]
                : res.message
                  ? res
                  : { message: 'Failed to fetch data' };
              errorHandler(errMessage);
            }

            // in case errors appear in response with ok status
            if (res.errors?.length) {
              errorHandler(res.errors[0]);
            }
          })
          .catch((error) => {
            showToast(error);
          });
      })
      .catch((error) => {
        showToast(error);
      });
  };

  const apiChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEndpoint(event.target.value);
  };

  const explorerClickHandler = () => {
    if (objects.length) {
      setShowExplorer((prev) => !prev);
    }
  };

  return (
    <>
      <div data-testid="panel" className="max-width">
        <ToastContainer />
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
