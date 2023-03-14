'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Formik, Form, FormikValues } from 'formik';
import * as yup from 'yup';
import supabase from '@/util/subpabaseClient-browser';
import CustomInput from '../(components)/CustomInput';
import SubmitButton from '../(components)/SubmitButton';
import Spinner from '@/components/ui/Spinner';

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
});

const SignupForm = () => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formError, setError] = useState<string>('');

  const signUpHandler = async (values: FormikValues) => {
    try {
      setIsPending(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message);
        throw new Error(error.message);
      } else {
        alert('All set!!!');
        router.replace('/auth/sign-in');
      }
    } catch (error) {
      console.log('Something wrong with signing up to supabase' + error);
    } finally {
      setIsPending(false);
    }
  };

  const submitHandler = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    await signUpHandler(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6 w-[70%]">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            {isPending ? (
              <Spinner />
            ) : (
              <SubmitButton btnText="Sign up" isSubmitting={isSubmitting} />
            )}
          </Form>
        )}
      </Formik>
      <button
        type="button"
        onClick={() => {
          router.replace('/auth/sign-in');
        }}
      >
        Already have an account?
      </button>
    </>
  );
};

export default SignupForm;
