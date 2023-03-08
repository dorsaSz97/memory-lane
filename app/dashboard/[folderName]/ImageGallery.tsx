'use client';
import Image from 'next/image';
import React, { MouseEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // useEffect(() => {
  //   if (isImageZoomed && imageEl) {
  //     imageEl.style.width = '80vw';
  //     imageEl.style.height = '80vh';
  //     imageEl.style.position = 'absolute';
  //     imageEl.style.zIndex = '1000000';
  //   }
  // }, [isImageZoomed]);

  const classes = isLoading
    ? 'scale-110 blur-2xl grayscale'
    : 'scale-100 blur-0 grayscale-0';
  return (
    <ul className="grid grid-cols-fluid gap-2 flex-1">
      {imageUrls.map(imageUrl => (
        <div key={imageUrl} className="w-full h-[300px] relative">
          <motion.img
            layout={true}
            src={imageUrl}
            alt={'A memory'}
            // transformValues
            // initial={{ position: 'absolute' }}
            // animate={{
            //   position:
            //     isImageZoomed && selectedImage === imageUrl
            //       ? 'fixed'
            //       : 'absolute',
            //   x: isImageZoomed && selectedImage === imageUrl ? '-50%' : '0',
            //   y: isImageZoomed && selectedImage === imageUrl ? '-50%' : '0',
            // }}
            transition={
              {
                // type: 'spring',
                // damping: 25,
                // stiffness: 120,
                // layout: { type: 'spring', damping: 25, stiffness: 120 },
              }
            }
            onClick={() => {
              setIsImageZoomed(!isImageZoomed);
              setSelectedImage(imageUrl);
            }}
            className={`object-cover ${
              selectedImage === imageUrl ? ' z-[100000] ' : '  z-[1000] '
            }  ${
              isImageZoomed && selectedImage === imageUrl
                ? 'fixed w-[700px]  m-auto top-1/2 left-1/2 h-[700px] mt-[-350px] ml-[-350px]  z-[100000] '
                : 'absolute top-0 left-0 w-full h-full '
            }  cursor-pointer  `}
            onAnimationEnd={() => console.log('end')}
            //  group-hover:opacity-75 object-cover aspect-[1]+ classes

            // onLoadingComplete={() => setIsLoading(false)}
          />
        </div>
      ))}
    </ul>
  );
};

export default ImageGallery;
