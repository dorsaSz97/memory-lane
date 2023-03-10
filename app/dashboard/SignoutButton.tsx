'use client';

import supabase from '@/util/subpabaseClient-browser';

const SignoutButton = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <>
      <button
        type="button"
        onClick={signOutHandler}
        className="self-end px-4 py-2 bg-blob bg-no-repeat bg-cover bg-bottom w-[100px] h-[80px] text-primary text-md capitalize transition-all hover:text-lg"
      >
        Sign out
      </button>
    </>
  );
};

export default SignoutButton;
