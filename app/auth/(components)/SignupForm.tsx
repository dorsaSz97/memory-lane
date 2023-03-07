'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/subpabaseClient';
import { useSupabaseContext } from '@/store/app-context';
import { setUserName } from '@/store/actionCreators';
import { Formik, Form, FormikValues } from 'formik';
import * as yup from 'yup';
import CustomInput from './CustomInput';
import SubmitButton from './SubmitButton';
import Spinner from '../../../components/ui/Spinner';

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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signUpUser = async (values: FormikValues) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    if (error) {
      alert('Something wrong with signing up the user' + error.message);
      router.refresh();
    } else {
      dispatch(setUserName(values.username));
    }
  };

  const submitHandler = async (
    values: FormikValues,
    { setSubmitting }: any
  ) => {
    setIsLoading(true);
    await signUpUser(values);
    setIsLoading(false);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: '', password: '', username: '' }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-6">
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
            <CustomInput
              label="Name"
              name="username"
              type="text"
              placeholder="Enter your name"
            />
            {isLoading ? (
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
