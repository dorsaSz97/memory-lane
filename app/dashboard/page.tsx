import SignoutButton from './SignoutButton';
import WelcomeMessage from './WelcomeMessage';
import FolderForm from './FolderForm';
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
