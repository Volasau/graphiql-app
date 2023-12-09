import LoginComp from '../../components/LoginComp/LoginComp';
import style from './LoginPage.module.css';
function Login() {
  return (
    <>
      <div className={style.container}>
        <LoginComp />
      </div>
    </>
  );
}

export default Login;
