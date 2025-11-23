import { getContent } from '@/lib/content';
import HeroAboutSection from '@/sections/about/HeroAboutSection';
import AboutIntroSection from '@/sections/about/AboutIntroSection';
import ImageTextSection from '@/sections/about/ImageTextSection';
import FeaturesGridSection from '@/sections/about/FeaturesGridSection';
import TeamSection from '@/sections/about/TeamSection';
import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Page from '@/components/Page';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('about', 'en');
  return {
    title: 'About Us | Fastruct',
    description: content.hero.subtitle,
  };
}

const AboutPage = async () => {
  if (!isPageEnabled('/about')) {
    notFound();
  }

  const content = await getContent('about', 'en');

  return (
    <Page className='bg-dark'>
      <HeroAboutSection {...content.hero} />
      <AboutIntroSection {...content.about} />
      <ImageTextSection {...content.imageText} />
      <FeaturesGridSection {...content.featuresGrid} />
      <TeamSection {...content.team} />
    </Page>
  );
};

export default AboutPage;
