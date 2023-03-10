// URL => /dashboard/:folderName
import type { Metadata } from 'next';
import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import FolderDetails from './FolderDetails';
import createClient from '@/util/subpabaseClient-server';
import { redirect } from 'next/navigation';

type PageProps = {
  params: {
    folderName: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  let folderName = props.params.folderName;
  if (folderName.includes('-')) {
    folderName = folderName.split('-').join(' ');
  }
  const title = folderName[0].toUpperCase() + folderName.slice(1);
  return { title };
}

const FolderDetailPage = async (props: PageProps) => {
  const supabase = createClient();

  let folderName = props.params.folderName;
  if (folderName.includes('-')) {
    folderName = folderName.split('-').join(' ');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: selectedFolder } = await supabase
    .from('folders')
    .select('*')
    .eq('user_id', user.id)
    .eq('name', folderName);

  return (
    <div className="flex flex-col h-full w-full p-10">
      {/* back button */}
      <Link href="/dashboard" className="text-lg text-underline">
        Visit all folders
      </Link>

      {/* folder name */}
      <Heading
        Element={'h1'}
        title={folderName}
        className="my-[2rem] text-[10rem] self-center"
      />

      {/* images */}
      <FolderDetails
        user={user}
        selectedFolder={selectedFolder ? selectedFolder[0] : null}
      />
    </div>
  );
};

export default FolderDetailPage;
