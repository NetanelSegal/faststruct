import { isPageEnabled } from '@/lib/page-config';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Page from '@/components/Page';

export const metadata: Metadata = {
  title: 'Technical Overview | Fastruct',
  description:
    "Learn about Fastruct's technical specifications, materials, safety compliance, and construction processes for modular and panelized buildings.",
};

export default function Technical() {
  // Check if page is enabled
  if (!isPageEnabled('/technical')) {
    notFound();
  }

  return (
    <Page className='bg-dark'>
      <section className='py-16'>
        <div className='max-w-6xl'>
          <h2 className='mb-4 text-2xl font-semibold md:text-3xl'>
            Technical Overview
          </h2>
          <ul className='list-disc space-y-1 ps-6 text-gray-700'>
            <li>Materials specs</li>
            <li>Safety & compliance</li>
            <li>Process steps</li>
          </ul>
        </div>
      </section>
    </Page>
  );
}
