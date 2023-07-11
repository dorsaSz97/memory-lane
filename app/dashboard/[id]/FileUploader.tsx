"use client";

import React, { ChangeEvent, useRef, FormEvent, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/util/subpabaseClient-browser";
import { SupaFolder } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../loading";

const FileUploader = ({
  currentFolder,
  setShowFileUploader,
}: {
  currentFolder: SupaFolder;
  setShowFileUploader: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImageHandler = async () => {
    setIsLoading(true);
    const uploadedImagesList = fileRef.current!.files;
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
      setShowFileUploader(false);
      fileRef.current!.files = null;
    }
  };

  return (
    <motion.form
      className="bg-primary absolute flex flex-col gap-8 w-fit items-center left-[50%] translate-x-[-50%] top-[110%] p-3 rounded-[5px] shadow-2xl z-[90000]"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {" "}
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

export default FileUploader;
