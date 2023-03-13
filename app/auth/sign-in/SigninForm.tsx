'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikErrors, FormikValues } from 'formik';
import supabase from '@/util/subpabaseClient-browser';
import CustomInput from '../(components)/CustomInput';
import SubmitButton from '../(components)/SubmitButton';
import Spinner from '../../../components/ui/Spinner';

const SigninForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formError, setError] = useState<string>('');

  const signInHandler = async (values: FormikValues) => {
    try {
      setIsPending(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message);
        throw new Error();
      }
    } catch {
      console.log('Something went wrong with signing in to supabase');
    } finally {
      setIsPending(false);
    }
  };

  const submitHandler = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    await signInHandler(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors: FormikErrors<FormikValues> & { formError?: string } =
            {};

          if (!values.email) {
            errors.email = 'Please enter your email';
          }
          if (!values.password) {
            errors.password = 'Please enter your password';
          }
          if (values.password && values.email && formError) {
            errors.email = undefined;
            errors.password = undefined;
            errors.formError = formError;
          }

          return errors;
        }}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6 w-[70%]">
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

            {isPending ? (
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
