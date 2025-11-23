'use client';

import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import Link from 'next/link';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { ICTA } from '@/types/home';
import { motion } from 'motion/react';
import { usePageTransition } from '@/contexts/PageTransitionContext';
import { usePathname } from 'next/navigation';

const CTASection: React.FC<ICTA> = ({ title }) => {
  const pathname = usePathname();
  const { startTransition } = usePageTransition();

  return (
    <Section>
      <div className='flex flex-col items-center gap-6 text-center'>
        <AnimatedHeading
          className='text-h2 font-bebas text-light'
          text={title}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ amount: 0.5, once: true }}>
          <Link
            href='/contact'
            onClick={() => {
              if (pathname !== '/contact') {
                startTransition();
              }
            }}>
            <Button variant='primary' size='lg' hoverTransition='lift'>
              Book Your Free Consultation
            </Button>
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};

export default CTASection;
