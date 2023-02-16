import SignoutButton from '@/components/SignoutButton';
import WelcomeMessage from '@/components/WelcomeMessage';
import FolderForm from '@/components/FolderForm';
import FoldersSection from './FoldersSection';

const DashboardPage = () => {
  return (
    <>
      <SignoutButton />
      <WelcomeMessage />
      <FolderForm />
      <FoldersSection />
    </>
  );
};

export default DashboardPage;
