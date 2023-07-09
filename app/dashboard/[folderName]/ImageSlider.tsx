"use client";
import { SupaImage } from "@/types";

import Image from "next/image";
import { useState, useRef } from "react";

const ImageSlider = ({ images }: { images: SupaImage[] }) => {
  const [isLoading, setIsLoading] = useState(true);

  const classes = isLoading
    ? "scale-110 blur-2xl grayscale"
    : "scale-100 blur-0 grayscale-0";

  return (
    <ul className="flex gap-5 items-center overflow-visible h-[300px] min-w-fit">
      {images.map((image, i) => {
        return (
          <div
            key={image.id}
            className="relative flex-shrink-0  z-20 overflow-hidden  h-full w-[15%] transition-all origin-bottom hover:w-[22%] hover:scale-y-150"
          >
            <Image
              width={1000}
              height={1000}
              alt="photo"
              src={image.url}
              className={` ${classes} absolute top-0 left-0 w-full h-full object-cover z-10`}
              onLoadingComplete={() => setIsLoading(false)}
            />
            <Image
              width={1000}
              height={1000}
              src={i % 2 === 0 ? "/border-solid.png" : "/border-effect.png"}
              alt="a border"
              className="relative z-20 h-full w-full"
            />
          </div>
        );
      })}
    </ul>
  );
};

export default ImageSlider;
