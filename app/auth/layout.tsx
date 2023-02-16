import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <aside>sth is here for testing purposes</aside>
      {children}
    </>
  );
};

export default layout;
