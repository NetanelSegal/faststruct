import { isPageEnabled } from './page-config';

export const ROUTES = [
  { href: '/', title: 'Home' },
  { href: '/modules', title: 'Modules' },
  { href: '/about', title: 'About' },
  { href: '/technical', title: 'Technical' },
  {
    href: '/contact',
    title: 'Call us',
    isButton: true,
  },
];

// Export filtered routes for navigation components
export const ENABLED_ROUTES = ROUTES.filter((route) =>
  isPageEnabled(route.href)
);
