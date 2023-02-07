import { ISupabaseState } from './app-state';
import { SET_SESSION, SET_USER } from './actionTypes';
import { User, Session } from '@supabase/supabase-js';

type actionTypes =
  | {
      type: 'setSession';
      payload: Session | null;
    }
  | {
      type: 'setUser';
      payload: User | null;
    };

export const supabaseReducer = (
  state: ISupabaseState,
  { type, payload }: actionTypes
): ISupabaseState => {
  switch (type) {
    case SET_SESSION:
      return { ...state, session: payload || null };

    case SET_USER:
      return { ...state, user: payload || null };

    default:
      return state;
  }
};
