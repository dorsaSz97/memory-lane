"use client";
import React, { useRef, FormEvent, useState } from "react";
import supabase from "@/util/subpabaseClient-browser";
import { SupaFolder } from "@/types";
import { motion } from "framer-motion";
import Loading from "../loading";

const ImageForm = ({
  currentFolder,
  setShowForm,
}: {
  currentFolder: SupaFolder;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageHandler = async () => {
    setIsLoading(true);
    const uploadedImagesList = fileRef.current!.files;
    fileRef.current!.files = null;
    let uploadedImage: File | null;

    if (uploadedImagesList && uploadedImagesList) {
      uploadedImage = uploadedImagesList.item(0);
    } else {
      uploadedImage = null;
    }

    if (uploadedImage) {
      // HEIC format isnt supported by supabase
      if (uploadedImage.type.split("/")[1].toLowerCase() === "heic") {
        alert("Wrong file type");
      } else {
        // uploading the image to the bucket
        await supabase.storage
          .from("memories")
          .upload(uploadedImage.name, uploadedImage);

        const imageUrl = supabase.storage
          .from("memories")
          .getPublicUrl(uploadedImage.name).data.publicUrl;

        // inserting a new image row
        await supabase.from("images").insert({
          user_id: currentFolder.user_id,
          url: imageUrl,
          folder_id: currentFolder.id,
        });
      }

      setIsLoading(false);

      setShowForm(false);
    }
  };

  return (
    <motion.form
      className="flex flex-col gap-8 items-center absolute left-1/2 -translate-x-1/2 top-[110%] w-fit p-4 bg-primary drop-shadow-form rounded-lg "
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <label htmlFor="memory-image" className="text-[2rem]">
            Your memory:
          </label>
          <input
            type="file"
            name="memory-image"
            id="memory-image"
            ref={fileRef}
          />
          <button onClick={uploadImageHandler}>Upload</button>
        </>
      )}
    </motion.form>
  );
};

export default ImageForm;
