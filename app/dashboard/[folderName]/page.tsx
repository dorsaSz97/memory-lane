// URL => /dashboard/:folderName

import type { Metadata } from 'next';
import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import FolderDetails from './FolderDetails';

export async function generateMetadata({
  params,
}: {
  params: { folderName: string };
}): Promise<Metadata | undefined> {
  if (!params.folderName) return;
  return { title: params.folderName.toUpperCase() };
}

type FolderDetailProps = {
  params: {
    folderName: string;
  };
};

const FolderDetailPage = (props: FolderDetailProps) => {
  const folderName = props.params.folderName;

  return (
    <div className="flex flex-col h-full p-4">
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
