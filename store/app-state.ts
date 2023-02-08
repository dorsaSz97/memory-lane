import { Session, User } from '@supabase/supabase-js';

export interface ISupabaseState {
  session: Session | null;
  user: User | null;
  userName: string;
}

export const initialSupabaseState: ISupabaseState = {
  session: null,
  user: null,
  userName: '',
};
