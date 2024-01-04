import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import style from './Layout.module.css';
import { useContext, useEffect, useState } from 'react';
import { useLanguage } from '../../context/contextLanguage';
import { UserContext, UserContextType } from '../../context/authContext';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from '../../functions/firebase';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  const userValue = useContext<UserContextType>(UserContext);
  const loginValue = useContext<LoginContextType>(LoginContext);
  const { lan, setLanguage } = useLanguage();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        userValue.setUser(currentUser);
        loginValue.setLogin(true);
      }
    });
    return () => unsubscribe();
  }, [userValue, loginValue]);

  const handleGraphiQLClick = () => {
    if (!loginValue.login) {
      navigate('/login');
    }
  };

  const handleLogoutClick = async () => {
    if (loginValue.login) {
      try {
        await signOut(auth);
        userValue.setUser(null);
        loginValue.setLogin(false);
        toast.warning('User Logged Out Successfully');
        navigate('/');
      } catch (error) {
        toast.error(`${error}`);
      }
    }
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
        <ToastContainer />
        <header
          data-testid="header"
          className={`${style.container} ${scrolling ? style.scrolling : ''}`}
        >
          <Link to="/" className={style.link}>
            {lan === 'en' ? 'Welcome' : 'Приветствие'}
          </Link>
          <Link
            className={style.link}
            onClick={handleGraphiQLClick}
            to={loginValue.login ? '/graphiql' : '/login'}
          >
            GraphiQL
          </Link>
          {loginValue.login ? (
            <>
              <button
                onClick={handleLogoutClick}
                className={`${style.link} ${style.btn}`}
              >
                {lan === 'en' ? 'Sign out' : 'Выход'}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${style.link} ${style.btn}`}>
                {lan === 'en' ? 'Sign in' : 'Логин'}
              </Link>
              <Link to="/registration" className={`${style.link} ${style.btn}`}>
                {lan === 'en' ? 'Sign up' : 'Регистрация'}
              </Link>
            </>
          )}
          <div className={style.link}>
            <button
              onClick={handleLanClickEn}
              className={`${lan === 'en' ? style.active : ''} ${style.btn}`}
            >
              EN
            </button>
            <button
              onClick={handleLanClickRu}
              className={`${lan === 'ru' ? style.active : ''} ${style.btn}`}
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
