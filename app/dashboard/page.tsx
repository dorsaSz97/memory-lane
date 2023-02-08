'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseContext } from '../../store/app-context';
import { supabase } from '../../lib/subpabaseClient';
import {
  getFolders,
  IFolder,
  uploadImage,
  getImages,
  uploadFolder,
} from '../../lib/supabaseFuncs';

const Dashboard = () => {
  const [state, _] = useSupabaseContext();
  console.log('dashboard is loaded');

  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const [categories, setCategories] = useState<string[] | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [folder, setFolder] = useState<null | IFolder>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);
  console.log(imageUrls);

  useEffect(() => {
    getFolders(state.user!).then(
      data => data && setCategories(data.map(cat => cat))
    );
  }, [state.user?.id]);

  useEffect(() => {
    getFolders(state.user!).then(
      data => data && setCategories(data.map(cat => cat))
    );
    if (!folder) return;
    getImages(state.user!, folder).then(
      data => data && setImageUrls(data.map(img => img))
    );
  }, [folder]);

  const uploadImageHandler = (e: ChangeEvent) => {
    const image = (e.target as HTMLInputElement).files?.item(0);

    if (image) uploadImage(state.user!, image, folder!);
  };

  const setFolderHandler = async () => {
    try {
      const folder = await uploadFolder(
        state.user!,
        categoryRef.current!.value
      );

      if (folder) {
        setFolder(folder);
      }
    } catch {
      console.log('something wrong');
    }
  };

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const folderClickHandler = async (folder: string) => {
    console.log('this is the selected folder');
    console.log(folder);

    const { data: folders } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', state.user!.id)
      .eq('name', folder);

    if (!folders) return;
    console.log(folders[0].id);
    setFolder(folders[0]);
  };

  return (
    <div>
      <div>
        <button type="button" onClick={signOutHandler}>
          sign out
        </button>
        <h1>Your dashboard</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="category"
          ref={categoryRef}
        />
        <button onClick={setFolderHandler}>Set Category</button>

        <input
          type="file"
          name=""
          id=""
          ref={fileRef}
          onChange={uploadImageHandler}
        />
      </div>
      <div>
        <ul>
          {categories?.map(cat => (
            <li
              style={{ cursor: 'pointer' }}
              key={cat}
              onClick={() => folderClickHandler(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {imageUrls?.map(imageUrl => (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={'picture'}
              width={800}
              height={800}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
