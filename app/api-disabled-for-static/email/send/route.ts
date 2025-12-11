import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sendgrid';
import {
  generateWelcomeEmail,
  generateEventReminderEmail,
  generateDonationReceiptEmail,
  generateNewsletterEmail,
} from '@/lib/email/templates';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    let emailContent;

    switch (type) {
      case 'welcome':
        emailContent = generateWelcomeEmail(data);
        break;
      case 'event-reminder':
        emailContent = generateEventReminderEmail(data);
        break;
      case 'donation-receipt':
        emailContent = generateDonationReceiptEmail(data);
        break;
      case 'newsletter':
        emailContent = generateNewsletterEmail(data);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }

    const result = await sendEmail({
      to: data.email || data.to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
