'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePageTransition } from '@/contexts/PageTransitionContext';

interface INavLinkProps {
  href: string;
  children: React.ReactNode;
  onNavigate?: () => void;
  scroll?: boolean;
}

const NavLink = ({
  href,
  children,
  onNavigate,
  scroll = true,
}: INavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { startTransition } = usePageTransition();

  const classes = clsx(
    'hover:opacity-80 transition-all font-semibold',
    isActive ? 'text-accent underline' : 'text-light '
  );

  const handleClick = () => {
    if (pathname !== href) {
      startTransition();
    }
    onNavigate?.();
  };

  return (
    <Link href={href} className={classes} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default NavLink;
