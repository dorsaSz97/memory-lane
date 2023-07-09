"use client";
import { FolderType } from "@/types";
import supabase from "@/util/subpabaseClient-browser";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FolderSection = ({
  folder,
  user,
}: {
  folder: FolderType;
  user: User;
}) => {
  const [images, setImages] = useState<any[]>([]);
  const [isColored, setIsColored] = useState(false);

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

  return (
    <li key={folder.id} className="flex shrink-0 h-screen snap-center">
      <ul className="flex-1 flex flex-col justify-between gap-3 h-full">
        {images.slice(0, 3).map((image, i) => {
          return (
            <li
              key={image?.id ?? i}
              className={`${i === 0 && "self-end"} ${
                i === 1 && "self-center"
              } ${i === 2 && "self-start"}  ${
                isColored ? "grayscale-0" : "grayscale"
              }  transition-all duration-1000 flex-1 flex-shrink-0 relative w-1/2 overflow-hidden bg-white`}
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
                  height={500}
                  alt="A memory"
                  src={image.url}
                  className={`absolute top-0 left-0 w-full h-full object-cover z-10`}
                />
              )}
            </li>
          );
        })}
      </ul>

      <Link
        href={`/dashboard/${folder.name.split(" ").join("-")}`}
        onMouseEnter={() => setIsColored(true)}
        onMouseLeave={() => setIsColored(false)}
        className="flex-[2] self-center text-center text-[8rem]"
      >
        {folder.name}
      </Link>

      <ul className="flex-1 flex flex-col justify-between gap-3 h-full">
        {images.slice(3, 6).map((image, i) => {
          return (
            <li
              key={image?.id ?? i}
              className={`${i === 0 && "self-start"} ${
                i === 1 && "self-center"
              } ${i === 2 && "self-end"}   ${
                isColored ? "grayscale-0" : "grayscale"
              } transition-all duration-1000  flex-1 flex-shrink-0 relative w-1/2 overflow-hidden bg-white`}
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
                  height={500}
                  alt="A memory"
                  src={image.url}
                  className={`absolute top-0 left-0 w-full h-full object-cover z-10`}
                />
              )}
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default FolderSection;
