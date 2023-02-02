'use client';

import Image from 'next/image';
import React, {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { supabase } from '../lib/subpabaseClient';
import { Session, User } from '@supabase/supabase-js';

const Dashboard = ({
  user,
  session,
}: {
  user: User | null;
  session: Session | null;
}) => {
  console.log(user?.id);
  const [imageUrls, setImageUrls] = useState<string[] | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const getAllImagesFromDB = async () => {
    const { data, error } = await supabase
      .from('image')
      .select('*')
      .eq('user_id', user!.id);

    if (!data) return;
    console.log(data);

    setImageUrls(data.map(img => img.url));
  };

  useEffect(() => {
    getAllImagesFromDB();
  }, [user?.id]);

  const uploadImageDB = async (image: File | null) => {
    if (!image) return;

    const {} = await supabase.storage
      .from('memory-bucket')
      .upload(`${image.name}`, image);

    const url = supabase.storage
      .from('memory-bucket')
      .getPublicUrl(`${image.name}`).data.publicUrl;

    const {} = await supabase
      .from('image')
      .insert([{ user_id: user!.id, url: url }]);

    getAllImagesFromDB();
  };

  const uploadImageHandler = (e: ChangeEvent) => {
    const image = (e.target as HTMLInputElement).files?.item(0);

    if (image) uploadImageDB(image);
  };

  return (
    <div>
      <div>
        <h1>Your dashboard</h1>
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
          {imageUrls?.map(imageUrl => (
            <Image src={imageUrl} alt={'picture'} width={800} height={800} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
