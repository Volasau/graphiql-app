import React, { useContext } from 'react';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/contextLanguage';
import style from '../Layout/Layout.module.css';
function WelcomeLinks() {
  const { lan } = useLanguage();
  const loginValue = useContext<LoginContextType>(LoginContext);
  return (
    <div>
      {loginValue.login ? (
        <>
          <Link to="/graphiql" className={style.link}>
            {lan === 'en' ? 'Main Page' : 'Главная страница'}
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className={style.link}>
            {lan === 'en' ? 'Login' : 'Логин'}
          </Link>
          <Link to="/registration" className={style.link}>
            {lan === 'en' ? 'Registration' : 'Регистрация'}
          </Link>
        </>
      )}
    </div>
  );
}

export default WelcomeLinks;
