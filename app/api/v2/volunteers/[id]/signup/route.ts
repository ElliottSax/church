/**
 * Volunteer Signup API Route (v2)
 *
 * POST /api/v2/volunteers/[id]/signup - Sign up for opportunity
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';
import {
  apiCreated,
  apiNotFound,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  checkRateLimit,
} from '@/lib/api/middleware';
import { sendEmail } from '@/lib/email';
import siteConfig from '@/config/site-config';
import { Analytics } from '@/lib/analytics/tracker';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
});

/**
 * POST /api/v2/volunteers/[id]/signup
 */
export const POST = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  validateMethod(request, ['POST']);
  checkRateLimit(request, 20);

  const data = await validateBody(request, signupSchema);

  // Verify opportunity exists and is active
  const opportunity = await prisma.volunteerOpportunity.findUnique({
    where: { id: params.id },
  });

  if (!opportunity) {
    return apiNotFound('Volunteer opportunity');
  }

  if (!opportunity.active) {
    throw new Error('This volunteer opportunity is no longer active');
  }

  // Create signup
  const signup = await prisma.volunteerSignup.create({
    data: {
      opportunityId: params.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      status: 'pending',
    },
    include: {
      opportunity: true,
    },
  });

  // Track analytics
  Analytics.volunteer.signedUp(params.id);

  // Send confirmation email to volunteer
  await sendVolunteerConfirmation(signup);

  // Notify opportunity coordinator
  await notifyCoordinator(signup);

  return apiCreated({
    ...signup,
    message: 'Thank you for signing up! The coordinator will contact you soon.',
  });
});

async function sendVolunteerConfirmation(signup: any) {
  const subject = `Volunteer Signup Confirmation - ${signup.opportunity.title}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #fff; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">🙌 Thank You for Volunteering!</h1>
  </div>

  <div class="content">
    <p>Dear ${signup.name},</p>

    <p>
      Thank you for your interest in volunteering for <strong>${signup.opportunity.title}</strong>!
    </p>

    <p>
      <strong>Next Steps:</strong><br>
      ${signup.opportunity.contactPerson} will contact you at ${signup.email} within 2-3 business days
      to discuss the opportunity and answer any questions you may have.
    </p>

    <p>
      <strong>Opportunity Details:</strong><br>
      ${signup.opportunity.description}
    </p>

    <p>
      <strong>Commitment:</strong> ${signup.opportunity.commitment}
    </p>

    ${signup.message ? `
    <p>
      <strong>Your Message:</strong><br>
      <em>${signup.message}</em>
    </p>
    ` : ''}

    <p style="margin-top: 30px;">
      We're excited to have you serve with us!<br><br>
      Blessings,<br>
      <strong>${siteConfig.site.name}</strong>
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({
    to: signup.email,
    subject,
    html,
  });
}

async function notifyCoordinator(signup: any) {
  const subject = `New Volunteer Signup - ${signup.opportunity.title}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #4CAF50; color: white; padding: 20px; }
    .content { padding: 20px; background: #fff; }
    .info-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #4CAF50; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h2 style="margin: 0;">New Volunteer Signup</h2>
  </div>

  <div class="content">
    <p>A new volunteer has signed up for <strong>${signup.opportunity.title}</strong>.</p>

    <div class="info-box">
      <strong>Volunteer Information:</strong><br>
      Name: ${signup.name}<br>
      Email: ${signup.email}<br>
      ${signup.phone ? `Phone: ${signup.phone}<br>` : ''}
      Signup Date: ${new Date(signup.createdAt).toLocaleString()}
    </div>

    ${signup.message ? `
    <div class="info-box">
      <strong>Message from Volunteer:</strong><br>
      ${signup.message}
    </div>
    ` : ''}

    <p>
      Please contact ${signup.name} at ${signup.email} to discuss next steps.
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({
    to: signup.opportunity.contactEmail,
    subject,
    html,
  });
}
