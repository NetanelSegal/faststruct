'use client';

import { Section } from '@/components/Section';
import FilterBar from './components/FilterBar';
import SortSelect from './components/SortSelect';
import SearchInput from './components/SearchInput';
import { IModulesPageContent } from '@/types/modulesPage';
import { useFilterState } from '@/hooks/useFilterState';

interface ModulesFilterSectionProps {
  content: IModulesPageContent;
}

const ModulesFilterSection = ({ content }: ModulesFilterSectionProps) => {
  const { filterState, handleFilterChange, handleClearAll, activeFilterCount } =
    useFilterState();

  return (
    <section className='bg-dark container-padding text-light pt-8 pb-0 md:pt-12 lg:pt-16'>
      <div className='flex flex-col gap-4'>
        {/* Search Input */}
        <div className='flex-1 lg:max-w-md'>
          <SearchInput
            search={content.search}
            value={filterState.search}
            onChange={(value) => handleFilterChange('search', value)}
          />
        </div>

        {/* Filter Bar with Sort */}
        <div className='mt-3'>
          <FilterBar
            filters={content.filters}
            filterState={filterState}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearAll}
            activeFilterCount={activeFilterCount}
            sort={content.sort}
            sortValue={filterState.sort}
            onSortChange={(value) => handleFilterChange('sort', value)}
          />
        </div>
      </div>
    </section>
  );
};

export default ModulesFilterSection;
