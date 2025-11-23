'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import { usePathname } from 'next/navigation';

export interface PageTransitionContextType {
  isTransitioning: boolean;
  startTransition: () => void;
}

const PageTransitionContext = createContext<
  PageTransitionContextType | undefined
>(undefined);

interface PageTransitionProviderProps {
  children: ReactNode;
}

const PAGE_TRANSITION_DURATION = 0.8; // seconds

export const PageTransitionProvider = ({
  children,
}: PageTransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Watch pathname to detect when navigation completes and hide overlay
  useEffect(() => {
    if (prevPathnameRef.current !== pathname && isTransitioning) {
      // Navigation completed, hide overlay after transition duration
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }

      transitionTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, PAGE_TRANSITION_DURATION * 1000);

      prevPathnameRef.current = pathname;
    }

    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, [pathname, isTransitioning]);

  const startTransition = () => {
    // Prevent multiple simultaneous transitions
    if (isTransitioning) return;

    setIsTransitioning(true);
  };

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, startTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

export const usePageTransition = (): PageTransitionContextType => {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error(
      'usePageTransition must be used within a PageTransitionProvider'
    );
  }

  return context;
};

