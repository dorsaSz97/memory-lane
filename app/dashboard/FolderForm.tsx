'use client';
import React, { useRef, useState } from 'react';
import { uploadFolder } from '@/lib/supabaseFuncs';
import { useSupabaseContext } from '@/store/app-context';

const FolderUploader = ({
  setFolders,
}: {
  setFolders: React.Dispatch<React.SetStateAction<string[] | null>>;
}) => {
  const [state] = useSupabaseContext();
  const currentUser = state.user;

  if (!currentUser) return <></>;

  const [showInput, setShowInput] = useState(false);
  const folderRef = useRef<HTMLInputElement | null>(null);

  const setFolderHandler = async () => {
    try {
      const folder = await uploadFolder(currentUser, folderRef.current!.value);
      setFolders(prev => prev?.concat(folder!.name) || [folder!.name]);
      setShowInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {showInput && (
        <>
          <input
            type="text"
            name="folder-name"
            id="folder-name"
            placeholder="folder"
            ref={folderRef}
          />
          <button onClick={setFolderHandler}>Add folder</button>
        </>
      )}
      <button onClick={() => setShowInput(true)}>+</button>;
    </div>
  );
};

export default FolderUploader;
