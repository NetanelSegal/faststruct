import type { Metadata } from 'next';
import { env } from './env';

const DEFAULT_IMAGE = '/assets/hero-image.png';
const SITE_NAME = 'Fast struct';

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
  const absoluteImageUrl = env.siteUrl ? `${env.siteUrl}${imageUrl}` : imageUrl;

  return {
    title,
    description,
    url: url ? (env.siteUrl ? `${env.siteUrl}${url}` : url) : undefined,
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
  const absoluteImageUrl = env.siteUrl ? `${env.siteUrl}${imageUrl}` : imageUrl;

  return {
    card: 'summary_large_image',
    title,
    description,
    images: [absoluteImageUrl],
  };
}

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
