import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    repeatPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password')], 'Passwords does not match'),
});
