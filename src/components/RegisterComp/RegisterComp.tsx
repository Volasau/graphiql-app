import React from 'react';
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

const RegisterComp = () => {
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
      navigate('/');
      alert('User Created Successfully');
    } catch (error) {
      console.log(error);
      alert('User created failed');
      alert(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onhandleSubmit)}>
        <h5>Create an account</h5>
        <div>
          <div>
            <label>Name</label>
            <input
              type="name"
              className={`form-control ${errors.name && 'invalid'}`}
              defaultValue=""
              {...register('name')}
            />
            {errors.name && (
              <p>
                <small className="text-danger">{errors.name.message}</small>
              </p>
            )}
          </div>
          <div>
            <label>E-mail</label>
            <input id="email" type="email" {...register('email')} />
            {errors.email && (
              <p>
                <small className="text-danger">{errors.email.message}</small>
              </p>
            )}
          </div>
          <div>
            <label>Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password && 'invalid'}`}
              {...register('password')}
            />
            {errors.password && (
              <p>
                <small className="text-danger">{errors.password.message}</small>
              </p>
            )}
          </div>
          <div>
            <label>Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              className={`form-control ${errors.confirmPassword && 'invalid'}`}
            />
            {errors.confirmPassword && (
              <p>
                <small className="text-danger">
                  {errors.confirmPassword.message}
                </small>
              </p>
            )}
          </div>
          <input type="submit" value="Sign-up" />
        </div>
      </form>
    </div>
  );
};
export default RegisterComp;
