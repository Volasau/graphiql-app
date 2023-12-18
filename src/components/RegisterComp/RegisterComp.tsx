import React, { useContext } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { auth } from '../../functions/firebase';
import { useNavigate } from 'react-router-dom';
import { IFormInput, userSchema } from '../../functions/UserValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginContext, LoginContextType } from '../../context/loginContext';
import style from './RegisterComp.module.css';
import { ToastContainer, toast } from 'react-toastify';

const RegisterComp = () => {
  const loginValue = useContext<LoginContextType>(LoginContext);

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<IFormInput>({
    resolver: yupResolver(userSchema),
    mode: 'onChange',
  });

  const navigate = useNavigate();

  async function onhandleSubmit(data: IFormInput) {
    console.log(data);
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser as User, {
          displayName: data.name,
        });
        console.log(user);
      });
      loginValue.setLogin(true);
      navigate('/graphiql');
      toast.success('User created successfully');
      toast.success('You login');
    } catch (error) {
      console.log(error);
      toast.error('User creation failed');
    }
  }

  return (
    <div className={style.subContainer}>
      <ToastContainer />
      <h1 className={style.registerHeader}>Create an account</h1>
      <form
        data-testid="form__registr"
        onSubmit={handleSubmit(onhandleSubmit)}
        className={style.registerForm}
      >
        <div>
          <div className={style.nameReg}>
            <input
              id="nameReg"
              type="name"
              defaultValue=""
              placeholder="Name"
              {...register('name')}
            />
            <p className={style.errorText}>
              {errors.name && (
                <small className={style.textDanger}>
                  {errors.name.message}
                </small>
              )}
            </p>
          </div>
          <div className={style.emailReg}>
            <input
              id="emailReg"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
            <p className={style.errorText}>
              {errors.email && (
                <small className={style.textDanger}>
                  {errors.email.message}
                </small>
              )}
            </p>
          </div>
          <div className={style.passwordReg}>
            <input
              id="passwordReg"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            <div className={style.errorText}>
              {errors.password && (
                <p className={style.pre}>
                  <small className={style.textDanger}>
                    {errors.password.message}
                  </small>
                </p>
              )}
            </div>
          </div>
          <div className={style.confirmPasswordReg}>
            <input
              id="confirmPasswordReg"
              type="password"
              placeholder="Confirm password"
              {...register('confirmPassword')}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
            />
            <p className={style.errorText}>
              {errors.confirmPassword && (
                <small className={style.textDanger}>
                  {errors.confirmPassword.message}
                </small>
              )}
            </p>
          </div>
          <button type="submit" className={`${style.regBtn}`}>
            Sign-up
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterComp;
