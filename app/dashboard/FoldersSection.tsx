'use client';

import { useEffect, useState, Suspense, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '@/lib/subpabaseClient-client';
import { getFolders } from '@/lib/supabaseFuncs';
import Link from 'next/link';

const FoldersSection = ({
  user,
  userFolders,
}: {
  user: User;
  userFolders: { name: string }[] | null;
}) => {
  const [folders, setFolders] = useState<string[] | null>(
    userFolders?.map(folder => folder.name) || null
  );
  const ref = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      left: ref.current!.scrollWidth + 1000,
      behavior: 'smooth',
    });
  }, [folders]);

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'folders' },
        payload => {
          if (payload.eventType === 'INSERT') {
            const newFolder = payload.new;

            setFolders(prev =>
              prev ? [...prev, newFolder.name] : [newFolder.name]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      {!folders && <p>Loading....</p>}
      {folders && folders.length === 0 && (
        <p>No folder added yet. Maybe add one?</p>
      )}
      {folders && folders.length > 0 && (
        <div className="overflow-hidden w-full p-4 h-fit">
          <ul
            className="flex gap-10 overflow-x-scroll h-full text-dark scrollbar"
            ref={ref}
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
