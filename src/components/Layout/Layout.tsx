import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import style from './Layout.module.css';
import { useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';

function Layout() {
  //временно устанавливаем в ручную что пользователь не авторизован
  const auth = false;
  const [login, setLogin] = useState(false);
  //Context для смены языка
  const { lan, setLanguage } = useLanguage();

  //анимация хедера при скролле
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  window.addEventListener('scroll', handleScroll);

  const navigate = useNavigate();

  const handleGraphiQLClick = () => {
    if (!auth) {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    setLogin(false);
  };

  const handleLanClickEn = () => {
    setLanguage('en');
  };
  const handleLanClickRu = () => {
    setLanguage('ru');
  };

  return (
    <>
      <div>
        <header
          className={`${style.container} ${scrolling ? style.scrolling : ''}`}
        >
          <Link to="/" className={style.link}>
            {lan === 'en' ? 'Welcome' : 'Приветствие'}
          </Link>
          <Link
            className={style.link}
            onClick={handleGraphiQLClick}
            to={auth ? '/graphiql' : '/login'}
          >
            GraphiQL
          </Link>
          {login ? (
            <>
              <button onClick={handleLogoutClick} className={style.link}>
                OUT
              </button>
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
          <div className={style.link}>
            <button
              onClick={handleLanClickEn}
              className={lan === 'en' ? style.active : ''}
            >
              EN
            </button>
            <button
              onClick={handleLanClickRu}
              className={lan === 'ru' ? style.active : ''}
            >
              RU
            </button>
          </div>
        </header>
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
