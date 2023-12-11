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
    <>
      <ToastContainer />
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(loginHandler)}>
        <label>Email</label>
        <input id="emailLog" type="email" {...register('email')} />
        {errors.email && (
          <p>
            <small className="text-danger">{errors.email.message}</small>
          </p>
        )}
        <div>
          <label>Password</label>
          <input id="passwordLog" type="password" {...register('password')} />
          {errors.password && (
            <p>
              <small className="text-danger">{errors.password.message}</small>
            </p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
      <h4>User Logged In:</h4>
      {userValue.user !== null ? userValue.user.email : null}
    </>
  );
}
export default LoginComp;
