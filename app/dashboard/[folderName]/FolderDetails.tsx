'use client';

import React, { useEffect, useState } from 'react';
import { getFolder, getImages, IFolder } from '@/lib/supabaseFuncs';
import FileUploader from './FileUploader';
import ImageGallery from './ImageGallery';
import { useSupabaseContext } from '@/store/app-context';
import supabase from '@/lib/subpabaseClient-client';

const FolderDetails = ({ folderName }: { folderName: string }) => {
  const [state] = useSupabaseContext();
  const [folder, setFolder] = useState<null | IFolder>(null);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);

  console.log(folder);
  const loadImages = async (folder: IFolder) => {
    const data = await getImages(state.user!, folder);

    if (data) {
      setImageUrls(data.map(img => img));
    }
  };

  useEffect(() => {
    (async () => {
      if (!state.user) return;
      const selectedFolder = await getFolder(state.user, folderName);
      if (!selectedFolder) return;
      setFolder(selectedFolder);
      await loadImages(selectedFolder);
    })();
  }, [folderName]);

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'images' },
        payload => {
          if (payload.eventType === 'INSERT') {
            setImageUrls(prev =>
              prev ? [...prev, payload.new.url] : [payload.new.url]
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [imageUrls]);

  return (
    <div className="mt-auto w-full flex- flex-col gap-10">
      {imageUrls && <ImageGallery imageUrls={imageUrls} />}
      <div className="relative flex justify-center">
        <button
          className="text-[7rem]"
          onClick={() => setShowFileUploader(!showFileUploader)}
        >
          +
        </button>
        {showFileUploader && folder && <FileUploader currentFolder={folder} />}
      </div>
    </div>
  );
};

export default FolderDetails;
