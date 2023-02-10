'use client';
import { getFolders, IFolder } from '@/lib/supabaseFuncs';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSupabaseContext } from '../../../store/app-context';

export async function generateStaticParams() {
  const [state, dispatch] = useSupabaseContext();
  console.log(state);
  const folders = await getFolders(state.user!);
  if (!folders) return;

  return folders.map(folder => ({
    folder: folder,
  }));
}

import { uploadImage, getImages } from '../../../lib/supabaseFuncs';
import Link from 'next/link';
import { supabase } from '../../../lib/subpabaseClient';
import Image from 'next/image';

const page = ({ params }: { params: { folder: string } }) => {
  const [state] = useSupabaseContext();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [folder, setFolder] = useState<null | IFolder>(null);
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);

  useEffect(() => {
    supabase
      .from('folders')
      .select('*')
      .eq('user_id', state.user!.id)
      .eq('name', params.folder.split('-').join(' '))
      .then(({ data }: { data: any }) => {
        if (data) {
          setFolder(data[0]);
          setFolder(data[0]);
          getImages(state.user!, data[0]).then(
            data => data && setImageUrls(data.map(img => img))
          );
        }
      });
  }, []);

  const uploadImageHandler = async (e: ChangeEvent) => {
    const image = (e.target as HTMLInputElement).files?.item(0);
    // console.log(image?.type.split('/')[1]);

    try {
      if (image?.type.split('/')[1].toLowerCase() === 'heic')
        throw new Error('Wrong file type');
      if (image) uploadImage(state.user!, image, folder!);
      const data = await getImages(state.user!, folder!);
      data && setImageUrls(data.map(img => img));
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Link href="/dashboard">visit all folders</Link>
      <h1>{params.folder.split('-').join(' ')}</h1>
      <input
        type="file"
        name=""
        id=""
        ref={fileRef}
        onChange={uploadImageHandler}
      />
      <div>
        <ul>
          {imageUrls?.map(imageUrl => (
            <Image
              key={imageUrl}
              src={imageUrl}
              alt={'picture'}
              width={800}
              fill={false}
              height={800}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
