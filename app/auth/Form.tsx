'use client';

import { useState, useId, FormEvent } from 'react';
import { supabase } from '../lib/subpabaseClient';
import { useSupabaseContext } from '../store/app-context';
import { setUser, setUserName } from '../store/actionCreators';
import { Formik, FormikHelpers, FormikValues } from 'formik';
import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
const validationSchema = yup.object().shape({
  email: yup.string().email().required('Required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters long')
    // .matches(!toSignIn ? passwordRules : null, {
    //   message: 'Your password also has to have a number and one capital letter',
    // })
    .required('Required'),
  name: yup.string(),
});

const Form = () => {
  const [, dispatch] = useSupabaseContext();
  const id = useId();

  const [toSignIn, setToSignIn] = useState(true);
  const [signedUp, setSignedUp] = useState(false);

  const signInUser = async (values: FormikValues) => {
    console.log(values);
    let { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      console.log('Something wrong with signing in the user' + error.message);
    }
  };

  const signUpUser = async (values: FormikValues) => {
    let { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });

    dispatch(setUserName(values.name ?? 'stranger'));

    if (error) {
      console.log('Something wrong with signing up the user' + error.message);
    } else {
      alert('You are a member now. You can sign in');
    }
  };

  const submitHandler = (vals: FormikValues, actions: any) => {
    setSignedUp(true);
    console.log(vals);
    toSignIn ? signInUser(vals) : signUpUser(vals);
    actions.resetForm();
  };

  return (
    <div>
      <h1>Welcome to a journey through your best memories</h1>

      <Formik
        initialValues={{ email: '', password: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <form
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id={`${id}-name`}
                />
              </>
            )}
            {toSignIn ? (
              // <button type="submit">Sign in</button>
              <button type="submit">Sign in</button>
            ) : (
              // <button type="button" onClick={signUpUser}>
              //   Sign up
              // </button>
              <button type="submit">Sign up</button>
            )}

            <div>
              {toSignIn ? (
                <button
                  type="button"
                  onClick={() => {
                    setToSignIn(false);
                    resetForm();
                  }}
                >
                  Don't have an account?
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setToSignIn(true);
                    resetForm();
                  }}
                >
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
