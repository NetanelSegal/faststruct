import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { IHero } from '@/types/modulesPage';

interface HeroModulesSectionProps {
  hero: IHero;
}

const HeroModulesSection = ({ hero }: HeroModulesSectionProps) => {
  return (
    <Section bgColor='dark' textColor='light'>
      <div className='container-padding flex flex-col gap-8 text-center'>
        <AnimatedHeading
          text={hero.title}
          className='text-h1 font-bebas text-light'
          revealColor='dark'
        />
        <FadeInParagraph className='text-h6 text-light/80 mx-auto max-w-2xl'>
          {hero.subtitle}
        </FadeInParagraph>
      </div>
    </Section>
  );
};

export default HeroModulesSection;
