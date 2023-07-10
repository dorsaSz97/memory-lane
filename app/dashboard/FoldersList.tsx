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
  const [inserted, setInserted] = useState(false);
  const foldersRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "folders" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setInserted(true);
            setFolders((prev) => [...prev, payload.new as FolderType]);
          }
          if (payload.eventType === "DELETE") {
            setFolders((prev) => [
              ...prev.filter(
                (folder) => folder.id !== (payload.old as FolderType).id
              ),
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    if (inserted)
      foldersRef.current!.scrollTo({
        top: foldersRef.current!.scrollHeight * folders.length,
        behavior: "smooth",
      });
  }, [folders]);

  // useEffect(() => {
  // (async () => {
  //   const locomotiveScroll = new LocomotiveScroll({
  //     lenisOptions: {
  //       wrapper: window,
  //       content: document.documentElement,
  //       lerp: 0.1,
  //       duration: 2,
  //       orientation: "vertical",
  //       gestureOrientation: "vertical",
  //       smoothWheel: true,
  //       smoothTouch: false,
  //       wheelMultiplier: 1,
  //       touchMultiplier: -3,
  //       normalizeWheel: true,
  //       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  //     },
  //   });
  // })();

  // }, []);

  return (
    <div
      className="flex flex-col h-full snap-mandatory snap-y overflow-y-scroll text-8xl scrollbar-hidden  px-36"
      // className="flex flex-col h-full text-8xl scrollbar-hidden"
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
