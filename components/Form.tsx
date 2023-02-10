'use client';

import { useState, useId } from 'react';
import { supabase } from '../lib/subpabaseClient';
import { useSupabaseContext } from '../store/app-context';
import { setSession, setUser, setUserName } from '../store/actionCreators';
import { Formik } from 'formik';
import { IFormError, ISigninForm, ISignupForm } from '@/types';

const initialSigninForm: ISigninForm = { email: '', password: '' };
const initialSignupForm: ISignupForm = { email: '', password: '' };

const Form = () => {
  const [state, dispatch] = useSupabaseContext();
  const id = useId();

  const [toSignIn, setToSignIn] = useState(true);
  const [signedUp, setSignedUp] = useState(false);

  const signInUser = async (values: ISignupForm) => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      alert(error.message);
    }

    if (data && data.user && data.session) {
      dispatch(setSession(data.session));
      dispatch(setUser(data.user));
    }
  };

  const signUpUser = async (values: ISignupForm) => {
    let { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    dispatch(setUserName(values.name ?? 'stranger'));

    if (error) {
      alert(error.message);
    }

    if (data && data.user && data.session) {
      alert(
        'You are all signed up, you can now sign in and enjoy the experience'
      );
    }
  };

  return (
    <div>
      <h1>Welcome to a journey through your best memories</h1>

      <Formik
        initialValues={toSignIn ? initialSigninForm : initialSignupForm}
        validate={values => {
          const errors: IFormError = {};
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password should be longer';
          }
          return errors;
        }}
        onSubmit={vals => {
          setSignedUp(true);
          toSignIn ? signInUser({ ...vals }) : signUpUser({ ...vals });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <label htmlFor={`${id}-email`}>Email:</label>
            <input
              type="email"
              name="email"
              id={`${id}-email`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p style={{ color: 'red' }}>{errors.email}</p>
            )}
            <label htmlFor={`${id}-pass`}>Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              id={`${id}-pass`}
            />
            {errors.password && touched.password && (
              <p style={{ color: 'red' }}>{errors.password}</p>
            )}
            {!toSignIn && (
              <>
                <label htmlFor={`${id}-name`}>Name:</label>
                <input
                  type="text"
                  name="userName"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={`${id}-name`}
                />
              </>
            )}
            {toSignIn ? (
              <button type="submit">Sign in</button>
            ) : (
              <button type="submit">Sign up</button>
            )}

            <div>
              {toSignIn ? (
                <button onClick={() => setToSignIn(false)}>
                  Don't have an account?
                </button>
              ) : (
                <button onClick={() => setToSignIn(true)}>
                  Already have an account?
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Form;
