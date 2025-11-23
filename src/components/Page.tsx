'use client';
import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { animate, motion, useMotionValue } from 'motion/react';
import { usePageTransition } from '@/contexts/PageTransitionContext';
interface IPageProps {
  children: ReactNode;
  className?: string;
}

export default function Page({ children, className = '' }: IPageProps) {
  return (
    <motion.div
      className={`origin-left ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
}
