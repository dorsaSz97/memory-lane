import { supabase } from './subpabaseClient';
import { useSupabaseContext } from '../store/app-context';
import { ISupabaseState } from '../store/app-state';
import { User } from '@supabase/supabase-js';

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

export const getFolders = async (user: User) => {
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
  image: File,
  selectedFolder: IFolder
) => {
  try {
    await supabase.storage.from('memories').upload(`${image.name}`, image);

    const url = supabase.storage.from('memories').getPublicUrl(`${image.name}`)
      .data.publicUrl;

    console.log('this is image url');
    console.log(url);

    await supabase
      .from('images')
      .insert([{ user_id: user.id, url: url, folder_id: selectedFolder.id }]);
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
