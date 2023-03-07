'use client';

import React, { useEffect, useState, createRef } from 'react';
import { supabase } from '@/lib/subpabaseClient';
import FoldersSection from './FoldersSection';
import FolderForm from './FolderForm';

const MainDashboard = () => {
  const [folders, setFolders] = useState<string[] | null>(null);
  const ulRef = createRef<HTMLUListElement | null>();

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        payload => {
          if (payload.eventType === 'INSERT') {
            setFolders(prev =>
              prev ? [...prev, payload.new.name] : [payload.new.name]
            );
          }
        }
      )
      .subscribe();
    ulRef.current?.scrollTo({
      left: ulRef.current!.scrollWidth + 1000,
      behavior: 'smooth',
    });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [folders]);

  return (
    <>
      <FoldersSection folders={folders} ref={ulRef} setFolders={setFolders} />
      <FolderForm />
    </>
  );
};

export default MainDashboard;
