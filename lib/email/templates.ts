export interface WelcomeEmailData {
  name: string;
  loginUrl: string;
}

export interface EventReminderData {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
}

export interface DonationReceiptData {
  name: string;
  amount: string;
  date: string;
  category: string;
  isRecurring: boolean;
}

export interface NewsletterData {
  content: string;
  unsubscribeUrl: string;
}

export function generateWelcomeEmail(data: WelcomeEmailData): { subject: string; html: string; text: string } {
  return {
    subject: 'Welcome to Minneapolis Community of Christ!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Community!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>We're thrilled to have you join the Minneapolis Community of Christ family! Your journey with us begins today.</p>
            <p>As a member, you now have access to:</p>
            <ul>
              <li>Member portal with personalized dashboard</li>
              <li>Event registration and RSVP</li>
              <li>Online giving and contribution history</li>
              <li>Small group connections</li>
              <li>Member-only resources</li>
            </ul>
            <p style="text-align: center;">
              <a href="${data.loginUrl}" class="button">Access Your Portal</a>
            </p>
            <p>If you have any questions, please don't hesitate to reach out to us.</p>
            <p>Blessings,<br>Minneapolis Community of Christ</p>
          </div>
          <div class="footer">
            <p>Minneapolis Community of Christ<br>
            123 Main Street, Minneapolis, MN 55401<br>
            (612) 555-1234</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Welcome to Minneapolis Community of Christ!\n\nDear ${data.name},\n\nWe're thrilled to have you join our family! Access your member portal at: ${data.loginUrl}\n\nBlessings,\nMinneapolis Community of Christ`,
  };
}

export function generateEventReminderEmail(data: EventReminderData): { subject: string; html: string; text: string } {
  return {
    subject: `Reminder: ${data.eventTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .event-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #2563eb; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Event Reminder</h1>
          </div>
          <div class="content">
            <p>Hi ${data.name},</p>
            <p>This is a friendly reminder about the upcoming event you registered for:</p>
            <div class="event-details">
              <h2 style="margin-top: 0;">${data.eventTitle}</h2>
              <div class="detail-row">
                <span class="label">Date:</span> ${data.eventDate}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${data.eventTime}
              </div>
              <div class="detail-row">
                <span class="label">Location:</span> ${data.eventLocation}
              </div>
            </div>
            <p>We're looking forward to seeing you there!</p>
            <p>Blessings,<br>Minneapolis Community of Christ</p>
          </div>
          <div class="footer">
            <p>Minneapolis Community of Christ</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Event Reminder\n\nHi ${data.name},\n\n${data.eventTitle}\nDate: ${data.eventDate}\nTime: ${data.eventTime}\nLocation: ${data.eventLocation}\n\nWe're looking forward to seeing you there!\n\nBlessings,\nMinneapolis Community of Christ`,
  };
}

export function generateDonationReceiptEmail(data: DonationReceiptData): { subject: string; html: string; text: string } {
  return {
    subject: 'Thank You for Your Donation',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .receipt { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .amount { font-size: 36px; color: #2563eb; font-weight: bold; text-align: center; margin: 20px 0; }
          .detail-row { margin: 10px 0; display: flex; justify-content: space-between; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You!</h1>
          </div>
          <div class="content">
            <p>Dear ${data.name},</p>
            <p>Thank you for your generous ${data.isRecurring ? 'monthly' : ''} donation to Minneapolis Community of Christ.</p>
            <div class="receipt">
              <div class="amount">$${data.amount}</div>
              <div class="detail-row">
                <span>Date:</span>
                <span>${data.date}</span>
              </div>
              <div class="detail-row">
                <span>Designation:</span>
                <span>${data.category}</span>
              </div>
              <div class="detail-row">
                <span>Type:</span>
                <span>${data.isRecurring ? 'Monthly Recurring' : 'One-Time'}</span>
              </div>
            </div>
            <p>Your generosity makes a real difference in our community and helps us continue our mission of proclaiming Jesus Christ and promoting communities of joy, hope, love, and peace.</p>
            <p><small>This email serves as your donation receipt for tax purposes. Please retain for your records. Our tax ID: XX-XXXXXXX</small></p>
            <p>With gratitude,<br>Minneapolis Community of Christ</p>
          </div>
          <div class="footer">
            <p>Minneapolis Community of Christ</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `Thank You for Your Donation!\n\nDear ${data.name},\n\nThank you for your ${data.isRecurring ? 'monthly ' : ''}donation of $${data.amount} to ${data.category}.\n\nDate: ${data.date}\n\nThis email serves as your donation receipt for tax purposes.\n\nWith gratitude,\nMinneapolis Community of Christ`,
  };
}

export function generateNewsletterEmail(data: NewsletterData): { subject: string; html: string; text: string } {
  return {
    subject: 'Minneapolis Community of Christ Newsletter',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #f9fafb; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Community Newsletter</h1>
          </div>
          <div class="content">
            ${data.content}
          </div>
          <div class="footer">
            <p>Minneapolis Community of Christ</p>
            <p><a href="${data.unsubscribeUrl}">Unsubscribe</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: data.content.replace(/<[^>]*>/g, '') + `\n\nUnsubscribe: ${data.unsubscribeUrl}`,
  };
}
