'use client';

import Image from 'next/image';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHeroSystem } from '@/types/theSystem';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

const HeroSystemSection = ({
  title,
  subtitle,
  backgroundImage,
}: IHeroSystem) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  });

  const topLineY = useTransform(scrollYProgress, [0, 0.5, 1], [120, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className='bg-dark relative overflow-hidden p-0 text-white'>
      <div className='absolute inset-0'>
        <Image
          fill
          priority
          src={backgroundImage}
          alt='Fastruct factory'
          className='object-cover object-center'
        />
        <div className='bg-dark/40 absolute inset-0' />
      </div>

      {/* Bottom-left text overlay */}
      <div className='absolute right-0 left-0 h-screen'>
        <div className='container-padding absolute bottom-4 left-0 z-10 w-full text-white md:bottom-8 md:w-2/3 lg:bottom-16 lg:w-1/2'>
          <AnimatedHeading
            text={title}
            className='text-h1 font-bebas tracking-wider'
          />
          <FadeInParagraph className='text-h6 text-light opacity-70'>
            {subtitle}
          </FadeInParagraph>
        </div>
      </div>
      {/* section height placeholder */}
      <div className='opacity-0'>
        <div className='h-screen'></div>
      </div>
    </section>
  );
};

export default HeroSystemSection;
