'use client';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { getFolders } from '@/lib/supabaseFuncs';
import { useSupabaseContext } from '@/store/app-context';

type Props = {
  folders: string[] | null;
  setFolders: React.Dispatch<React.SetStateAction<string[] | null>>;
};
const FoldersSection = forwardRef((props: Props, ref: any) => {
  const [state] = useSupabaseContext();
  const currentUser = state.user;

  if (!currentUser) return <></>;

  useEffect(() => {
    getFolders(currentUser).then(
      data => data && props.setFolders(data.map(cat => cat))
    );
  }, [currentUser.id]);

  return (
    <div className="my-auto self-center text-[7rem] w-full">
      {!props.folders || props.folders?.length === 0 ? (
        <p>No folder. Maybe add one?</p>
      ) : (
        <div className="overflow-hidden w-full p-4 h-fit">
          <ul
            className="flex gap-10 overflow-x-scroll h-full text-dark scrollbar"
            ref={ref}
          >
            {props.folders.map(folder => (
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
    </div>
  );
});

export default FoldersSection;
