'use client';

import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useSupabaseContext } from '../../store/app-context';
import { supabase } from '../../lib/subpabaseClient';
import { useRouter } from 'next/navigation';
import {
  getFolders,
  IFolder,
  uploadImage,
  getImages,
  uploadFolder,
} from '../../lib/supabaseFuncs';
import Link from 'next/link';

const Dashboard = () => {
  const [state, _] = useSupabaseContext();
  console.log(state);

  const [categories, setCategories] = useState<string[] | null>(null);

  const [folder, setFolder] = useState<null | IFolder>(null);
  const categoryRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getFolders(state.user!).then(
      data => data && setCategories(data.map(cat => cat))
    );
  }, [state.user?.id]);

  const setFolderHandler = async () => {
    try {
      const folder = await uploadFolder(
        state.user!,
        categoryRef.current!.value
      );

      if (folder) {
        setFolder(folder);
        setShowInput(false);
      }
    } catch {
      console.log('something wrong');
    }
  };

  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const [showInput, setShowInput] = useState(false);
  useEffect(() => {
    getFolders(state.user!).then(
      data => data && setCategories(data.map(cat => cat))
    );
    if (!folder) return;
  }, [folder]);
  return (
    <main>
      <button onClick={signOutHandler}>sign out</button>
      <h1>
        {state.userName.length === 0 ? 'Stranger' : state.userName}'s memories
      </h1>

      {!categories || categories.length === 0 ? (
        <p>nothing's added</p>
      ) : (
        <div>
          <ul>
            {categories?.map(cat => (
              <li style={{ cursor: 'pointer' }} key={cat}>
                <Link href={`/dashboard/${cat.split(' ').join('-')}`}>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showInput && (
        <>
          <input
            type="text"
            name=""
            id=""
            placeholder="category"
            ref={categoryRef}
          />
          <button onClick={setFolderHandler}>add category</button>
        </>
      )}
      <button onClick={() => setShowInput(true)}>+</button>
    </main>
  );
};

export default Dashboard;
