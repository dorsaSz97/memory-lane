'use client';
import React, { useRef, useState } from 'react';
import { uploadFolder } from '@/lib/supabaseFuncs';
import { useSupabaseContext } from '@/store/app-context';

const FolderUploader = () => {
  const [state] = useSupabaseContext();
  const currentUser = state.user;

  if (!currentUser) return <></>;

  const [showInput, setShowInput] = useState(false);
  const folderRef = useRef<HTMLInputElement | null>(null);

  const setFolderHandler = async () => {
    try {
      await uploadFolder(currentUser, folderRef.current!.value);
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
