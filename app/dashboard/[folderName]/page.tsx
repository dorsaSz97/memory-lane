// URL => /dashboard/:folderName

import type { Metadata } from 'next';
import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import FolderDetails from './FolderDetails';

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata | undefined> {
  console.log(params);
  if (!params.folderName) return;
  return { title: params.folderName };
}

type FolderDetailProps = {
  params: {
    folderName: string;
  };
};

const FolderDetailPage = (props: FolderDetailProps) => {
  const folderName = props.params.folderName;

  return (
    <>
      {/* back button */}
      <Link href="/dashboard">Visit all folders</Link>

      {/* folder name */}
      <Heading Element={'h1'} title={folderName} />

      {/* images */}
      <FolderDetails folderName={folderName} />
    </>
  );
};

export default FolderDetailPage;
