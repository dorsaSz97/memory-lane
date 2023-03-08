'use client';

import React, { ChangeEvent, useRef } from 'react';
import { useSupabaseContext } from '@/store/app-context';
import { IFolder } from '@/lib/supabaseFuncs';
import { uploadImage } from '@/lib/supabaseFuncs';

const FileUploader = ({ currentFolder }: { currentFolder: IFolder }) => {
  const [state] = useSupabaseContext();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const currentUser = state.user!;

  const uploadImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImagesList = e.target.files;
    let uploadedImage: File | null;

    if (uploadedImagesList && uploadedImagesList) {
      uploadedImage = uploadedImagesList.item(0);
    } else {
      uploadedImage = null;
    }

    try {
      if (uploadedImage) {
        // HEIC format isnt supported by supabase
        if (uploadedImage.type.split('/')[1].toLowerCase() === 'heic')
          throw new Error('Wrong file type');

        await uploadImage(currentUser, uploadedImage, currentFolder!);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    // position: absolute;
    // top: -100%;
    // flex-direction: column;
    // display: flex;
    // right: 50%;
    // gap: 2rem;
    // width: fit-content;
    // transform: translateX(50%);
    // align-items: center;

    <form className="bg-primary absolute flex flex-col gap-8 w-fit items-center left-[110%] top-0 p-3 rounded-[5px] shadow-2xl">
      <label htmlFor="memory-image" className="text-[2rem]">
        Your memory:{' '}
      </label>
      <input
        type="file"
        name="memory-image"
        id="memory-image"
        ref={fileRef}
        onChange={uploadImageHandler}
      />
    </form>
  );
};

export default FileUploader;
