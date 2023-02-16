'use client';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserResponse } from '@supabase/supabase-js';
import { supabase } from '@/lib/subpabaseClient';
import { initialSupabaseState, ISupabaseState } from './app-state';
import { supabaseReducer } from './app-reducer';
import { setUser } from './actionCreators';

// Q&A: Is there a difference between having a session and a user?
// if the user isnt signed in or they have signed out, the session is null
// if we have a session, we have a user with a specific id connected to it

// TODO: sign in, up and out methods in here 

export const SupabaseContext = createContext<
  [state: ISupabaseState, dipatch: React.Dispatch<any>]
>([initialSupabaseState, () => null]);

const SupabaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(supabaseReducer, initialSupabaseState);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(
        (res: UserResponse) =>
          res.data?.user && dispatch(setUser(res.data.user))
      );

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;

        if (event === 'SIGNED_IN' || (event === 'TOKEN_REFRESHED' && user)) {
          // const maxAge = 100 * 365 * 24 * 60 * 60; // never expires
          // document.cookie = `my-access-token=${
          //   session!.access_token
          // }; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          // document.cookie = `my-refresh-token=${
          //   session!.refresh_token
          // }; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
          dispatch(setUser(user));
          router.push('/dashboard');
        } else if (
          event === 'SIGNED_OUT' ||
          (event === 'USER_DELETED' && !user)
        ) {
          //     const expires = new Date(0).toUTCString();
          // document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
          // document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
          dispatch(setUser(null));
          router.push('/auth');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={[state, dispatch]}>
      {children}
    </SupabaseContext.Provider>
  );
};
export default SupabaseContextProvider;

export const useSupabaseContext = () => {
  const context = useContext(SupabaseContext);
  return context;
};
