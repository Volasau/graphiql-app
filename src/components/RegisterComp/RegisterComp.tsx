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
import { useLanguage } from '../../context/contextLanguage';

const RegisterComp = () => {
  const loginValue = useContext<LoginContextType>(LoginContext);
  const { lan } = useLanguage();

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
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(() => {
        updateProfile(auth.currentUser as User, {
          displayName: data.name,
        });
      });
      loginValue.setLogin(true);
      navigate('/graphiql');
      toast.success(
        lan === 'en'
          ? 'User created successfully'
          : 'Пользователь успешно создан'
      );
      toast.success(
        lan === 'en'
          ? 'You have logged in successfully'
          : 'Вы успешно зашли в систему'
      );
    } catch (error) {
      toast.error(
        lan === 'en'
          ? 'User creation failed'
          : 'Не удалось создать пользователя'
      );
    }
  }

  return (
    <div className={style.subContainer}>
      <ToastContainer />
      <h1 className={style.registerHeader}>
        {lan === 'en' ? 'Create an account' : 'Создайте аккаунт'}
      </h1>
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
                  {lan === 'en' ? errors.name.message : 'Невалидное значение'}
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
                  {lan === 'en' ? errors.email.message : 'Невалидное значение'}
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
                    {lan === 'en'
                      ? errors.password.message
                      : 'Невалидное значение'}
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
                  {lan === 'en'
                    ? errors.confirmPassword?.message
                    : 'Пароль не совпадает'}
                </small>
              )}
            </p>
          </div>
          <button type="submit" className={`${style.regBtn}`}>
            {lan === 'en' ? 'Sign-up' : 'Регистрация'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterComp;
