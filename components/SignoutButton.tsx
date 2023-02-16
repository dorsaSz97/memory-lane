import React from 'react';
import { supabase } from '../lib/subpabaseClient';

const SignoutButton = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    error && console.log(error.message);
  };
  return <button onClick={signOutHandler}>sign out</button>;
};

export default SignoutButton;
