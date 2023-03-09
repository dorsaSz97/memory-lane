'use client';
import { useState, useRef,FormEvent } from 'react';
import { User } from '@supabase/supabase-js';
import { uploadFolder } from '@/lib/supabaseFuncs';

const FolderUploader = ({ user }: { user: User }) => {
  const [showInput, setShowInput] = useState(false);
  const folderRef = useRef<HTMLInputElement | null>(null);

  const addFolderHandler = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await uploadFolder(user, folderRef.current!.value);
      setShowInput(false);
    } catch (error) {
      console.log('Something went wrong with uploading the folder' + error);
    }
  };

  return (
    <div className="flex relative justify-center">
      {showInput && (
        <form
          onSubmit={addFolderHandler}
          className="absolute top-[-100%] left-1/2 right-1/2 translate-x-[-50%]  bg-primary flex gap-5 p-[1rem] rounded-[7px] w-fit"
        >
          <input
            type="text"
            name="folder-name"
            id="folder-name"
            placeholder="Enter a name..."
            ref={folderRef}
            className="rounded-[5px] p-[0.4rem]"
          />

          <button
            type="submit"
            className="rounded-[5px] p-[0.4rem] whitespace-nowrap"
          >
            Add folder
          </button>
        </form>
      )}
      <button
        type="button"
        className="text-[4rem]"
        onClick={() => setShowInput(!showInput)}
      >
        +
      </button>
    </div>
  );
};

export default FolderUploader;
