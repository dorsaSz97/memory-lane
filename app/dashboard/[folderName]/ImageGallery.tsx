'use client';
import Image from 'next/image';
import React, { useState } from 'react';

const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  const [isLoading, setIsLoading] = useState(true);
  const classes = isLoading
    ? 'scale-110 blur-2xl grayscale'
    : 'scale-100 blur-0 grayscale-0';
  return (
    <ul>
      {imageUrls.map(imageUrl => (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={'A memory'}
          width={400}
          height={400}
          className={
            'duration-700 ease-in-out group-hover:opacity-75 ' + classes
          }
          onLoadingComplete={() => setIsLoading(false)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
