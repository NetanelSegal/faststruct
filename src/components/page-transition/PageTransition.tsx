'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import FastructLogo from '../FastructLogo';

interface PageTransitionProps {
  children: ReactNode;
}

const PAGE_TRANSITION_DURATION = 0.8; // seconds
const OVERLAY_SLIDE_DURATION = 0.5; // seconds

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const { isTransitioning } = usePageTransition();

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key='transition-overlay'
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{
              duration: OVERLAY_SLIDE_DURATION,
              ease: [0.22, 1, 0.36, 1],
            }}
            className='bg-dark fixed inset-0 z-[9999]'>
            <svg
              viewBox='0 0 74 47'
              fill='none'
              className='pointer-events-none absolute top-1/2 left-1/2 size-48 -translate-x-1/2 -translate-y-1/2 fill-white opacity-10'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              focusable='false'
              preserveAspectRatio='xMidYMid meet'>
              <path d='M0.879395 8.81963L16.1009 0H71.9013L56.6753 8.81963H0.879395Z' />
              <path d='M0 46.666V12.6816H54.3701V20.1256H6.08061V46.666H0Z' />
              <path d='M10.8862 46.6641V39.2202H48.2849V33.3912H10.8862V25.9473H54.3699V46.6641H10.8862Z' />
              <path d='M58.0298 39.219L69.3915 32.6342V26.5496L58.0298 33.1345V12.6786L73.2557 3.85352V11.0419L64.1104 16.338V22.428L73.2557 17.1265V37.5823L58.0298 46.402V39.219Z' />
            </svg>
          </motion.div>
        )}
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: PAGE_TRANSITION_DURATION },
          }}
          transition={{ duration: PAGE_TRANSITION_DURATION }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
