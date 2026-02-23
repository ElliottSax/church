/**
 * Volunteer Shift Signup API Route (v2)
 *
 * POST   /api/v2/volunteers/shifts/[id]/signup - Sign up for a shift
 * DELETE /api/v2/volunteers/shifts/[id]/signup - Cancel signup
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import { z } from 'zod';
import {
  apiCreated,
  apiSuccess,
  apiNotFound,
  apiBadRequest,
  withErrorHandling,
} from '@/lib/api/response';
import {
  validateMethod,
  validateBody,
  requireAuth,
  checkRateLimit,
} from '@/lib/api/middleware';
import { sendEmail } from '@/lib/email';
import siteConfig from '@/config/site-config';

const signupSchema = z.object({
  notes: z.string().optional(),
});

/**
 * POST /api/v2/volunteers/shifts/[id]/signup
 */
export const POST = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['POST']);
  checkRateLimit(request, 50);

  const session = await requireAuth(request);
  const data = await validateBody(request, signupSchema);

  // Verify shift exists and is open
  const shift = await prisma.volunteerShift.findUnique({
    where: { id: params.id },
    include: {
      role: true,
      volunteers: {
        include: {
          user: true
        }
      }
    }
  });

  if (!shift) {
    return apiNotFound('Volunteer shift');
  }

  if (shift.status === 'cancelled') {
    return apiBadRequest('This shift has been cancelled');
  }

  if (shift.status === 'filled') {
    return apiBadRequest('This shift is already filled');
  }

  // Count current volunteers (excluding cancelled)
  const activeVolunteers = shift.volunteers.filter(v => v.status !== 'cancelled').length;

  if (activeVolunteers >= shift.spotsNeeded) {
    return apiBadRequest('This shift is already filled');
  }

  // Check if user is already signed up for this shift
  const existingSignup = shift.volunteers.find(
    v => v.userId === session.user.id && v.status !== 'cancelled'
  );

  if (existingSignup) {
    return apiBadRequest('You are already signed up for this shift');
  }

  // Check for overlapping shifts on the same day
  const conflictingShifts = await prisma.volunteerAssignment.findMany({
    where: {
      userId: session.user.id,
      status: {
        not: 'cancelled'
      },
      shift: {
        date: shift.date,
      }
    },
    include: {
      shift: true
    }
  });

  // Check for time overlap
  for (const assignment of conflictingShifts) {
    const existingStart = assignment.shift.startTime;
    const existingEnd = assignment.shift.endTime;
    const newStart = shift.startTime;
    const newEnd = shift.endTime;

    // Check if times overlap
    if (
      (newStart >= existingStart && newStart < existingEnd) ||
      (newEnd > existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd)
    ) {
      return apiBadRequest(
        `You are already signed up for "${assignment.shift.title}" which overlaps with this shift (${existingStart} - ${existingEnd})`
      );
    }
  }

  // Create the signup
  const assignment = await prisma.volunteerAssignment.create({
    data: {
      shiftId: params.id,
      userId: session.user.id,
      name: session.user.name || '',
      email: session.user.email || '',
      roleId: shift.roleId,
      status: 'scheduled',
      checkedIn: false,
      notes: data.notes,
    },
    include: {
      shift: {
        include: {
          role: true
        }
      },
      user: {
        select: {
          name: true,
          email: true,
        }
      }
    }
  });

  // Update shift status if now filled
  const newVolunteerCount = activeVolunteers + 1;
  if (newVolunteerCount >= shift.spotsNeeded) {
    await prisma.volunteerShift.update({
      where: { id: params.id },
      data: { status: 'filled' }
    });
  }

  // Send confirmation email
  await sendShiftConfirmationEmail(assignment);

  return apiCreated({
    ...assignment,
    message: 'Successfully signed up for shift!',
  });
});

/**
 * DELETE /api/v2/volunteers/shifts/[id]/signup
 */
