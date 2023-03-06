'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { getFolders } from '@/lib/supabaseFuncs';
import { useSupabaseContext } from '@/store/app-context';

const FoldersSection = ({
  folders,
  setFolders,
}: {
  folders: string[] | null;
  setFolders: React.Dispatch<React.SetStateAction<string[] | null>>;
}) => {
  const [state] = useSupabaseContext();
  const currentUser = state.user;

  if (!currentUser) return <></>;

  useEffect(() => {
    getFolders(currentUser).then(
      data => data && setFolders(data.map(cat => cat))
    );
  }, [currentUser.id]);

  return (
    <div>
      {!folders || folders.length === 0 ? (
        <p>No folder. Maybe add one?</p>
      ) : (
        <div>
          <ul>
            {folders.map(folder => (
              <li style={{ cursor: 'pointer' }} key={folder}>
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
};

export default FoldersSection;
