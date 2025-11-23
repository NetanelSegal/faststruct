'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { TailwindBreakpoints } from '@/lib/css-constants';
import { useToggle } from '@/hooks/useToggle';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { AnimatePresence, motion, Variants } from 'motion/react';
import Link from 'next/link';
import FastructLogo from '../FastructLogo';
import HamburgerButton from './HamburgerButton';
import { useMounted } from '@/hooks/useMounted';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import { usePathname } from 'next/navigation';

const NAVBAR_SWAP_BREAKPOINT = TailwindBreakpoints.lg;

const variants: Variants = {
  hidden: {
    y: '-100%',
  },
  visible: {
    y: '0%',
  },
};

export default function Navbar() {
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { screenWidth } = useScreenWidth();
  const previousScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const hasMounted = useMounted();
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  const closeMobileMenu = useCallback(() => {
    if (isMobileMenuOpen) {
      toggleIsMobileMenuOpen();
    }
  }, [isMobileMenuOpen, toggleIsMobileMenuOpen]);

  useEffect(() => {
    if (screenWidth < NAVBAR_SWAP_BREAKPOINT) return;

    const handleScroll = () => {
      const directionDown = window.scrollY > previousScrollY.current;

      previousScrollY.current = window.scrollY;
      setShowNavbar(!directionDown);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [screenWidth]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isMobileMenuOpen || screenWidth >= NAVBAR_SWAP_BREAKPOINT) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        closeMobileMenu();
      }
    };

    // Use capture phase to catch clicks before they bubble
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isMobileMenuOpen, screenWidth, closeMobileMenu]);

  if (!hasMounted) return null;

  return (
    <motion.header
      ref={headerRef}
      variants={variants}
      initial={{ y: '0%' }}
      animate={showNavbar ? { y: '0%' } : { y: '-100%' }}
      transition={{ duration: 0.3 }}
      className='fixed top-0 z-20 w-full'>
      <div className='bg-dark absolute z-10 h-full w-full'></div>

      <div className='container-padding relative z-20 flex items-center justify-between border-b py-4'>
        <Link
          href='/'
          onClick={() => {
            if (pathname !== '/') {
              startTransition();
            }
          }}>
          <FastructLogo
            color='light'
            className='h-[25px] md:h-[35px] lg:h-[40px]'
          />
        </Link>
        {screenWidth > NAVBAR_SWAP_BREAKPOINT ? (
          <DesktopNavbar />
        ) : (
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            toggleMenu={toggleIsMobileMenuOpen}
          />
        )}
      </div>
      {screenWidth < NAVBAR_SWAP_BREAKPOINT && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <MobileNavbar
              key='mobile-menu'
              menuRef={menuRef}
              onNavigate={closeMobileMenu}
            />
          )}
        </AnimatePresence>
      )}
    </motion.header>
  );
}
