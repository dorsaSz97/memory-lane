'use client';
import Image from 'next/image';
import React, { MouseEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const classes = isLoading
    ? 'scale-110 blur-2xl grayscale'
    : 'scale-100 blur-0 grayscale-0';
  return (
    <ul className="grid grid-cols-fluid gap-2 flex-1">
      {imageUrls.map(imageUrl => (
        <motion.div
          layout={true}
          key={imageUrl}
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
                className={`  ${' fixed bg-black  opacity-90 top-0 left-0 z-[1999] w-full h-full'}`}
              />
            )}
          </AnimatePresence>
          <motion.img
            layout={true}
            src={imageUrl}
            alt={'A memory'}
            onClick={() => {
              setIsImageZoomed(!isImageZoomed);
              setSelectedImage(imageUrl);
            }}
            className={`object-cover ${
              selectedImage === imageUrl ? ' z-[100000] ' : '  z-[1000] '
            }  ${
              isImageZoomed && selectedImage === imageUrl
                ? 'fixed w-[700px]  m-auto top-1/2 left-1/2 h-[700px] mt-[-350px] ml-[-350px]  z-[100000] '
                : 'absolute top-0 left-0 w-full h-[300px] '
            }  cursor-pointer  `}
            onAnimationEnd={() => console.log('end')}
            //  group-hover:opacity-75 object-cover aspect-[1]+ classes

            // onLoadingComplete={() => setIsLoading(false)}
          />
        </motion.div>
      ))}
    </ul>
  );
};

export default ImageGallery;
