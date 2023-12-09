// import React, { useContext } from 'react';
// import { redirect } from 'react-router-dom';
// import { AuthContext } from '../../context/authContext';
import { auth } from '../../functions/firebase';
// import { useForm } from 'react-hook-form';
// import { IFormInput } from '../../functions/UserValidation';
// import { yupResolver } from '@hookform/resolvers/yup';

import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
// import {
//   LoginEmailContext,
//   LoginEmailContextType,
//   LoginPasswordContext,
//   LoginPasswordContextType,
// } from '../../context/authContext';
import { useAuthState } from 'react-firebase-hooks/auth';

function LoginComp() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<IFormInput>({
  //   resolver: yupResolver(userSchema),
  // });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  // const loginEmail = useContext<LoginEmailContextType>(LoginEmailContext);
  // const loginPassword =
  //   useContext<LoginPasswordContextType>(LoginPasswordContext);
  // const [user, setUser] = useState<User | null>(null);

  const [user, loading] = useAuthState(auth);
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  //   console.log('Auth state changed:', currentUser);
  // });

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  const navigate = useNavigate();
  async function onhandleLogin(event: React.MouseEvent) {
    event.preventDefault();
    // console.log(data);
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
        }
      );
      console.log('success');
    } catch (error) {
      alert(error);
    }
    navigate('/');
    alert('User Logged In Successfully');
  }

  async function onhandleLogOut() {
    try {
      await signOut(auth);
      console.log('signed out');
    } catch (error) {
      console.log(error);
      // An error happened.
    }
    alert('User Logged Out Successfully');
  }

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   return redirect('/');
  // }
  return (
    <>
      <h1>Log In</h1>
      <form>
        <label>Email</label>
        <input
          id="emailLog"
          type="email"
          // {...register('email')}
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        {/* {errors.email && (
          <p>
            <small className="text-danger">{errors.email.message}</small>
          </p>
        )} */}
        <div>
          <label>Password</label>
          <input
            id="passwordLog"
            type="password"
            // className={`form-control ${errors.password && 'invalid'}`}
            // {...register('password')}
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          {/* {errors.password && (
            <p>
              <small className="text-danger">{errors.password.message}</small>
            </p>
          )} */}
        </div>
        <input
          type="submit"
          value="Log in"
          onClick={(event) => onhandleLogin(event)}
        />
      </form>
      <h4>User Logged In:</h4>
      {user?.email}
      <button onClick={onhandleLogOut}>Logout</button>
    </>
  );
}
export default LoginComp;
