"use client";

import React, { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import supabase from "@/util/subpabaseClient-browser";
import { FolderType, SupaImage } from "@/types";
import ImageSlider from "./ImageSlider";

const FolderDetails = ({
  selectedFolder,
  user,
}: {
  user: User;
  selectedFolder: FolderType | null;
}) => {
  const [folder, setFolder] = useState<FolderType | null>(selectedFolder);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [images, setImages] = useState<SupaImage[]>([]);

  useEffect(() => {
    setFolder(selectedFolder);
  }, [selectedFolder]);

  useEffect(() => {
    (async () => {
      const { data: images } = await supabase
        .from("images")
        .select("*")
        .eq("user_id", user.id)
        .eq("folder_id", folder?.id);

      setImages(images || []);
    })();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setImages((prev) => [...prev, payload.new as SupaImage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [images]);

  return (
    <div className="mt-auto overflow-x-scroll  scrollbar-hidden">
      {images && <ImageSlider images={images} />}
    </div>
  );
};

export default FolderDetails;
