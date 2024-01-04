import { useNavigate } from 'react-router-dom';
import style from './Graphi.module.css';
import { useContext, useEffect } from 'react';
import EditorPanel from '../../components/EditorPanel/Panel';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../../functions/firebase';

function Graphi() {
  const loginValue = useContext<LoginContextType>(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        loginValue.setLogin(false);
        navigate('/');
      }
    });

    return () => unsubscribe();
  }, [navigate, loginValue]);

  useEffect(() => {
    if (!loginValue.login) {
      navigate('/login');
    }
  }, [loginValue.login, navigate]);
  return (
    <>
      <div data-testid="graphiql" className={style.container}>
        <h1>GraphiQL</h1>
      </div>
      <div className={style.editorPanel}>
        <EditorPanel></EditorPanel>
      </div>
    </>
  );
}

export default Graphi;
