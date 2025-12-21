import { config } from 'dotenv';

config();

export const env = {
  resendApiKey: process.env.RESEND_API_KEY || '',
  fromEmail: process.env.FROM_EMAIL || '',
  contactEmail: process.env.CONTACT_EMAIL || '',
} as const;
