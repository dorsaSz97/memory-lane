"use client";
import { useEffect, useState, useRef } from "react";
import { SupaFolder, SupaImage } from "@/types";
import FolderSection from "./FolderSection";

type Props = {
  folders: SupaFolder[];
  images: SupaImage[];
  scrollDown: boolean;
};
const FoldersList = ({ folders, images, scrollDown }: Props) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [direction, setDirection] = useState<number>(-1);

  useEffect(() => {
    let firstPos = 0;
    listRef.current!.addEventListener("scroll", () => {
      if (listRef.current!.scrollTop > firstPos) {
        console.log("going down");
        setDirection(-1);
      } else {
        console.log("going up");
        setDirection(1);
      }
      // saves the new position
      firstPos = listRef.current!.scrollTop;
    });

    return () => {};
  }, []);

  useEffect(() => {
    // scroll down only when a new folder is added
    if (scrollDown && listRef.current)
      listRef.current!.scrollTo({
        top: listRef.current!.scrollHeight * folders.length,
        behavior: "smooth",
      });
  }, [scrollDown]);

  return (
    <div
      className="flex flex-col px-36 w-full h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hidden"
      ref={listRef}
    >
      {folders.length === 0 && <p>No folder added yet. Maybe add one?</p>}
      {folders.length > 0 && (
        <>
          {folders.map((folder) => (
            <FolderSection
              key={folder.id}
              images={images.filter((image) => image.folder_id === folder.id)}
              folder={folder}
              direction={direction}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FoldersList;
