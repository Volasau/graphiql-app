import RegisterComp from '../../components/RegisterComp/RegisterComp';
import style from './RegisterPage.module.css';

function Registration() {
  return (
    <>
      <div data-testid="registration" className={style.container}>
        <RegisterComp />
      </div>
    </>
  );
}

export default Registration;
