import type { Metadata } from 'next';
import SignoutButton from './SignoutButton';
import WelcomeMessage from './WelcomeMessage';
import FolderForm from './FolderForm';
import FoldersSection from './FoldersSection';
import MainDashboard from './MainDashboard';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const DashboardPage = () => {
  return (
    <>
      <SignoutButton />
      <WelcomeMessage />

      <MainDashboard />
    </>
  );
};

export default DashboardPage;
