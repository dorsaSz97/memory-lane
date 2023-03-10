'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Session } from '@supabase/supabase-js';
import { ISupabaseState } from '@/types';
import supabase from '@/util/subpabaseClient-browser';

const initialSupabaseState: ISupabaseState = {
  user: null,
  session: null,
  isPending: false,
  setUser: () => {},
  setSession: () => {},
  setIsPending: () => {},
};
export const SupabaseContext =
  createContext<ISupabaseState>(initialSupabaseState);

type ProviderProps = {
  children: React.ReactNode;
  serverAccessToken: string | null;
};
const SupabaseProvider = ({ children, serverAccessToken }: ProviderProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    })();

    const {
      data: { subscription: authChangeListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      // client components have states to make them re-render to showcase the ui changes after having new session, but server components dont. So these two wont be in sync after signing out for example. Therefore we need to manually refresh the page if the token from the server session and client session arent the same (have to make the root layout not be cached as well to have the getSession function run again = revalidate = 0)
      if (currentSession?.access_token !== serverAccessToken) {
        router.refresh();
      }

      const currentUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(currentUser);

      switch (event) {
        case 'SIGNED_IN':
          router.push('/dashboard');
          break;
        case 'SIGNED_OUT':
          router.push('/auth/sign-in');
          break;
        default:
          break;
      }
    });

    return () => {
      authChangeListener.unsubscribe();
    };
  }, [supabase, serverAccessToken, router]);

  const value = {
    user,
    session,
    isPending,
    setUser,
    setSession,
    setIsPending,
  };

  return (
    <SupabaseContext.Provider value={value}>
      <>{children}</>
    </SupabaseContext.Provider>
  );
};
export default SupabaseProvider;

export const useSupabase = () => {
  // current context value of the nearest provider for the given context
  const context = useContext(SupabaseContext);

  if (context === undefined)
    throw new Error('useSupabase must be used within the SupabaseProvider');

  return context;
};
