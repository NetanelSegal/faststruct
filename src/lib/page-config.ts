/**
 * List of enabled pages that are accessible to clients.
 * Simply add or remove page paths to toggle pages on/off.
 *
 * Currently enabled: Home and Contact (ready for client review)
 */
const ENABLED_PAGES = ['/', '/contact', '/about', '/module', '/modules'];

/**
 * Check if a page path is enabled
 */
export function isPageEnabled(path: string): boolean {
  // Normalize path (remove trailing slashes except for root)
  const normalizedPath = path === '/' ? '/' : path.replace(/\/$/, '');
  return ENABLED_PAGES.includes(normalizedPath);
}

/**
 * Check if a module detail page should be accessible
 * Module pages are accessible if the homepage is enabled
 * Supports dynamic routes like /module/[slug]
 */
export function isModulePageEnabled(): boolean {
  return isPageEnabled('/module');
}
