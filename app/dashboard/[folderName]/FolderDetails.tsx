'use client';

import React, { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '@/util/subpabaseClient-browser';
import { FolderType, ImageType } from '@/types';
import FileUploader from './FileUploader';
import ImageGallery from './ImageGallery';
import { AnimatePresence } from 'framer-motion';

const FolderDetails = ({
  selectedFolder,
  user,
}: {
  user: User;
  selectedFolder: FolderType | null;
}) => {
  const [folder, setFolder] = useState<FolderType | null>(selectedFolder);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [images, setImages] = useState<ImageType[]>([]);
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

      setImages(images || []);
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
            setImages(prev => [...prev, payload.new as ImageType]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [images]);

  return (
    <div className="mt-auto w-full flex- flex-col gap-10">
      {images && <ImageGallery images={images} />}
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
