import {
  useState,
  useRef,
  useId,
  FormEvent,
  SetStateAction,
  Dispatch,
} from 'react';
import { supabase } from '../lib/subpabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { useSupabaseContext } from '../store/app-context';
import { setSession, setUser } from '../store/actionCreators';

const Form = () => {
  const [_, dispatch] = useSupabaseContext();
  const id = useId();

  const [toSignIn, setToSignIn] = useState(true);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = useState(false);
  const passRef = useRef<HTMLInputElement | null>(null);
  const [passError, setPassError] = useState(false);

  const signInUser = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passRef.current!.value,
    });

    if (error) {
      alert(error.message);
    }

    if (data && data.user && data.session) {
      console.log('Hey you, welcome!');
      dispatch(setSession(data.session));
      dispatch(setUser(data.user));
    }
  };

  const signUpUser = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passRef.current!.value,
    });

    if (error) {
      alert(error.message);
    }

    if (data && data.user && data.session) {
      console.log(
        'You are all signed up, you can now sign in and enjoy the experience'
      );
    }
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    // At this point the two refs exist
    if (!emailRef.current!.value) {
      setEmailError(true);
    }
    if (!passRef.current!.value) {
      setPassError(true);
    }
    if (emailRef.current!.value && passRef.current!.value)
      toSignIn ? signInUser() : signUpUser();
  };

  return (
    <div>
      <h1>Welcome to a journey thorugh your best memories</h1>

      <form onSubmit={formSubmitHandler}>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input type="email" name="email" id={`${id}-email`} ref={emailRef} />
        {emailError && <p style={{ color: 'red' }}>Not right</p>}
        <label htmlFor={`${id}-pass`}>Password:</label>
        <input
          type="password"
          name="password"
          id={`${id}-pass`}
          ref={passRef}
        />
        {passError && <p style={{ color: 'red' }}>Not right</p>}
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
    </div>
  );
};

export default Form;
