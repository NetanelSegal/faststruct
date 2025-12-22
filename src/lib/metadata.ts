import type { Metadata } from 'next';

/**
 * Default site configuration for metadata
 * TODO: Add NEXT_PUBLIC_SITE_URL environment variable for production
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || '';
const DEFAULT_IMAGE = '/assets/hero-image.png';
const SITE_NAME = 'Fast struct';

/**
 * Generate Open Graph metadata
 * Uses relative URLs - Next.js will resolve them using metadataBase from root layout
 */
export function generateOpenGraphMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}): Metadata['openGraph'] {
  const imageUrl = image || DEFAULT_IMAGE;
  const absoluteImageUrl = SITE_URL ? `${SITE_URL}${imageUrl}` : imageUrl;

  return {
    title,
    description,
    url: url ? (SITE_URL ? `${SITE_URL}${url}` : url) : undefined,
    siteName: SITE_NAME,
    images: [
      {
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  };
}

/**
 * Generate Twitter Card metadata
 */
export function generateTwitterMetadata({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata['twitter'] {
  const imageUrl = image || DEFAULT_IMAGE;
  const absoluteImageUrl = SITE_URL ? `${SITE_URL}${imageUrl}` : imageUrl;

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [absoluteImageUrl],
  };
}

/**
 * Generate complete metadata with Open Graph and Twitter Cards
 */
export function generateSocialMetadata({
  title,
  description,
  image,
  url,
}: {
  title: string;
  description: string;
  image?: string;
  url?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: generateOpenGraphMetadata({ title, description, image, url }),
    twitter: generateTwitterMetadata({ title, description, image }),
  };
}
