'use client';

import { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const FormContainer = () => {
  const [toSignIn, setToSignIn] = useState(true);

  return (
    <div>
      <h1>Welcome to a journey through your best memories</h1>

      {toSignIn ? <SigninForm /> : <SignupForm />}

      {toSignIn ? (
        <button
          type="button"
          onClick={() => {
            setToSignIn(false);
          }}
        >
          Don't have an account?
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setToSignIn(true);
          }}
        >
          Already have an account?
        </button>
      )}
    </div>
  );
};

export default FormContainer;
