import type { Metadata } from 'next';
import SigninForm from '../(components)/SigninForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SigninPage() {
  return <SigninForm />;
}
