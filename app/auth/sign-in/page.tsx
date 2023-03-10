import type { Metadata } from 'next';
import SigninForm from './SigninForm';

export const metadata: Metadata = {
  title: 'Sign In',
};

export default function SigninPage() {
  return (
    <>
      <h1 className="text-3xl capitalize">Sign in</h1>
      <SigninForm />
    </>
  );
}
