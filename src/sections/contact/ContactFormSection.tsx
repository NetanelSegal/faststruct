'use client';

import { useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Section } from '@/components/Section';
import AnimatedHeading from '@/components/text-animation/AnimatedHeading';
import FadeInParagraph from '@/components/text-animation/FadeInParagraph';
import { Button } from '@/components/Button';
import { IContactForm, IContactInfo } from '@/types/contact';
import { submitContactForm } from '@/lib/contact-service';

interface ContactFormSectionProps {
  form: IContactForm;
  info: IContactInfo;
}

const ContactFormSection = ({ form, info }: ContactFormSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error' | null;
    text: string;
  }>({ type: null, text: '' });
  const sectionRef = useRef<HTMLFormElement>(null);
  const isFormInView = useInView(sectionRef, { once: true });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: null, text: '' });

    try {
      const response = await submitContactForm(formData);

      if (response.success) {
        setSubmitMessage({ type: 'success', text: response.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitMessage({ type: 'error', text: response.message });
      }
    } catch {
      setSubmitMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      ref={sectionRef}
      bgColor='dark'
      textColor='light'
      className='py-32'>
      <div className='container mx-auto'>
        <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
          {/* Left: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={
              isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
            }
            transition={{ duration: 0.8 }}
            className='flex flex-col gap-8'>
            <div>
              <AnimatedHeading
                text={form.title}
                className='text-h2 font-bebas text-light'
                revealColor='dark'
              />
              <FadeInParagraph className='text-h6 text-light/80 mt-4'>
                {form.description}
              </FadeInParagraph>
            </div>

            <div className='flex flex-col gap-6'>
              <div className='flex items-start gap-4'>
                <div className='bg-accent/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
                  <i className='fa-solid fa-location-dot text-accent text-xl'></i>
                </div>
                <div>
                  <h4 className='text-h5 font-bebas text-light mb-1'>
                    Address
                  </h4>
                  <p className='text-h6 text-light/80'>
                    {info.address.street}
                    <br />
                    {info.address.city}
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='bg-accent/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
                  <i className='fa-solid fa-envelope text-accent text-xl'></i>
                </div>
                <div>
                  <h4 className='text-h5 font-bebas text-light mb-1'>Email</h4>
                  <a
                    href={`mailto:${info.email}`}
                    className='text-h6 text-light/80 hover:text-accent transition-colors'>
                    {info.email}
                  </a>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='bg-accent/20 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg'>
                  <i className='fa-solid fa-phone text-accent text-xl'></i>
                </div>
                <div>
                  <h4 className='text-h5 font-bebas text-light mb-1'>Phone</h4>
                  <a
                    href={`tel:${info.phone.link}`}
                    className='text-h6 text-light/80 hover:text-accent transition-colors'>
                    {info.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={
              isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
            className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <div>
                <label
                  htmlFor='name'
                  className='text-h6 text-light mb-2 block font-medium'>
                  {form.fields.name.label}
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className='border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2'
                  placeholder={form.fields.name.placeholder}
                />
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='text-h6 text-light mb-2 block font-medium'>
                  {form.fields.email.label}
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className='border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2'
                  placeholder={form.fields.email.placeholder}
                />
              </div>

              <div>
                <label
                  htmlFor='phone'
                  className='text-h6 text-light mb-2 block font-medium'>
                  {form.fields.phone.label}
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full rounded-lg border p-4 focus:ring-2'
                  placeholder={form.fields.phone.placeholder}
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='text-h6 text-light mb-2 block font-medium'>
                  {form.fields.message.label}
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className='border-accent/50 bg-light/10 text-light placeholder-accent/70 focus:border-accent focus:ring-accent/50 w-full resize-none rounded-lg border p-4 focus:ring-2'
                  placeholder={form.fields.message.placeholder}
                />
              </div>
            </div>

            <Button
              type='submit'
              variant='primary'
              size='lg'
              hoverTransition='lift'
              disabled={isSubmitting}
              className='w-full md:w-auto'>
              {isSubmitting ? form.submittingButton : form.submitButton}
            </Button>

            {/* Submission Message */}
            {submitMessage.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-4 ${
                  submitMessage.type === 'success'
                    ? 'bg-accent/20 text-accent border-accent/30 border'
                    : 'border border-red-500/30 bg-red-500/20 text-red-400'
                }`}>
                <p className='text-sm font-medium'>{submitMessage.text}</p>
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </Section>
  );
};

export default ContactFormSection;
