'use client';

import { useState, useId, FormEvent } from 'react';
import { supabase } from '../../lib/subpabaseClient';
import { useSupabaseContext } from '../../store/app-context';
import { setUser, setUserName } from '../../store/actionCreators';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
  FormikValues,
} from 'formik';
import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
const validationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters long')
    .matches(passwordRules, {
      message: 'Your password has to include a capial letter and a number.',
    })
    .required('Password is required'),
  username: yup.string().default('stranger'),
});

const SignupForm = () => {
  const [, dispatch] = useSupabaseContext();

  const signUpUser = async (values: FormikValues) => {
    let { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    dispatch(setUserName(values.username));

    if (error) {
      alert('Something wrong with signing up the user' + error.message);
    } else {
      alert('You are a member now. You can sign in');
    }
  };

  const submitHandler = (values: FormikValues, { setSubmitting }: any) => {
    signUpUser(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', username: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />

          <button type="submit" disabled={isSubmitting}>
            Sign up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
