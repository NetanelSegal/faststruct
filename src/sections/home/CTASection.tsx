'use client';

import { Section } from '@/components/Section';
import { Button } from '@/components/Button';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import { ICTA } from '@/types/home';
import { motion } from 'motion/react';
import NavLink from '@/components/navigation/NavLink';

const CTASection: React.FC<ICTA> = ({ title }) => {
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
          <NavLink button={true} href='/contact'>
            Book Your Free Consultation
          </NavLink>
        </motion.div>
      </div>
    </Section>
  );
};

export default CTASection;
