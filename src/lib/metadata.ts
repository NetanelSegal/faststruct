import type { Metadata } from 'next';

/**
 * Default site configuration for metadata
 * Note: metadataBase is set in root layout.tsx, so relative URLs will be automatically resolved
 */
const DEFAULT_IMAGE = '/assets/hero-image.png';
const SITE_NAME = 'Fastruct';

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

  return {
    title,
    description,
    url: url,
    siteName: SITE_NAME,
    images: [
      {
        url: imageUrl,
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
 * Uses relative URLs - Next.js will resolve them using metadataBase from root layout
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

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [imageUrl],
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
