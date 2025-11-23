'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ENABLED_ROUTES } from '@/lib/routes';
import NavLink from './NavLink';
import { Button } from '../Button';
import { usePageTransition } from '@/contexts/PageTransitionContext';

const DesktopNavbar = () => {
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  return (
    <nav className='flex items-center gap-6'>
      {ENABLED_ROUTES.map((route) =>
        route.isButton ? (
          <Link
            href={route.href}
            key={route.href}
            onClick={() => {
              if (pathname !== route.href) {
                startTransition();
              }
            }}>
            <Button variant='primary' size='md' hoverTransition='lift'>
              {route.title}
            </Button>
          </Link>
        ) : (
          <NavLink key={route.href} href={route.href}>
            {route.title}
          </NavLink>
        )
      )}
    </nav>
  );
};

export default DesktopNavbar;
