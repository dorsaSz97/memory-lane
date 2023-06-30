"use client";
import Image, { ImageProps } from "next/image";
import React, {
  forwardRef,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImageType } from "@/types";

const ExoticImage = forwardRef<HTMLImageElement, ImageProps>(
  function ExoticImageWrapper(props, ref) {
    const [isLoading, setIsLoading] = useState(true);
    const classes = isLoading
      ? "scale-110 blur-2xl grayscale"
      : "scale-100 blur-0 grayscale-0";

    return (
      <Image
        width={2000}
        height={2000}
        {...props}
        ref={ref}
        onLoadingComplete={() => setIsLoading(false)}
        className={` ${classes} ${props.className}`}
      />
    );
  }
);

const MotionComponent = motion(ExoticImage, { forwardMotionProps: true });

const ImageGallery = ({ images }: { images: ImageType[] }) => {
  // const imageUrls = useMemo(() => {
  //   return images.map(image => image.url);
  // }, [images]);
  // const [isLoading, setIsLoading] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>();

  return (
    <ul className="grid grid-cols-fluid gap-2 flex-1 justify-center">
      {images.map((image) => (
        <motion.div
          layout={true}
          key={image.id}
          className={`w-full relative h-[300px] bg-transparent`}
        >
          <AnimatePresence>
            {isImageZoomed && (
              <motion.div
                initial={{
                  opacity: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 0.9,
                }}
                className={`  ${" fixed bg-black  opacity-90 top-0 left-0 z-[1999] w-full h-full"}`}
              />
            )}
          </AnimatePresence>
          <MotionComponent
            layout={"preserve-aspect"}
            src={image.url}
            alt={"A memory"}
            onClick={() => {
              setIsImageZoomed(!isImageZoomed);
              setSelectedImage(image.id);
            }}
            transition={{
              layout: { duration: 0.3 },
            }}
            className={`object-cover aspect-[1] ${
              selectedImage === image.id ? " z-[100000] " : "  z-[1000] "
            }  ${
              isImageZoomed && selectedImage === image.id
                ? "fixed w-[700px]  m-auto top-1/2 left-1/2 mt-[-350px] ml-[-350px]  z-[100000] "
                : "absolute top-0 left-0 w-[300px]  "
            }  cursor-pointer  `}
          />
          {/* <motion.img
            layout={true}
            src={image.url}
            alt={'A memory'}
            onClick={() => {
              setIsImageZoomed(!isImageZoomed);
              setSelectedImage(image.id);
            }}
            onAnimationEnd={() => console.log('end')}
            //  group-hover:opacity-75 object-cover aspect-[1]+ classes

            // onLoadingComplete={() => setIsLoading(false)}
          /> */}
        </motion.div>
      ))}
    </ul>
  );
};

export default ImageGallery;
