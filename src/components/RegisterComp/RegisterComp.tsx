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
    watch,
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
            <label>Your email address</label>
            <input
              id="email"
              type="email"
              required={true}
              {...register('email', {
                required: 'Email is Required!!!',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
            ></input>
            {errors.email && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>
          <div>
            <label>Your password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password && 'invalid'}`}
              required={true}
              {...register('password', {
                required: 'You must specify a password',
                pattern: {
                  value:
                    /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[d]){1,})(?=(.*[W]){    1,})(?!.*s).{8,}$/,
                  message:
                    'Password should contain at least one number and one special character',
                },
                minLength: {
                  value: 8,
                  message: 'Password must be more than 8 characters',
                },
                maxLength: {
                  value: 20,
                  message: 'Password must be less than 20 characters',
                },
              })}
              // error={Boolean(errors.password)}
            ></input>
            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>
          <div>
            <label>Confirm your password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                validate: (value) =>
                  value === watch('password', '') ||
                  'The passwords do not match',
              })}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              // error={Boolean(errors.confirmPassword)}
              className={`form-control ${errors.confirmPassword && 'invalid'}`}
              required={true}
            />
            {errors.confirmPassword && (
              <small className="text-danger">
                {errors.confirmPassword.message}{' '}
              </small>
            )}
          </div>
          <div>
            <label>Your full name</label>
            <input
              type="name"
              className={`form-control ${errors.name && 'invalid'}`}
              required={true}
              defaultValue=""
              {...register('name', { required: 'Fullname is Required!!!' })}
            />
            {errors.name && (
              <small className="text-danger">Fullname is Required!!!</small>
            )}
          </div>
          <div>
            <button>Create an account</button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default RegisterComp;
