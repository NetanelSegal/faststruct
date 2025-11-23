import type { Metadata } from 'next';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Poppins, Bebas_Neue } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import WebsiteLoader from '@/components/website-loader/WebsiteLoader';
import { ReactLenis } from 'lenis/react';
import { SiteReadyProvider } from '@/contexts/SiteReadyProvider';
import { PageTransitionProvider } from '@/contexts/PageTransitionContext';
import { getContent } from '@/lib/content';
import PageTransition from '@/components/page-transition/PageTransition';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

const fontBebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: 'Fastruct',
  description: 'Modular + Panelized construction, done right.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactContent = await getContent('contact', 'en');

  return (
    <html lang='en'>
      <body className={`${fontPoppins.variable} ${fontBebasNeue.variable}`}>
        <Script
          src='https://kit.fontawesome.com/42dfb7600e.js'
          crossOrigin='anonymous'
        />
        <SiteReadyProvider>
          <PageTransitionProvider>
            <ReactLenis
              root
              options={{
                lerp: 0.08,
                smoothWheel: true,
                touchMultiplier: 2,
                wheelMultiplier: 1,
              }}>
              <WebsiteLoader>
                <Navbar />
                <PageTransition>
                  <main className='relative z-0'>{children}</main>
                </PageTransition>
                <Footer
                  contactInfo={contactContent.info}
                  contactSocial={contactContent.social}
                />
              </WebsiteLoader>
            </ReactLenis>
          </PageTransitionProvider>
        </SiteReadyProvider>
      </body>
    </html>
  );
}
