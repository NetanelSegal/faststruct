import AnimatedHeading from '../text-animation/AnimatedHeading';
import { ENABLED_ROUTES } from '@/lib/routes';
import { IContactInfo, IContactSocial } from '@/types/contact';
import NavLink from '../navigation/NavLink';

const LetsBuildTogetherCTA = () => {
  return (
    <div className='flex flex-col gap-2 text-center'>
      <AnimatedHeading
        className='text-h2 font-bebas text-light'
        text="Let's build together"
      />
      <p className='text-h6 text-light'>
        Have a project in mind? Let&apos;s talk about how we can bring it to
        life.
      </p>
      <NavLink button={true} href='/contact'>
        Get in Touch
      </NavLink>
    </div>
  );
};

interface FooterLinksAndContactProps {
  info: IContactInfo;
  social: IContactSocial;
}

const FooterLinksAndContact = ({
  info,
  social,
}: FooterLinksAndContactProps) => {
  const footerLinks = ENABLED_ROUTES.filter((route) => !route.isButton);
  return (
    <div className='flex w-full flex-col gap-4 md:w-auto md:flex-row'>
      <div className='border-light flex flex-col gap-1 border-b-2 pb-4 md:border-r-2 md:border-b-0 md:pr-4'>
        <h3 className='font-semibold'>Company</h3>
        <ul className='mt-2 space-y-2 text-sm'>
          {footerLinks.map((route) => (
            <li key={route.href}>
              <NavLink href={route.href} style={false}>
                {route.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Information */}
      <div className='border-light flex flex-col gap-1 border-b-2 pb-4 md:border-r-2 md:border-b-0 md:pr-4'>
        <h3 className='font-semibold'>Contact</h3>
        <ul className='mt-2 space-y-2 text-sm'>
          <li>{info.address.street}</li>
          <li>{info.address.city}</li>
          <li>
            <a
              href={`mailto:${info.email}`}
              className='hover:text-accent transition-colors'>
              {info.email}
            </a>
          </li>
          <li>
            <a
              href={`tel:${info.phone.link}`}
              className='hover:text-accent transition-colors'>
              {info.phone.display}
            </a>
          </li>
        </ul>
      </div>

      {/* Social Media */}
      <div className='flex flex-col gap-1 pb-4'>
        <h3 className='font-semibold'>{social.title}</h3>
        <ul className='mt-2 space-y-2 text-sm'>
          {social.links.map((link) => (
            <li key={link.name}>
              <a
                href={link.url}
                className='hover:text-accent transition-colors'>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { LetsBuildTogetherCTA, FooterLinksAndContact };
