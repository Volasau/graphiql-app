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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      if (currentUser) {
        userValue.setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [userValue]);

  const navigate = useNavigate();

  const loginHandler = async (data: { email: string; password: string }) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      console.log('success');
      loginValue.setLogin(true);
    } catch (error) {
      alert(error);
    }
    navigate('/graphiql');
    alert('User Logged In Successfully');
  };

  return (
    <>
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
