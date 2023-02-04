import { ISupabaseState } from './app-state';
import { SET_SESSION, SET_USER } from './actionTypes';
import { Session, User } from '@supabase/supabase-js';

export const supabaseReducer = (
  state: ISupabaseState,
  { type, payload }: { type: any; payload: any }
): ISupabaseState => {
  switch (type) {
    case SET_SESSION:
      if (payload) {
        return { ...state, session: payload };
      }
    case SET_USER:
      if (payload) {
        return { ...state, user: payload };
      }
    default:
      return { ...state };
  }
};
