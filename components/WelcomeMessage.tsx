import React from 'react';
import { useSupabaseContext } from '../store/app-context';

const WelcomeMessage = () => {
  const [state] = useSupabaseContext();

  return (
    <h1>
      {state.userName.length === 0 ? 'Stranger' : state.userName}'s memories
    </h1>
  );
};

export default WelcomeMessage;
