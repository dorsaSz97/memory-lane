"use client";
import { FolderType } from "@/types";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState, useRef } from "react";
import { CursorContext } from "./CursorManager";
import { useInView, motion, delay, stagger } from "framer-motion";

const FolderSection = ({
  folder,
  direction,
  user,
}: {
  folder: FolderType;
  direction: number;
  user: User;
}) => {
  const context = useContext(CursorContext);
  const [images, setImages] = useState<any[]>([]);
  const [isColored, setIsColored] = useState(false);
  const [isImgLoading, setIsImageLoading] = useState(true);
  const ref = useRef<any | null>(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => {
    (async () => {
      const { data: images } = await supabase
        .from("images")
        .select("*")
        .eq("user_id", user.id)
        .eq("folder_id", folder.id);

      images
        ? setImages([...new Array(6)].map((el, i) => images[i]))
        : setImages([]);
    })();
  }, []);

  const container = {
    show: {
      opacity: isInView ? 1 : 0,

      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
        staggerDirection: direction === -1 ? 1 : -1,
      },
    },
  };

  const item = {
    show: { opacity: isInView ? 1 : 0 },
  };

  return (
    <li className="flex shrink-0 h-screen snap-center">
      <motion.ul
        className="flex-1 flex flex-col justify-between gap-3 h-full"
        variants={container}
        animate="show"
      >
        {images.slice(0, 3).map((image, i) => {
          return (
            <motion.li
              variants={item}
              transition={{
                duration: 1,
              }}
              // animate={{
              //   opacity: isInView ? 1 : 0,
              //   transition: {
              //     delay: isInView ? (direction === -1 ? i * 2 : -i * 2) : 0,
              //     duration: 1,
              //   },
              // }}
              key={image?.id ?? i}
              className={`${i === 0 && "self-end"} ${
                i === 1 && "self-center"
              } ${i === 2 && "self-start"}  ${
                isColored ? "grayscale-0" : "grayscale"
              }  transition-all duration-1000 flex-1 flex-shrink-0 relative w-1/2 overflow-hidden bg-white ${
                isImgLoading ? " blur-md" : " blur-0"
              }`}
            >
              <Image
                width={500}
                height={500}
                src={i % 2 === 0 ? "/border-solid.png" : "/border-effect.png"}
                alt="Image border"
                className="relative h-full w-full z-20"
              />
              {image && (
                <Image
                  onLoadingComplete={() => {
                    setIsImageLoading(false);
                  }}
                  width={500}
                  height={500}
                  alt="A memory"
                  src={image.url}
                  className={`absolute top-0 left-0 w-full h-full object-cover z-10`}
                />
              )}
            </motion.li>
          );
        })}
      </motion.ul>

      <motion.a
        href={`/dashboard/${folder.id.toString()}`}
        onClick={() => {
          console.log(
            `/dashboard/${
              folder.id.toString() + "+" + folder.name.split(" ").join("-")
            }`
          );
          context.setMode("normal");
        }}
        onMouseEnter={() => {
          setIsColored(true);
          context.setMode("sth");
        }}
        onMouseLeave={() => {
          setIsColored(false);
          context.setMode("normal");
        }}
        className={`flex-[2] self-center text-center text-[8rem]`}
        //
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 2 }}
        ref={ref}
      >
        {folder.name}
      </motion.a>

      <motion.ul
        className="flex-1 flex flex-col justify-between gap-3 h-full"
        variants={container}
        animate="show"
      >
        {images.slice(3, 6).map((image, i) => {
          return (
            <motion.li
              variants={item}
              transition={{
                duration: 1,
              }}
              key={image?.id ?? i}
              className={`${i === 0 && "self-start"} ${
                i === 1 && "self-center"
              } ${i === 2 && "self-end"}   ${
                isColored ? "grayscale-0" : "grayscale"
              } transition-all duration-1000  flex-1 flex-shrink-0 relative w-1/2 overflow-hidden bg-white  ${
                isImgLoading ? " blur-md" : " blur-0"
              }`}
            >
              <Image
                width={500}
                height={500}
                src={i % 2 === 0 ? "/border-solid.png" : "/border-effect.png"}
                alt="Image border"
                className="relative h-full w-full z-20"
              />
              {image && (
                <Image
                  width={500}
                  onLoadingComplete={() => {
                    setIsImageLoading(false);
                  }}
                  height={500}
                  alt="A memory"
                  src={image.url}
                  className={`absolute top-0 left-0 w-full h-full object-cover z-10`}
                />
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    </li>
  );
};

export default FolderSection;
