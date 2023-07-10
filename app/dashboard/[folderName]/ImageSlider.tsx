"use client";
import { SupaImage } from "@/types";
import Image, { ImageProps } from "next/image";
import {
  useState,
  DragEvent,
  useEffect,
  forwardRef,
  ReactPropTypes,
} from "react";
import {
  AnimatePresence,
  AnimateSharedLayout,
  delay,
  motion,
} from "framer-motion";
import RealtimeProvider from "./RealtimeProvider";

const ImageDiv = forwardRef<HTMLDivElement, any>(function ExoticImageWrapper(
  props,
  ref
) {
  return (
    <div ref={ref} {...props} className={`${props.className}`}>
      {props.children}
    </div>
  );
});

const MotionComponent = motion(ImageDiv, { forwardMotionProps: true });

const ImageSlider = ({ images }: { images: SupaImage[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userImages, setUserImages] = useState([...images]);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(-1);

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
      <AnimatePresence>
        {isImageZoomed && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0.3, duration: 0.3 },
              }}
              animate={{
                opacity: 0.7,
                transition: { delay: 0, duration: 0.3 },
              }}
              className={`  ${" fixed bg-black  opacity-90 top-0 left-0 z-[1999] w-full h-full"}`}
            />
            <motion.div
              layoutId={isImageZoomed.toString()}
              onClick={() => {
                setIsImageZoomed(!isImageZoomed);
                setSelectedImage(-1);
              }}
              initial={{
                opacity: 0,
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0, duration: 0.4 },
              }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              className={`fixed w-1/2 h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] `}
            >
              <Image
                width={1000}
                height={1000}
                alt="photo"
                src={userImages[selectedImage].url}
                className={`w-full h-full object-cover`}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <ul className="flex gap-5 items-center overflow-visible h-[300px] min-w-fit image-container">
        {userImages.map((image, i) => {
          return (
            <motion.div
              layout
              layoutId={isImageZoomed.toString()}
              onClick={() => {
                setIsImageZoomed(!isImageZoomed);
                setSelectedImage(i);
              }}
              draggable
              onDragStart={(e: any) => dragHandler(e, image.id.toString())}
              key={image.id}
              className={` flex-shrink-0 overflow-hidden cursor-pointer relative w-[15%] h-full top-0 left-0  z-[1000]`}
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
            </motion.div>
          );
        })}
      </ul>
    </RealtimeProvider>
  );
};

export default ImageSlider;
