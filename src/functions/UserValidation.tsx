import * as yup from 'yup';
export interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with capital letter'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*\p{Ll})(?=.*\p{Lu})(?=.*[!@#$%^&*()_+]).*$/gu,
      'must contain min 1 digit, 1 lowercase letter, 1 uppercase letter, and 1 special character'
    )
    .min(8, 'Password must be more than 8 characters')
    .max(20, 'Password must be less than 20 characters'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});