export const DELETE = withErrorHandling(async (
  request: NextRequest,
  context
) => {
  const { params } = context as { params: { id: string } };
  validateMethod(request, ['DELETE']);
  checkRateLimit(request, 50);

  const session = await requireAuth(request);

  // Find the user's assignment for this shift
  const assignment = await prisma.volunteerAssignment.findFirst({
    where: {
      shiftId: params.id,
      userId: session.user.id,
      status: {
        not: 'cancelled'
      }
    },
    include: {
      shift: {
        include: {
          role: true
        }
      }
    }
  });

  if (!assignment) {
    return apiNotFound('Shift signup');
  }

  // Don't allow cancellation if shift has already started
  const shiftDate = new Date(assignment.shift.date);
  const [hours, minutes] = assignment.shift.startTime.split(':').map(Number);
  shiftDate.setHours(hours, minutes, 0, 0);

  if (shiftDate < new Date()) {
    return apiBadRequest('Cannot cancel a shift that has already started');
  }

  // Update assignment status to cancelled
  await prisma.volunteerAssignment.update({
    where: { id: assignment.id },
    data: { status: 'cancelled' }
  });

  // Update shift status if it was filled
  if (assignment.shift.status === 'filled') {
    await prisma.volunteerShift.update({
      where: { id: params.id },
      data: { status: 'open' }
    });
  }

  // Send cancellation notification
  await sendCancellationEmail(assignment);

  return apiSuccess({
    message: 'Shift signup cancelled successfully',
  });
});

async function sendShiftConfirmationEmail(assignment: any) {
  if (!assignment.user?.email) return;

  const shift = assignment.shift;
  const shiftDate = new Date(shift.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const subject = `Shift Confirmation - ${shift.title}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #fff; }
    .info-box { background: #f8f9fa; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">✅ You're All Set!</h1>
  </div>

  <div class="content">
    <p>Dear ${assignment.user.name},</p>

    <p>
      Thank you for signing up to serve! You're confirmed for <strong>${shift.title}</strong>.
    </p>

    <div class="info-box">
      <strong>Shift Details:</strong><br>
      <strong>Date:</strong> ${shiftDate}<br>
      <strong>Time:</strong> ${shift.startTime} - ${shift.endTime}<br>
      <strong>Location:</strong> ${shift.location}<br>
      <strong>Role:</strong> ${shift.role?.name || 'Volunteer'}
    </div>

    ${shift.description ? `
    <p>
      <strong>Description:</strong><br>
      ${shift.description}
    </p>
    ` : ''}

    ${shift.notes ? `
    <div class="info-box">
      <strong>Important Notes:</strong><br>
      ${shift.notes}
    </div>
    ` : ''}

    <p>
      <strong>What to expect:</strong><br>
      • Please arrive 10-15 minutes early<br>
      • You'll receive a reminder 24 hours before your shift<br>
      • If you need to cancel, please do so at least 24 hours in advance
    </p>

    <p style="margin-top: 30px;">
      Thank you for serving!<br><br>
      Blessings,<br>
      <strong>${siteConfig.site.name}</strong>
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({
    to: assignment.user.email,
    subject,
    html,
  });
}

async function sendCancellationEmail(assignment: any) {
  if (!assignment.user?.email) return;

  const shift = assignment.shift;
  const shiftDate = new Date(shift.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const subject = `Shift Cancellation - ${shift.title}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #6c757d; color: white; padding: 30px; text-align: center; }
    .content { padding: 30px; background: #fff; }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0;">Shift Cancelled</h1>
  </div>

  <div class="content">
    <p>Dear ${assignment.user.name},</p>

    <p>
      Your signup for <strong>${shift.title}</strong> on ${shiftDate} at ${shift.startTime} has been cancelled.
    </p>

    <p>
      We hope to see you serve with us again soon! You can browse and sign up for other volunteer opportunities anytime.
    </p>

    <p style="margin-top: 30px;">
      Blessings,<br>
      <strong>${siteConfig.site.name}</strong>
    </p>
  </div>
</body>
</html>
  `;

  await sendEmail({
    to: assignment.user.email,
    subject,
    html,
  });
}
