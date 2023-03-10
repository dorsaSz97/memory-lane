'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '@/util/subpabaseClient-browser';
import { FolderType, ImageType } from '@/types';
import FileUploader from './FileUploader';
import ImageGallery from './ImageGallery';

const FolderDetails = ({
  selectedFolder,
  user,
}: {
  user: User;
  selectedFolder: FolderType | null;
}) => {
  const [folder, setFolder] = useState<FolderType | null>(selectedFolder);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  console.log(showFileUploader);
  console.log(folder);

  useEffect(() => {
    setFolder(selectedFolder);
  }, [selectedFolder]);

  useEffect(() => {
    (async () => {
      const { data: images } = await supabase
        .from('images')
        .select('*')
        .eq('user_id', user.id)
        .eq('folder_id', folder?.id);

      setImageUrls(images ? images.map(img => img.url) : []);
    })();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'images' },
        payload => {
          if (payload.eventType === 'INSERT') {
            setImageUrls(prev => [...prev, (payload.new as ImageType).url]);
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
        {showFileUploader && folder && (
          <FileUploader
            user={user}
            currentFolder={folder}
            setShowFileUploader={setShowFileUploader}
          />
        )}
      </div>
    </div>
  );
};

export default FolderDetails;
