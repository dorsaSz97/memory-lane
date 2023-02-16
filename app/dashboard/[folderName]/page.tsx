// URL => /dashboard/:folderName

import Link from 'next/link';
import Heading from '@/components/ui/Heading';
import FolderDetails from './FolderDetails';

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
