import { ReactNode } from 'react';
import Image from 'next/image';
import cameraImage from '@/public/camera.png';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex rounded-lg shadow-2xl overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-20 px-10 bg-primary">
        <Image src={cameraImage} alt="camera" width={150} height={150} />
        <p className="text-lg text-center">
          Get ready to re-experience your best memories
        </p>
      </div>
      <div className="flex-1 flex flex-col gap-8 justify-between items-center py-20 px-10 bg-white">
        {children}
      </div>
    </section>
  );
};

export default layout;
