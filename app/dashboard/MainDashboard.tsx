'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/subpabaseClient';
import FoldersSection from './FoldersSection';
import FolderForm from './FolderForm';

const MainDashboard = () => {
  const [folders, setFolders] = useState<string[] | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        payload => {
          if (payload.eventType === 'INSERT') {
            console.log(payload);
            setFolders(prev =>
              prev ? [...prev, payload.new.name] : [payload.new.name]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [folders]);

  return (
    <>
      <FolderForm setFolders={setFolders} />
      <FoldersSection folders={folders} setFolders={setFolders} />
    </>
  );
};

export default MainDashboard;
