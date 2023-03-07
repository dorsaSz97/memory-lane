'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikValues,
} from 'formik';
import { supabase } from '@/lib/subpabaseClient';

const SigninForm = () => {
  const [formError, setError] = useState<string>('');
  const router = useRouter();

  const signInUser = async (values: FormikValues) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert("You're in");
    }
  };

  const submitHandler = (values: FormikValues, { setSubmitting }: any) => {
    signInUser(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: FormikErrors<FormikValues> = {};
          if (!values.email) {
            errors.email = 'Please enter your email';
          }
          if (!values.password) {
            errors.password = 'Please enter your password';
          }
          if (values.password && values.email && formError) {
            errors.email = formError;
            errors.password = formError;
          }

          return errors;
        }}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="flex-col">
            <Field
              type="email"
              name="email"
              className="border-slate-900 border-2"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />
            <Field
              type="password"
              name="password"
              className="border-slate-900 border-2"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />

            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={() => {
          router.replace('/auth/sign-up');
        }}
      >
        Don't have an account?
      </button>{' '}
    </>
  );
};

export default SigninForm;
