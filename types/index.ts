import { Dispatch, SetStateAction } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { Database } from './supabase';

// Form
export interface ISigninForm {
  email: string;
  password: string;
  name?: string;
}
export interface ISignupForm {
  email: string;
  password: string;
  name?: string;
}
export interface IFormError {
  email?: string;
  password?: string;
}

// Store
export interface ISupabaseState {
  user: User | null;
  session: Session | null;
  isPending: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  setSession: Dispatch<SetStateAction<Session | null>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
}

export type FolderType = Database['public']['Tables']['folders']['Row'];
export type ImageType = Database['public']['Tables']['images']['Row'];
