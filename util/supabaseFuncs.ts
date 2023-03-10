import { User } from '@supabase/supabase-js';
import supabase from './subpabaseClient-browser';

export const uploadImage = async (
  user: User,
  imageFile: File,
  currentFolder: { id: number; name: string; user_id: string }
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
