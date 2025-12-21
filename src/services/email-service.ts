import { Resend } from 'resend';
import { env } from '../lib/env';
import ContactEmail from '@/components/emails/ContactEmail';

const resend = new Resend(env.resendApiKey);

export interface IContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface IEmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export async function sendContactNotificationEmail(
  data: IContactEmailData
): Promise<IEmailResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: ContactEmail(),
    });

    if (error) {
      return { success: false, error: error.message };
    }

    console.log('email sent successfully from email service: ', data);

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('[Email Service] Error sending notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
