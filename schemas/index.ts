import * as yup from 'yup';

export const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;

export const validationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters long')
    .matches(passwordRules, {
      message: 'Your password also has to have a number and one capital letter',
    })
    .required('Required'),
  name: yup.string(),
});
