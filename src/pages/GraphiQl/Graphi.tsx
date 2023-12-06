import { useNavigate } from 'react-router-dom';
import style from './Graphi.module.css';
import { useEffect } from 'react';
import Editor from '../../components/TextEditor/Editor';
import Viewer from '../../components/ResponseViewer/Viewer';
import Panel from '../../components/ToolsPanel/Panel';

function Graphi() {
  const auth = false;
  const navigate = useNavigate();

  useEffect(() => {
    // if (!auth) {
    //   navigate('/login');
    // }
  }, [auth, navigate]);
  return (
    <>
      <div className={style.container}>
        <h1>GraphiQL</h1>
      </div>
      <div className={style.editorPanel}>
        <Editor></Editor>
        <Panel></Panel>
        <Viewer></Viewer>
      </div>
    </>
  );
}

export default Graphi;
