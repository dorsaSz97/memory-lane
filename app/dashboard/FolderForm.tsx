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
      const folder = await uploadFolder(currentUser, folderRef.current!.value);
      setShowInput(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex relative justify-center">
      {showInput && (
        <div className="absolute top-[-100%] left-1/2 right-1/2 translate-x-[-50%]  bg-primary flex gap-5 p-[1rem] rounded-[7px] w-fit">
          <input
            type="text"
            name="folder-name"
            id="folder-name"
            placeholder="folder"
            ref={folderRef}
            className="rounded-[5px] p-[0.4rem]"
          />

          <button
            onClick={setFolderHandler}
            className="rounded-[5px] p-[0.4rem] whitespace-nowrap"
          >
            Add folder
          </button>
        </div>
      )}
      <button className="text-[4rem] " onClick={() => setShowInput(!showInput)}>
        +
      </button>
    </div>
  );
};

export default FolderUploader;
