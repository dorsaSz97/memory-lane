'use client';
import React from 'react';
import { supabase } from '../../lib/subpabaseClient';

const SignoutButton = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    error && console.log(error.message);
  };
  return (
    <button
      onClick={signOutHandler}
      className="self-end px-4 py-2 bg-blob bg-no-repeat bg-cover bg-bottom w-[100px] h-[80px] text-primary text-md capitalize transition-all hover:text-lg"
    >
      sign out
    </button>
  );
};

export default SignoutButton;
