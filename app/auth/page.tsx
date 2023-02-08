'use client';

// Q&A: Is there a difference between having a session and a user?
// if the user isnt signed in or they have signed out, the session is null
// if we have a session, we have a user with a specific id connected to it

// TODO: Better form handling (currently using too much useState)
// TODO: Add a name input to welcome users by their name
// TODO: Put session and user in the context
// TODO: Change the url when displaying the dashboard, using router

import { useEffect } from 'react';

import { supabase } from '../../lib/subpabaseClient';
import { useSupabaseContext } from '../../store/app-context';
import { setSession, setUser } from '../../store/actionCreators';

import Form from '@/components/Form';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [state, dispatch] = useSupabaseContext();

  const getSupabaseSession = async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw new Error(error.message);
    if (data) {
      return data;
    }
  };

  useEffect(() => {
    getSupabaseSession()
      .then(res => {
        if (res && res.session) {
          dispatch(setSession(res.session));
          dispatch(setUser(res.session.user));
        }
      })
      .catch(error => console.log(error));

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        dispatch(setSession(null));
        dispatch(setUser(null));
        router.replace('/');
        console.log('heeereeee signing out');

        // delete cookies on sign out
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session) {
          dispatch(setSession(session));
          dispatch(setUser(session.user));
          const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
          document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          router.replace('/dashboard');
        }
      }
      console.log('Auth state is changed');
    });
  }, []);

  return (
    <main>
      <Form />
    </main>
  );
}
