import type { Metadata } from 'next';
import { getContent } from '@/lib/content';
import HeroContactSection from '@/sections/contact/HeroContactSection';
import ContactFormSection from '@/sections/contact/ContactFormSection';
import Page from '@/components/Page';
import { generateSocialMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateSocialMetadata({
  title: 'Contact Us | Fastruct',
  description:
    'Get in touch with Fastruct to start your modular and panelized construction project. We handle everything from consultation to completion.',
  image: '/assets/hero-image.png',
  url: '/contact',
});

export default async function Contact() {
  const content = await getContent('contact', 'en');

  return (
    <Page className='bg-dark'>
      <HeroContactSection hero={content.hero} />
      <ContactFormSection form={content.form} info={content.info} />
    </Page>
  );
}
