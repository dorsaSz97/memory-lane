import Image from 'next/image';
import React from 'react';

const ImageGallery = ({ imageUrls }: { imageUrls: string[] }) => {
  return (
    <ul>
      {imageUrls.map(imageUrl => (
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={'A memory'}
          width={400}
          height={400}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
