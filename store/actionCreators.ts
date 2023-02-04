import { SET_SESSION, SET_USER } from './actionTypes';
import { Session, User } from '@supabase/supabase-js';

export const setSession = (session: Session | null) => {
  return { type: SET_SESSION, payload: session };
};

export const setUser = (user: User | null) => {
  return { type: SET_USER, payload: user };
};
