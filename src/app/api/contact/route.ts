import { submitContactForm } from '@/services/contact-service';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    // const response = await submitContactForm({
    //   email: 'asd',
    //   name: 'asd',
    //   phone: 'asd',
    //   message: 'asd',
    // });
    // console.log('response from contact form submission: ', response);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Contact API] Unexpected error:', error);
    return NextResponse.json({ error });
  }
}

const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string().email('Invalid email format').toLowerCase().trim(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === '') return true; // Phone is optional
        // Remove common phone formatting characters
        const cleaned = val.replace(/[\s\-\(\)\+]/g, '');
        // Check if remaining characters are digits and length is reasonable (7-15 digits)
        return /^\d{7,15}$/.test(cleaned);
      },
      {
        message:
          'Invalid phone format. Accepts formats like (123) 456-7890, 123-456-7890, or 1234567890',
      }
    )
    .transform((val) => val?.trim() || ''),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(5000, 'Message must be less than 5000 characters')
    .trim(),
});
