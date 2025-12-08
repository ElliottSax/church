import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  templateId?: string;
  dynamicTemplateData?: any;
}

export async function sendEmail(options: EmailOptions) {
  const from = process.env.SENDGRID_FROM_EMAIL || 'noreply@minneapoliscofchrist.org';

  try {
    const msg: any = {
      to: options.to,
      from: {
        email: from,
        name: 'Minneapolis Community of Christ',
      },
      subject: options.subject,
    };

    // Use dynamic template if provided
    if (options.templateId) {
      msg.templateId = options.templateId;
      msg.dynamicTemplateData = options.dynamicTemplateData || {};
    } else {
      msg.text = options.text;
      msg.html = options.html;
    }

    const result = await sgMail.send(msg);
    return { success: true, messageId: result[0].headers['x-message-id'] };
  } catch (error: any) {
    console.error('SendGrid error:', error);
    if (error.response) {
      console.error('SendGrid error body:', error.response.body);
    }
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

export async function sendBulkEmail(options: EmailOptions & { to: string[] }) {
  const from = process.env.SENDGRID_FROM_EMAIL || 'noreply@minneapoliscofchrist.org';

  try {
    const messages = options.to.map((recipient) => ({
      to: recipient,
      from: {
        email: from,
        name: 'Minneapolis Community of Christ',
      },
      subject: options.subject,
      text: options.text,
      html: options.html,
      templateId: options.templateId,
      dynamicTemplateData: options.dynamicTemplateData,
    }));

    const result = await sgMail.send(messages as any);
    return { success: true, count: result.length };
  } catch (error: any) {
    console.error('SendGrid bulk error:', error);
    throw new Error(`Failed to send bulk email: ${error.message}`);
  }
}
