// Email service for church notifications
// In production, this would integrate with SendGrid, AWS SES, or similar

interface EmailData {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: Record<string, any>;
}

// Default from address
const DEFAULT_FROM = 'noreply@minneapoliscoc.org';

// Send email using SendGrid (mock implementation)
async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    // In production:
    // const sgMail = require('@sendgrid/mail');
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    // await sgMail.send(data);

    console.log('Sending email:', data);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Send welcome email to new members
export async function sendWelcomeEmail(data: {
  to: string;
  name: string;
  membershipType?: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: 'Welcome to Minneapolis Community of Christ!',
    templateId: 'welcome-template',
    dynamicTemplateData: {
      name: data.name,
      membershipType: data.membershipType || 'Member',
      churchName: 'Minneapolis Community of Christ',
      websiteUrl: 'https://minneapoliscoc.org',
    },
  });
}

// Send event registration confirmation
export async function sendEventRegistrationEmail(data: {
  to: string;
  name: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  confirmationCode: string;
  numberOfAttendees: number;
  isWaitlist: boolean;
}): Promise<boolean> {
  const subject = data.isWaitlist
    ? `Waitlist Confirmation: ${data.eventTitle}`
    : `Registration Confirmed: ${data.eventTitle}`;

  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject,
    templateId: data.isWaitlist ? 'event-waitlist-template' : 'event-confirmation-template',
    dynamicTemplateData: {
      ...data,
      churchName: 'Minneapolis Community of Christ',
      websiteUrl: 'https://minneapoliscoc.org',
      cancelUrl: `https://minneapoliscoc.org/events/cancel?code=${data.confirmationCode}`,
    },
  });
}

// Send prayer request notification
export async function sendPrayerRequestNotification(data: {
  to: string;
  requestorName: string;
  requestType: string;
  requestContent: string;
  isUrgent: boolean;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: data.isUrgent ? '🙏 URGENT Prayer Request' : '🙏 New Prayer Request',
    templateId: 'prayer-request-template',
    dynamicTemplateData: data,
  });
}

// Send volunteer reminder
export async function sendVolunteerReminder(data: {
  to: string;
  volunteerName: string;
  shiftDate: string;
  shiftTime: string;
  role: string;
  location: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: `Volunteer Reminder: ${data.role} on ${data.shiftDate}`,
    templateId: 'volunteer-reminder-template',
    dynamicTemplateData: data,
  });
}

// Send donation receipt
export async function sendDonationReceipt(data: {
  to: string;
  donorName: string;
  amount: number;
  donationDate: string;
  donationType: string;
  taxDeductible: boolean;
  transactionId: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: `Donation Receipt - Thank You for Your Generosity`,
    templateId: 'donation-receipt-template',
    dynamicTemplateData: {
      ...data,
      formattedAmount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(data.amount),
    },
  });
}

// Send newsletter
export async function sendNewsletter(data: {
  to: string[];
  subject: string;
  content: string;
  attachments?: Array<{
    filename: string;
    content: string;
    type: string;
  }>;
}): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  // In production, use batch sending
  for (const recipient of data.to) {
    const success = await sendEmail({
      to: recipient,
      from: DEFAULT_FROM,
      subject: data.subject,
      html: data.content,
      templateId: 'newsletter-template',
    });

    if (success) sent++;
    else failed++;
  }

  return { sent, failed };
}

// Send password reset email
export async function sendPasswordResetEmail(data: {
  to: string;
  name: string;
  resetToken: string;
}): Promise<boolean> {
  const resetUrl = `https://minneapoliscoc.org/reset-password?token=${data.resetToken}`;

  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: 'Password Reset Request',
    templateId: 'password-reset-template',
    dynamicTemplateData: {
      name: data.name,
      resetUrl,
      expirationTime: '24 hours',
    },
  });
}

// Send event cancellation notice
export async function sendEventCancellationEmail(data: {
  to: string;
  name: string;
  eventTitle: string;
  originalDate: string;
  reason?: string;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: `Event Cancelled: ${data.eventTitle}`,
    templateId: 'event-cancellation-template',
    dynamicTemplateData: data,
  });
}

// Send birthday greetings
export async function sendBirthdayGreeting(data: {
  to: string;
  name: string;
  age?: number;
}): Promise<boolean> {
  return sendEmail({
    to: data.to,
    from: DEFAULT_FROM,
    subject: `🎉 Happy Birthday, ${data.name}!`,
    templateId: 'birthday-greeting-template',
    dynamicTemplateData: data,
  });
}

// Send staff notification
export async function sendStaffNotification(data: {
  to: string[];
  subject: string;
  priority: 'low' | 'medium' | 'high';
  message: string;
  actionRequired?: boolean;
  actionUrl?: string;
}): Promise<boolean> {
  const priorityEmoji = {
    low: '📌',
    medium: '⚠️',
    high: '🚨',
  };

  const fullSubject = `${priorityEmoji[data.priority]} ${data.subject}`;

  // Send to all staff members
  const results = await Promise.all(
    data.to.map(recipient =>
      sendEmail({
        to: recipient,
        from: DEFAULT_FROM,
        subject: fullSubject,
        templateId: 'staff-notification-template',
        dynamicTemplateData: data,
      })
    )
  );

  return results.every(r => r);
}