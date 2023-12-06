import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import style from './Layout.module.css';
import { useState } from 'react';

function Layout() {
  //временно устанавливаем в ручную что пользователь не авторизован
  const auth = false;
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const handleGraphiQLClick = () => {
    if (!auth) {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    setLogin(false);
  };

  return (
    <>
      <div>
        <header className={style.container}>
          <Link to="/" className={style.link}>
            Wellcome
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
                Login
              </Link>
              <Link to="/registration" className={style.link}>
                Registration
              </Link>
            </>
          )}
          <div className={style.link}>
            <button>EN</button>
            <button>RU</button>
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
