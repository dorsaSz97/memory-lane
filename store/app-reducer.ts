import { ISupabaseState } from './app-state';
import { SET_SESSION, SET_USER, SET_USERNAME } from './actionTypes';
import { User, Session } from '@supabase/supabase-js';

type actionTypes =
  | {
      type: 'setSession';
      payload: Session | null;
    }
  | {
      type: 'setUser';
      payload: User | null;
    }
  | {
      type: 'setUserName';
      payload: string;
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

    case SET_USERNAME:
      return { ...state, userName: payload || '' };

    default:
      return state;
  }
};
