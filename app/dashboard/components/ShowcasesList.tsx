"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SupaImage } from "@/types";

type Props = {
  side: "left" | "right";
  images: SupaImage[];
  isColored: boolean;
  startAnimation: boolean;
  animateFrom: number;
};

const ShowcasesList = ({
  side,
  images,
  isColored,
  startAnimation,
  animateFrom,
}: Props) => {
  const [imgLoading, setImgLoading] = useState(true);

  const container = {
    reveal: {
      opacity: startAnimation ? 1 : 0,

      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.4,
        staggerDirection: animateFrom === -1 ? 1 : -1,
      },
    },
  };
  const item = {
    reveal: {
      opacity: startAnimation ? 1 : 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.ul
      className="flex-1 flex flex-col justify-between gap-3 h-full"
      variants={container}
      animate="reveal"
    >
      {images
        .slice(side === "left" ? 0 : 3, side === "left" ? 3 : 6)
        .map((image, i) => {
          return (
            <motion.li
              key={image?.id ?? i}
              variants={item}
              className={`flex-1 flex-shrink-0 relative w-1/2 transition-all duration-1000 overflow-hidden bg-white z-[2] ${
                i === 0 && (side === "left" ? "self-end" : "self-start")
              } ${i === 1 && "self-center"} ${
                i === 2 && (side === "left" ? "self-start" : "self-end")
              } ${isColored ? "grayscale-0" : "grayscale"} `}
            >
              <Image
                className="relative h-full w-full z-[2]"
                // fill
                width={300}
                height={500}
                alt="border"
                src={i % 2 === 0 ? "/border-solid.png" : "/border-effect.png"}
              />
              {image && (
                <Image
                  className={`absolute top-0 left-0 w-full h-full object-cover z-[1] ${
                    imgLoading ? "blur-md" : "blur-0"
                  }`}
                  onWaiting={() => setImgLoading(true)}
                  onLoadingComplete={() => {
                    setImgLoading(false);
                  }}
                  width={400}
                  height={600}
                  alt="memory"
                  src={image.url}
                />
              )}
            </motion.li>
          );
        })}
    </motion.ul>
  );
};

export default ShowcasesList;
