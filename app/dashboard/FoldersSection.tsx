'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import supabase from '@/util/subpabaseClient-browser';
import { FolderType } from '@/types';

const FoldersSection = ({ userFolders }: { userFolders: string[] }) => {
  const [folders, setFolders] = useState<string[]>(userFolders);
  const folderListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        payload => {
          if (payload.eventType === 'INSERT')
            setFolders(prev => [...prev, (payload.new as FolderType).name]);
        }
      )
      .subscribe();

    folderListRef.current?.scrollTo({
      left: folderListRef.current!.scrollWidth + 1000,
      behavior: 'smooth',
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [folders]);

  return (
    <>
      {folders.length === 0 && <p>No folder added yet. Maybe add one?</p>}
      {folders.length > 0 && (
        <div className="overflow-hidden w-full p-4 h-fit">
          <ul
            className="flex gap-10 overflow-x-scroll h-full text-dark scrollbar  overflow-y-visible"
            ref={folderListRef}
          >
            {folders.map(folder => (
              <li
                style={{ cursor: 'pointer' }}
                key={folder}
                className="hover:translate-y-[-30px] transition-all translate-y-0"
              >
                <Link href={`/dashboard/${folder.split(' ').join('-')}`}>
                  {folder}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default FoldersSection;
