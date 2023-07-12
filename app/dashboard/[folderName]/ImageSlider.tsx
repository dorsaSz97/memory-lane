"use client";
import Image from "next/image";
import { useState, DragEvent, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SupaImage } from "@/types";
import { CursorContext } from "@/components/ui/CursorManager";

const ImageSlider = ({ images }: { images: SupaImage[] }) => {
  const { setMode } = useContext(CursorContext);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isImgLoading, setIsImageLoading] = useState(true);

  const dragHandler = (e: DragEvent<HTMLDivElement>, imgId: string) => {
    e.dataTransfer.setData("text/plain", imgId);
  };

  return (
    <>
      <AnimatePresence>
        {isImageZoomed && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 0.7,
                transition: { delay: 0, duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0.3, duration: 0.3 },
              }}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-[101] "
            />
            <motion.div
              onClick={() => {
                setIsImageZoomed(!isImageZoomed);
                setSelectedImage(null);
              }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              exit={{
                opacity: 0,
                transition: { delay: 0, duration: 0.4 },
              }}
              className={`fixed top-1/2 left-1/2 w-1/2 h-[80%] -translate-x-1/2 -translate-y-1/2 z-[200]`}
            >
              <Image
                width={1000}
                height={2000}
                alt="photo"
                src={images[selectedImage ?? -1].url}
                className={`w-full h-full object-cover`}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ul className="flex items-center gap-5 overflow-visible h-[300px] min-w-fit">
        {images.map((image, i) => {
          return (
            <motion.div
              key={image.id}
              draggable
              onDragStart={(e: any) => dragHandler(e, image.id.toString())}
              layout
              onMouseEnter={() => {
                setMode("");
              }}
              onMouseLeave={() => {
                setMode("normal");
              }}
              onClick={() => {
                setMode("normal");
                setIsImageZoomed(!isImageZoomed);
                setSelectedImage(i);
              }}
              className={`relative w-[15%] h-full flex-shrink-0 overflow-hidden cursor-pointer z-[10]`}
            >
              <Image
                width={500}
                height={700}
                alt="memory"
                src={image.url}
                onWaiting={() => setIsImageLoading(true)}
                onLoadingComplete={() => {
                  setIsImageLoading(false);
                }}
                className={`absolute top-0 left-0 w-full h-full object-cover z-[9] ${
                  isImgLoading ? "blur-md" : "blur-0"
                }s`}
              />
              <Image
                width={300}
                height={500}
                src={i % 2 === 0 ? "/border-solid.png" : "/border-effect.png"}
                alt="border"
                className="relative h-full w-full z-[10]"
              />
            </motion.div>
          );
        })}
      </ul>
    </>
  );
};

export default ImageSlider;
