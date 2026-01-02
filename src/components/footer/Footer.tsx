'use client';
import FastructLogo from '../FastructLogo';
import { usePathname } from 'next/navigation';
import {
  FooterLinksAndContact,
  LetsBuildTogetherCTA,
} from './FooterComponents';
import { IContactInfo, IContactSocial } from '@/types/contact';

interface FooterProps {
  contactInfo: IContactInfo;
  contactSocial: IContactSocial;
}

const Footer = ({ contactInfo, contactSocial }: FooterProps) => {
  const pathname = usePathname();
  const isContactPage = pathname === '/contact';
  return (
    <footer className='bg-dark section-padding-top relative z-0 flex flex-col gap-6 pb-10 text-white'>
      {!isContactPage && <LetsBuildTogetherCTA />}
      <div className='container-padding section-padding-top'>
        <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:justify-between'>
          <FastructLogo color='white' className='h-[40px]' />
          <FooterLinksAndContact info={contactInfo} social={contactSocial} />
        </div>
        <div className='border-cream/20 mt-12 border-t pt-8 text-center text-sm opacity-70'>
          <p>© {new Date().getFullYear()} Fast Struct. All rights reserved.</p>
          <p className='mt-2'>{contactInfo.license}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
