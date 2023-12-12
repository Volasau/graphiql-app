import { auth } from '../../functions/firebase';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { onAuthStateChanged, signInWithEmailAndPassword } from '@firebase/auth';
import { useNavigate } from 'react-router';
import {
  IFormLoginInput,
  userLoginSchema,
} from '../../functions/UserLoginValidation';
import { useContext, useEffect } from 'react';
import { UserContext, UserContextType } from '../../context/authContext';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './LoginComp.module.css';

function LoginComp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormLoginInput>({
    resolver: yupResolver(userLoginSchema),
    mode: 'onChange',
  });
  const userValue = useContext<UserContextType>(UserContext);
  const loginValue = useContext<LoginContextType>(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        userValue.setUser(currentUser);
        navigate('/graphiql');
        toast.success('You login');
      }
    });
    return () => unsubscribe();
  }, [userValue, navigate]);

  const loginHandler = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      loginValue.setLogin(true);
    } catch (error) {
      loginValue.setLogin(false);
      toast.error(`${error}`);
    }
  };

  return (
    <div className={style.subContainer}>
      <ToastContainer />
      <h1 className={style.loginHeader}>Please Sign In</h1>
      <form onSubmit={handleSubmit(loginHandler)} className={style.loginForm}>
        <div className={style.emailLogin}>
          <input
            id="emailLog"
            type="email"
            {...register('email')}
            placeholder="Email"
          />
          <p className={style.errorText}>
            {errors.email && (
              <small className={style.textDanger}>{errors.email.message}</small>
            )}
          </p>
        </div>
        <div className={style.passwordLogin}>
          <input
            id="passwordLog"
            type="password"
            {...register('password')}
            placeholder="Password"
          />
          <p className={style.errorText}>
            {errors.password && (
              <pre>
                <small className={style.textDanger}>
                  {errors.password.message}
                </small>
              </pre>
            )}
          </p>
        </div>
        <button type="submit" className={`${style.loginBtn}`}>
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginComp;
