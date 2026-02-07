/**
 * Event RSVP Email Templates
 *
 * React Email templates for event-related emails
 * Can be rendered to HTML for email sending
 */

import React from 'react';

interface EventRSVPConfirmationProps {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  confirmationCode: string;
  numberOfGuests: number;
  isWaitlisted: boolean;
  churchName: string;
  churchEmail: string;
}

export const EventRSVPConfirmation = ({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  confirmationCode,
  numberOfGuests,
  isWaitlisted,
  churchName,
  churchEmail,
}: EventRSVPConfirmationProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP ${isWaitlisted ? 'Waitlisted' : 'Confirmed'}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #fff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .event-details {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #e0e0e0;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      font-weight: 600;
      width: 140px;
      color: #666;
    }
    .detail-value {
      color: #333;
      flex: 1;
    }
    .confirmation-code {
      background: #fff3cd;
      border: 2px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .confirmation-code-label {
      font-size: 12px;
      color: #856404;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    .confirmation-code-value {
      font-size: 24px;
      font-weight: bold;
      color: #856404;
      letter-spacing: 3px;
      font-family: 'Courier New', monospace;
    }
    .status-badge {
      display: inline-block;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin: 10px 0;
    }
    .confirmed {
      background: #d4edda;
      color: #155724;
    }
    .waitlisted {
      background: #fff3cd;
      color: #856404;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
      margin-top: 30px;
    }
    .button {
      display: inline-block;
      padding: 12px 30px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 10px 0;
    }
    .alert {
      background: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5460;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">
      ${isWaitlisted ? '📋 RSVP Waitlisted' : '✅ RSVP Confirmed'}
    </h1>
  </div>

  <div class="content">
    <p style="font-size: 18px; margin-top: 0;">Hi ${name},</p>

    <p>
      ${isWaitlisted
        ? `Thank you for your interest in <strong>${eventTitle}</strong>. You have been added to the waitlist and we will notify you if a spot becomes available.`
        : `Great news! Your RSVP for <strong>${eventTitle}</strong> has been confirmed.`
      }
    </p>

    <span class="status-badge ${isWaitlisted ? 'waitlisted' : 'confirmed'}">
      ${isWaitlisted ? '⏳ WAITLISTED' : '✓ CONFIRMED'}
    </span>

    <div class="event-details">
      <h3 style="margin-top: 0; color: #667eea;">Event Details</h3>

      <div class="detail-row">
        <div class="detail-label">Event:</div>
        <div class="detail-value"><strong>${eventTitle}</strong></div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Date & Time:</div>
        <div class="detail-value">${eventDate}</div>
      </div>

      <div class="detail-row">
        <div class="detail-label">Location:</div>
        <div class="detail-value">${eventLocation}</div>
      </div>

      ${numberOfGuests > 0 ? `
      <div class="detail-row">
        <div class="detail-label">Guests:</div>
        <div class="detail-value">${numberOfGuests}</div>
      </div>
      ` : ''}
    </div>

    <div class="confirmation-code">
      <div class="confirmation-code-label">Confirmation Code</div>
      <div class="confirmation-code-value">${confirmationCode}</div>
    </div>

    ${!isWaitlisted ? `
    <div class="alert">
      <strong>📅 Add to Calendar</strong><br>
      Please save this confirmation code. You may need it to check in or make changes to your RSVP.
    </div>
    ` : `
    <div class="alert">
      <strong>⏳ On the Waitlist</strong><br>
      We'll send you an email immediately if a spot opens up. Please keep an eye on your inbox!
    </div>
    `}

    ${!isWaitlisted ? `
    <p style="text-align: center; margin: 30px 0;">
      We look forward to seeing you!
    </p>
    ` : ''}

    <p style="font-size: 14px; color: #666; margin-top: 30px;">
      Need to cancel or modify your RSVP? Please contact us at
      <a href="mailto:${churchEmail}">${churchEmail}</a> with your confirmation code.
    </p>
  </div>

  <div class="footer">
    <p>
      <strong>${churchName}</strong><br>
      This is an automated message. Please do not reply to this email.
    </p>
    <p style="font-size: 12px; color: #999;">
      You received this email because you registered for an event at ${churchName}.
    </p>
  </div>
</body>
</html>
  `.trim();
};

export const EventReminderEmail = ({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  churchName,
}: Omit<EventRSVPConfirmationProps, 'confirmationCode' | 'numberOfGuests' | 'isWaitlisted' | 'churchEmail'>) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event Reminder</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
      padding: 30px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #fff;
      padding: 30px;
      border: 1px solid #e0e0e0;
      border-top: none;
    }
    .countdown {
      background: #fff3cd;
      border: 2px solid #ffc107;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      margin: 20px 0;
    }
    .countdown-text {
      font-size: 16px;
      color: #856404;
      margin-bottom: 10px;
    }
    .countdown-time {
      font-size: 32px;
      font-weight: bold;
      color: #f5576c;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">⏰ Event Reminder</h1>
  </div>

  <div class="content">
    <p style="font-size: 18px; margin-top: 0;">Hi ${name},</p>

    <p>
      This is a friendly reminder that <strong>${eventTitle}</strong> is coming up soon!
    </p>

    <div class="countdown">
      <div class="countdown-text">📅 Event Date</div>
      <div class="countdown-time">${eventDate}</div>
    </div>

    <p style="font-size: 16px;">
      <strong>📍 Location:</strong> ${eventLocation}
    </p>

    <p>We're looking forward to seeing you there!</p>

    <p style="margin-top: 30px; color: #666; font-size: 14px;">
      Blessings,<br>
      <strong>${churchName}</strong>
    </p>
  </div>
</body>
</html>
  `.trim();
};
