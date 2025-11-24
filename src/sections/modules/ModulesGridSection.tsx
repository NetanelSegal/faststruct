'use client';

import { useState, useEffect } from 'react';
import { Section } from '@/components/Section';
import ModuleList from '@/sections/home/components/ModuleList';
import EmptyState from './components/EmptyState';
import ResultsCount from './components/ResultsCount';
import LoadingSkeleton from './components/LoadingSkeleton';
import { IModule } from '@/types/modules';
import { IModulesPageContent } from '@/types/modulesPage';

interface ModulesGridSectionProps {
  modules: IModule[];
  content: IModulesPageContent;
}

const ModulesGridSection = ({ modules, content }: ModulesGridSectionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state on initial mount
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section bgColor='dark' textColor='light' className='pt-4 md:pt-6 lg:pt-8'>
      <div className='flex flex-col gap-8'>
        {/* Results Count */}
        <div className='flex items-center justify-between'>
          <ResultsCount
            showing={modules.length}
            total={modules.length}
            results={content.results}
          />
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Empty State */}
        {!isLoading && modules.length === 0 && (
          <EmptyState emptyState={content.emptyState} />
        )}

        {/* Module Grid */}
        {!isLoading && modules.length > 0 && <ModuleList modules={modules} />}
      </div>
    </Section>
  );
};

export default ModulesGridSection;
