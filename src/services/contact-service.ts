import { NextResponse } from 'next/server';

export interface IContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface IContactServiceResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export async function submitContactForm(
  data: IContactFormData
): Promise<
  NextResponse<IContactServiceResponse> | NextResponse<{ error: unknown }>
> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = (await response.json()) as IContactServiceResponse;

    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
