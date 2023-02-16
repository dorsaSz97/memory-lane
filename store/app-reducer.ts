import { ISupabaseState } from './app-state';
import { SET_USER, SET_USERNAME } from './actionTypes';
import { User } from '@supabase/supabase-js';

type actionTypes =
  | {
      type: typeof SET_USER;
      payload: User | null;
    }
  | {
      type: typeof SET_USERNAME;
      payload: string;
    };

export const supabaseReducer = (
  state: ISupabaseState,
  { type, payload }: actionTypes
): ISupabaseState => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload || null };

    case SET_USERNAME:
      return { ...state, userName: payload || '' };

    default:
      return state;
  }
};
