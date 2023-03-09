'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikErrors, FormikValues } from 'formik';
import supabase from '@/lib/subpabaseClient-client';
import CustomInput from './CustomInput';
import SubmitButton from './SubmitButton';
import Spinner from '../../../components/ui/Spinner';

const SigninForm = () => {
  const [formError, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    signInUser(values);
    setIsLoading(false);
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
          <Form className="flex flex-col gap-6">
            <CustomInput
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email address"
            />
            <CustomInput
              type="password"
              name="password"
              label="Password"
              placeholder="Enter your Password"
            />

            {isLoading ? (
              <Spinner />
            ) : (
              <SubmitButton btnText="Sign in" isSubmitting={isSubmitting} />
            )}
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
      </button>
    </>
  );
};

export default SigninForm;
