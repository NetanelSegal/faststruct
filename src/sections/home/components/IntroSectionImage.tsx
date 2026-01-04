'use client';

import Parallax from '@/components/Parallax';
import Image from 'next/image';
import { RefObject } from 'react';

const IntroSectionImage = ({
  parentRef,
}: {
  parentRef: RefObject<HTMLElement | null>;
}) => {
  return (
    <Parallax
      ref={parentRef}
      className='z-0 size-full'
      endRange={-100}
      unitType='px'
      offset={['start end', 'end start']}>
      <div className='relative h-96 w-full translate-x-10 scale-105 overflow-hidden rounded-lg lg:h-[70vh] lg:scale-110'>
        <Image
          src='/assets/intro-image.jpg'
          alt='Construction site'
          fill
          sizes='50vw'
          className='object-cover object-center'
          priority
        />
      </div>
    </Parallax>
  );
};

export default IntroSectionImage;
