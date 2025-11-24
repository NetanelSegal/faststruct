import { Suspense } from 'react';
import { getContent, getModules } from '@/lib/content';
import type { Metadata } from 'next';
import Page from '@/components/Page';
import HeroModulesSection from '@/sections/modules/HeroModulesSection';
import ModulesContent from '@/sections/modules/ModulesContent';
import LoadingSkeleton from '@/sections/modules/components/LoadingSkeleton';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent('modulesPage', 'en');
  return {
    title: 'Explore Our Modules | Fastruct',
    description: content.hero.subtitle,
  };
}

const ModulesPage = async () => {
  const content = await getContent('modulesPage', 'en');
  const modulesData = await getModules();

  return (
    <Page className='bg-dark text-cream'>
      <HeroModulesSection hero={content.hero} />
      <Suspense
        fallback={
          <div className='section-padding bg-dark'>
            <div className='bg-dark/40 mb-6 h-12 w-full max-w-md animate-pulse rounded-lg'></div>
            <div className='bg-dark/40 h-32 w-full animate-pulse rounded-lg'></div>
            <LoadingSkeleton />
          </div>
        }>
        <ModulesContent modules={modulesData} content={content} />
      </Suspense>
    </Page>
  );
};

export default ModulesPage;
