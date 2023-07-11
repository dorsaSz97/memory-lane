"use client";
import { useContext, useState, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useInView, motion } from "framer-motion";
import { SupaFolder, SupaImage } from "@/types";
import { CursorContext } from "@/components/ui/CursorManager";
import ShowcasesList from "./ShowcasesList";

type Props = {
  folder: SupaFolder;
  images: SupaImage[];
  direction: number;
};

const FolderSection = ({ folder, images, direction }: Props) => {
  const router = useRouter();
  const { setMode } = useContext(CursorContext);
  const [isColored, setIsColored] = useState(false);
  const folderImages = useMemo<any[]>(
    () => [...new Array(6)].map((_, i) => images[i]),
    [images]
  );

  // start animation when the header is in view
  const titleRef = useRef<any | null>(null);
  const isInView = useInView(titleRef, { once: false });

  const mouseLeaveHandler = () => {
    setIsColored(false);
    setMode("normal");
  };
  const mouseEnterHandler = () => {
    setIsColored(true);
    setMode("");
  };
  const titleClickHandler = () => {
    setMode("normal");
    router.push(`/dashboard/${folder.id.toString()}`);
  };

  return (
    // should have the snap align alongside snap type for this func to work
    <li className="flex shrink-0 h-screen w-full snap-center">
      <ShowcasesList
        side="left"
        isColored={isColored}
        startAnimation={isInView}
        animateFrom={direction}
        images={folderImages}
      />
      <motion.h2
        ref={titleRef}
        className={`flex-[2] self-center text-center text-8xl`}
        onClick={titleClickHandler}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {folder.name}
      </motion.h2>
      <ShowcasesList
        side="right"
        isColored={isColored}
        startAnimation={isInView}
        animateFrom={direction}
        images={folderImages}
      />
    </li>
  );
};

export default FolderSection;
