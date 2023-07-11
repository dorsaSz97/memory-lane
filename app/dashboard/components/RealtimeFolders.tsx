"use client";
import { useEffect, useState } from "react";
import { SupaFolder, SupaImage } from "@/types";
import supabase from "@/util/subpabaseClient-browser";
import FoldersList from "./FoldersList";

const RealtimeFolders = ({
  serverFolders,
  serverImages,
  children,
}: {
  serverFolders: SupaFolder[];
  serverImages: SupaImage[];
  children: React.ReactNode;
}) => {
  const [folders, setFolders] = useState(serverFolders);
  const [images, setImages] = useState(serverImages);
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("realtime folders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "folders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setFolders((prev) => [...prev, payload.new as SupaFolder]);
            setScrollDown(true);
          }
          if (payload.eventType === "DELETE") {
            setFolders((prev) =>
              prev.filter(
                (folder) => folder.id !== (payload.old as SupaFolder).id
              )
            );
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "images" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setImages((prev) => [...prev, payload.new as SupaImage]);
          }
          if (payload.eventType === "DELETE") {
            setImages((prev) =>
              prev.filter(
                (folder) => folder.id !== (payload.old as SupaImage).id
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <>
      <FoldersList folders={folders} images={images} scrollDown={scrollDown} />
      {children}
    </>
  );
};

export default RealtimeFolders;
