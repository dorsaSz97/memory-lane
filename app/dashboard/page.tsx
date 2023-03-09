import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import createClient from '@/lib/subpabaseClient-server';

import SignoutButton from './SignoutButton';
import FolderForm from './FolderForm';
import FoldersSection from './FoldersSection';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: userFolders } = await supabase
    .from('folders')
    .select('name')
    .eq('user_id', user.id);

  console.log('we are in the dashboard and the user is: ');
  console.log(user);
  console.log('with the folders: ');
  console.log(userFolders);

  return (
    <div className="flex flex-col h-full w-full p-10">
      <div className="my-auto self-center text-[7rem] w-full">
        <FoldersSection user={user} userFolders={userFolders}/>
      </div>
      <FolderForm user={user} />
      <SignoutButton />
    </div>
  );
}
