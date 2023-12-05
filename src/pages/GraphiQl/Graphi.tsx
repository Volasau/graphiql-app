import { useNavigate } from 'react-router-dom';
import style from './Graphi.module.css';
import { useEffect } from 'react';

function Graphi() {
  const auth = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate('/login');
    }
  }, [auth, navigate]);
  return (
    <>
      <div className={style.container}>
        <h1>GraphiQL</h1>
      </div>
    </>
  );
}

export default Graphi;
