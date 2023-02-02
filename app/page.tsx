'use client';

import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import { supabase } from '../lib/subpabaseClient';
import Dashboard from './Dashboard';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSignIn, setIsSignIn] = useState(true);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const id = useId();
  const router = useRouter();

  supabase.auth.onAuthStateChange((_e, session) => {
    setSession(session);
    setUser(session?.user || null);
    console.log('changed');
  });

  const getSupabaseSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (data) return data;
  };

  const signInUser = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passRef.current!.value,
    });
    // session and user
    if (data) {
      setSession(data.session);
      setUser(data.user);
    }
  };

  const signUpUser = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passRef.current!.value,
    });
    // user
    console.log(data);
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (emailRef.current?.value && passRef.current?.value) {
      if (isSignIn) {
        signInUser();
      } else {
        signUpUser();
      }
    }
  };

  useEffect(() => {
    getSupabaseSession().then(res =>
      res ? setSession(res.session) : console.log(res)
    );
  }, []);

  return (
    <main>
      <h1>Hi memory lane app</h1>
      <p>
        <button onClick={() => setIsSignIn(false)}>sign up</button> or{' '}
        <button onClick={() => setIsSignIn(true)}>sign in</button>
      </p>

      <form onSubmit={formSubmitHandler}>
        <label htmlFor={`${id}-email`}>Email: </label>
        <input type="email" name="email" id={`${id}-email`} ref={emailRef} />
        <label htmlFor={`${id}-pass`}>Password: </label>
        <input
          type="password"
          name="password"
          id={`${id}-pass`}
          ref={passRef}
        />
        {isSignIn ? (
          <button type="button">Sign in</button>
        ) : (
          <button type="button">Sign up</button>
        )}
        <button type="submit">Done</button>
      </form>

      {user && <Dashboard user={user} session={session} />}
    </main>
  );
}
