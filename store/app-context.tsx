'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserResponse } from '@supabase/supabase-js';

import { initialSupabaseState, ISupabaseState } from './app-state';
import { supabaseReducer } from './app-reducer';
import { setUser } from './actionCreators';
import supabase from '../lib/subpabaseClient-client';

// Q&A: Is there a difference between having a session and a user?
// if the user isnt signed in or they have signed out, the session is null
// if we have a session, we have a user with a specific id connected to it

// TODO: sign in, up and out methods in here

export const SupabaseContext = createContext<
  [state: ISupabaseState, dipatch: React.Dispatch<any>]
>([initialSupabaseState, () => null]);

type Props = { accessToken: string | null; children: React.ReactNode };
const SupabaseContextProvider = (props: Props) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(supabaseReducer, initialSupabaseState);

  useEffect(() => {
    (async () => {
      const { data: session } = await supabase.auth.getUser();
      dispatch(setUser(session?.user));
    })();

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      const currentUser = currentSession?.user ?? null;
      dispatch(setUser(currentUser));

      if (props.accessToken !== currentSession?.access_token) {
        router.refresh();
      }
      if (
        event === 'SIGNED_IN' ||
        (event === 'TOKEN_REFRESHED' && currentUser)
      ) {
        dispatch(setUser(currentUser));
        router.push('/dashboard');
      } else if (
        event === 'SIGNED_OUT' ||
        (event === 'USER_DELETED' && !currentUser)
      ) {
        dispatch(setUser(null));
        router.push('/auth');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={[state, dispatch]}>
      {props.children}
    </SupabaseContext.Provider>
  );
};
export default SupabaseContextProvider;

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);
  return context;
};
