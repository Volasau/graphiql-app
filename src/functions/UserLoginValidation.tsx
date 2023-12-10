import * as yup from 'yup';
export interface IFormLoginInput {
  email: string;
  password: string;
}

export const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, {
      message: 'Invalid email format',
    }),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
    )
    .min(8, { message: 'Password must be more than 8 characters' })
    .max(20, { message: 'Password must be less than 20 characters' }),
});
