import { cache } from 'react';
import { supabase } from './subpabaseClient';
import { User, PostgrestResponse } from '@supabase/supabase-js';

export interface IFolder {
  id: any;
  name: string;
  user_id: string;
}
export interface IImage {
  id: any;
  url: string;
  user_id: string;
  folder_id: number;
}

export const getFolders = cache(async (user: User) => {
  try {
    const { data: folders, error: foldersError } = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', user.id);

    if (!folders || folders.length === 0 || foldersError) throw new Error();

    const userFolders = folders.map((folder: IFolder) => folder.name);
    return userFolders;
  } catch {
    console.log('Something went wrong with getting the folders');
  }
});

export const getFolder = async (user: User, folderName: string) => {
  try {
    const { data }: PostgrestResponse<IFolder> = await supabase
      .from('folders')
      .select('*')
      .eq('user_id', user.id)
      .eq('name', folderName);

    console.log('data');
    console.log(data);

    if (!data || data.length === 0 || !data[0]) throw new Error();

    const folder = data[0];
    return folder;
  } catch {
    console.log('Something went wrong with getting the selected folder');
  }
};

export const getImages = async (user: User, selectedFolder: IFolder) => {
  try {
    console.log(user.id, selectedFolder.id);
    const { data: images, error: imagesError } = await supabase
      .from('images')
      .select('*')
      .eq('user_id', user.id)
      .eq('folder_id', selectedFolder.id);

    console.log(images);

    if (!images || images.length === 0 || imagesError) throw new Error();

    const userImages = images.map(img => img.url);
    return userImages;
  } catch (error) {
    console.log(error);
    console.log('Something went wrong with getting the images');
  }
};

export const uploadImage = async (
  user: User,
  imageFile: File,
  currentFolder: IFolder
) => {
  const imagePath = imageFile.name;
  try {
    // uploading the image to the bucket
    await supabase.storage.from('memories').upload(imagePath, imageFile);

    // getting the image's url
    // const imageUrl = supabase.storage.from('memories').getPublicUrl(imagePath, {
    //   transform: {
    //     width: 400,
    //     height: 400,
    //     resize: 'contain',
    //     // format: 'origin',
    //   },
    // }).data.publicUrl;
    const imageUrl = supabase.storage.from('memories').getPublicUrl(imagePath)
      .data.publicUrl;

    // inserting a new image row
    await supabase
      .from('images')
      .insert({ user_id: user.id, url: imageUrl, folder_id: currentFolder.id });
  } catch {
    console.log('Something went wrong with uploading the image');
  }
};

export const uploadFolder = async (user: User, name: string) => {
  try {
    const { data: folder, error: folderError } = await supabase
      .from('folders')
      .insert([{ name: name, user_id: user.id }])
      .select();

    if (!folder || folderError) throw new Error();
    return folder![0] as IFolder;
  } catch {
    console.log('Something went wrong with uploading the folder');
  }
};
