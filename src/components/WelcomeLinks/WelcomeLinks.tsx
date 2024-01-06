import React, { useContext } from 'react';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../../context/contextLanguage';
import style from './WelcomeLink.module.css';

function WelcomeLinks() {
  const { lan } = useLanguage();
  const loginValue = useContext<LoginContextType>(LoginContext);
  return (
    <>
      <div className={style.container}>
        {loginValue.login ? (
          <>
            <NavLink to="/graphiql" className={style.link}>
              {lan === 'en' ? 'Main Page' : 'Главная страница'}
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className={style.link}>
              {lan === 'en' ? 'Sign in' : 'Логин'}
            </NavLink>
            <NavLink to="/registration" className={style.link}>
              {lan === 'en' ? 'Sign up' : 'Регистрация'}
            </NavLink>
          </>
        )}
      </div>
    </>
  );
}

export default WelcomeLinks;
