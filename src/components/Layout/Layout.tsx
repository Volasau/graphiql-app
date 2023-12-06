import { Link, Outlet, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import style from './Layout.module.css';
import { useState } from 'react';

function Layout() {
  //временно устанавливаем в ручную что пользователь не авторизован
  const auth = false;
  const [login, setLogin] = useState(false);

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
          <Link to="/">Wellcome</Link>
          <Link
            onClick={handleGraphiQLClick}
            to={auth ? '/graphiql' : '/login'}
          >
            GraphiQL
          </Link>
          {login ? (
            <>
              <button onClick={handleLogoutClick}>OUT</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registration">Registration</Link>
            </>
          )}
        </header>
        <div>
          <Outlet />
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
