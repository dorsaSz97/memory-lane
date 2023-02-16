import { SET_USER, SET_USERNAME } from './actionTypes';
import { User } from '@supabase/supabase-js';

export const setUser = (
  user: User | null
): { type: 'setUser'; payload: User | null } => {
  return { type: SET_USER, payload: user };
};
export const setUserName = (
  userName: string
): { type: 'setUserName'; payload: string } => {
  return { type: SET_USERNAME, payload: userName };
};
