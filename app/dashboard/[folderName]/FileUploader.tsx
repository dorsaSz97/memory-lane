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
    <form>
      <label htmlFor="memory-image">Upload your memory: </label>
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
