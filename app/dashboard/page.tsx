import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import createClient from '@/util/subpabaseClient-server';

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

  // it will 100% exist because of the middleware
  if (!user) {
    redirect('/auth');
  }

  const { data: userFolders } = await supabase
    .from('folders')
    .select('name')
    .eq('user_id', user.id);

  return (
    <div className="flex flex-col h-full w-full p-10">
      <div className="my-auto self-center text-[7rem] w-full">
        <FoldersSection
          userFolders={userFolders?.map(uFolder => uFolder.name) || []}
        />
      </div>
      <FolderForm user={user} />
      <SignoutButton />
    </div>
  );
}
