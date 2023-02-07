'use client';

import { createContext, useContext, useReducer } from 'react';
import { initialSupabaseState, ISupabaseState } from './app-state';
import { supabaseReducer } from './app-reducer';

export const SupabaseContext = createContext<
  [state: ISupabaseState, dipatch: React.Dispatch<any>]
>([initialSupabaseState, () => null]);

const SupabaseContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(supabaseReducer, initialSupabaseState);

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
