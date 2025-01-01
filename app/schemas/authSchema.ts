import * as yup from 'yup'

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  email: yup
    .string()
    .required('Email is required'),
  phoneNumber: yup
    .string()
    .required('Phone number is required'),
  password: yup
    .string()
    .required('Password is required')
})

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
})