"use client";
import { useEffect, useState, useRef } from "react";
import supabase from "@/util/subpabaseClient-browser";
import { FolderType } from "@/types";
import FolderSection from "./FolderSection";
import { User } from "@supabase/supabase-js";

const FoldersList = ({
  userFolders,
  user,
}: {
  userFolders: FolderType[];
  user: User;
}) => {
  const [folders, setFolders] = useState([...userFolders]);
  const foldersRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "folders" },
        (payload) => {
          if (payload.eventType === "INSERT")
            setFolders((prev) => [...prev, payload.new as FolderType]);
        }
      )
      .subscribe();

    foldersRef.current!.scrollTo({
      top: foldersRef.current!.scrollHeight * folders.length,
      behavior: "smooth",
    });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [folders]);

  return (
    <div
      className="flex flex-col h-full snap-mandatory snap-y overflow-y-scroll text-8xl scrollbar-hidden"
      ref={foldersRef}
    >
      {folders.length === 0 && <p>No folder added yet. Maybe add one?</p>}
      {folders.length > 0 && (
        <>
          {folders.map((folder) => (
            <FolderSection key={folder.id} folder={folder} user={user} />
          ))}
        </>
      )}
    </div>
  );
};

export default FoldersList;
