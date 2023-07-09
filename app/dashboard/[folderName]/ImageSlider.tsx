"use client";
import { SupaImage } from "@/types";
import Image from "next/image";
import { useState, DragEvent, useEffect } from "react";
import RealtimeProvider from "./RealtimeProvider";

const ImageSlider = ({ images }: { images: SupaImage[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userImages, setUserImages] = useState([...images]);

  const dragHandler = (e: DragEvent<HTMLDivElement>, imgId: string) => {
    e.dataTransfer.setData("text/plain", imgId);
  };

  useEffect(() => {
    setUserImages(images);
  }, [images]);

  const classes = isLoading
    ? "scale-110 blur-2xl grayscale"
    : "scale-100 blur-0 grayscale-0";

  return (
    <RealtimeProvider setServerImages={setUserImages}>
      <ul className="flex gap-5 items-center overflow-visible h-[300px] min-w-fit image-container">
        {userImages.map((image, i) => {
          return (
            <div
              draggable
              onDragStart={(e: DragEvent<HTMLDivElement>) =>
                dragHandler(e, image.id.toString())
              }
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
    </RealtimeProvider>
  );
};

export default ImageSlider;
