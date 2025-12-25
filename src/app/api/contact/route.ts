import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/schemas/contact';
import { Resend } from 'resend';
import ContactEmail from '@/components/emails/ContactEmail';
import { env } from '@/lib/env';

const resend = new Resend(env.resendApiKey);

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = contactFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        details: result.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      },
      { status: 422 }
    );
  }

  try {
    const { name, email, phone, message } = result.data;

    const emailResult = await resend.emails.send({
      from: env.fromEmail,
      to: [env.contactEmail],
      subject: `New Contact Form Submission from ${name}`,
      react: ContactEmail({
        name,
        email,
        phone,
        message,
      }),
      replyTo: env.fromEmail,
    });

    if (emailResult.error) {
      console.error('[Contact API] Resend error:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('[Contact API] Email sent successfully:', emailResult.data);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
