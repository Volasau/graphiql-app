import { useNavigate } from 'react-router-dom';
import style from './Graphi.module.css';
import { useEffect } from 'react';
import EditorPanel from '../../components/EditorPanel/Panel';

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
        <EditorPanel></EditorPanel>
      </div>
    </>
  );
}

export default Graphi;
