'use client';

import Image from 'next/image';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const [categories, setCategories] = useState<string[] | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [category, setCategory] = useState<null | string>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  const getAllImagesFromDB = async () => {
    const { data: cats, error: error1 } = await supabase
      .from('category')
      .select('*')
      .eq('name', category);

    if (!cats || cats.length === 0) return;

    const { data, error } = await supabase
      .from('image')
      .select('*')
      .eq('user_id', user!.id)
      .eq('category_id', cats[0].id);

    if (!data) return;
    console.log(data);

    setImageUrls(data.map(img => img.url));
  };

  const getAllCategoriesFromDB = async () => {
    const { data, error } = await supabase.from('category').select('*');

    if (!data) return;

    setCategories(data.map(cat => cat.name));
  };

  useEffect(() => {
    // getAllImagesFromDB();
    getAllCategoriesFromDB();
  }, [user?.id]);

  useEffect(() => {
    getAllImagesFromDB();
  }, [category]);

  const uploadImageDB = async (image: File | null) => {
    if (!image) return;

    const {} = await supabase.storage
      .from('memory-bucket')
      .upload(`${image.name}`, image);

    const url = supabase.storage
      .from('memory-bucket')
      .getPublicUrl(`${image.name}`).data.publicUrl;

    const { data, error } = await supabase
      .from('category')
      .select('*')
      .eq('name', category);

    console.log('this is the cateogryyyyyy' + category + data);

    if (data) {
      const {} = await supabase
        .from('image')
        .insert([{ user_id: user!.id, url: url, category_id: data[0].id }]);
    }

    getAllImagesFromDB();
  };

  const uploadImageHandler = (e: ChangeEvent) => {
    const image = (e.target as HTMLInputElement).files?.item(0);

    if (image) uploadImageDB(image);
  };

  const setCategoryHandler = async () => {
    const {} = await supabase
      .from('category')
      .insert([{ name: categoryRef.current!.value }]);

    setCategory(categoryRef.current!.value);
    getAllCategoriesFromDB();
  };

  return (
    <div>
      <div>
        <h1>Your dashboard</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="category"
          ref={categoryRef}
        />
        <button onClick={setCategoryHandler}>Set Category</button>

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
              onClick={() => setCategory(cat)}
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
