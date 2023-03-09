// URL => /dashboard/:folderName
import type { Metadata } from 'next';
import Link from 'next/link';

import Heading from '@/components/ui/Heading';
import FolderDetails from './FolderDetails';
import { supabase } from '@/lib/subpabaseClient';

type PageProps = {
  params: {
    folderName: string;
  };
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const folderName = props.params.folderName;
  const title = folderName[0].toUpperCase() + folderName.slice(1);
  return { title };
}

const FolderDetailPage = (props: PageProps) => {
  const folderName = props.params.folderName;

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
      <FolderDetails folderName={folderName} />
    </div>
  );
};

export default FolderDetailPage;
