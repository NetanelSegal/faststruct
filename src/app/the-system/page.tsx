import { getContent } from '@/lib/content';
import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroSystemSection from '@/sections/the-system/HeroSystemSection';
import TwoPathsSection from '@/sections/the-system/TwoPathsSection';
import NineCoreSystemSection from '@/sections/the-system/NineCoreSystemSection';
import ScalableSolutionsSection from '@/sections/the-system/ScalableSolutionsSection';
import CustomizationSection from '@/sections/the-system/CustomizationSection';
import OurProcessSection from '@/sections/shared/OurProcessSection';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('theSystem', 'en');
  return {
    title: 'The System | Fastruct',
    description: content.hero.subtitle,
  };
}

const TheSystemPage = async () => {
  if (!isPageEnabled('/the-system')) {
    notFound();
  }

  const content = await getContent('theSystem', 'en');
  const processContent = await getContent('process', 'en');

  return (
    <Page className='bg-dark'>
      <HeroSystemSection {...content.hero} />
      <TwoPathsSection twoPaths={content.twoPaths} />
      <NineCoreSystemSection nineCoreSystem={content.nineCoreSystem} />
      <ScalableSolutionsSection scalableSolutions={content.scalableSolutions} />
      <CustomizationSection customization={content.customization} />
      <OurProcessSection {...processContent} />
    </Page>
  );
};

export default TheSystemPage;
