import { User } from '@supabase/supabase-js';

export interface ISupabaseState {
  user: User | null;
  userName: string;
}

export const initialSupabaseState: ISupabaseState = {
  user: null,
  userName: '',
};

// export const initialDashboardState: IDashboardState = {
//   // folders:
//   // selectedFolder:
//   // username:
// }
