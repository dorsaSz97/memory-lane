'use client';

// Q&A: Is there a difference between having a session and a user?
// if the user isnt signed in or they have signed out, the session is null
// if we have a session, we have a user with a specific id connected to it

// TODO: Better form handling (currently using too much useState)
// TODO: Add a name input to welcome the user by their name
// TODO: Put session and user in the context
// TODO: Change the url when displaying the dashboard, using router

import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';

import { supabase } from '../lib/subpabaseClient';
import { useSupabaseContext } from '../store/app-context';

import Form from '@/components/Form';
import Dashboard from '@/components/Dashboard';
import { setSession, setUser } from '../store/actionCreators';

export default function Home() {
  const [state, dispatch] = useSupabaseContext();

  const getSupabaseSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw new Error(error.message);
    if (data) return data;
  };

  useEffect(() => {
    getSupabaseSession()
      .then(res => res && res.session && dispatch(setSession(res.session)))
      .catch(error => console.log(error));

    supabase.auth.onAuthStateChange((_e, session) => {
      console.log('Auth state is changed');
      dispatch(setSession(session));
      dispatch(setUser(session?.user || null));
    });
  }, []);

  return (
    <main>
      {/* no session => no user */}
      {/* sign in/up form */}
      {!state.session && <Form />}

      {/* session => user */}
      {/* personal dashboard */}
      {state.session && state.user && <Dashboard />}
    </main>
  );
}
