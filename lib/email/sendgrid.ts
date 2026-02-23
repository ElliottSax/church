import sgMail from '@sendgrid/mail';
import { logger, logError, logWarn } from '@/lib/logger';

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
  dynamicTemplateData?: Record<string, unknown>;
}

export async function sendEmail(options: EmailOptions) {
  const from = process.env.SENDGRID_FROM_EMAIL || 'noreply@minneapoliscofchrist.org';

  try {
    const msg: sgMail.MailDataRequired = {
      to: options.to,
      from: {
        email: from,
        name: 'Minneapolis Community of Christ',
      },
      subject: options.subject,
      ...(options.templateId
        ? {
            templateId: options.templateId,
            dynamicTemplateData: options.dynamicTemplateData || {},
          }
        : {
            text: options.text || '',
            html: options.html || '',
          }),
    };

    const result = await sgMail.send(msg);
    return { success: true, messageId: result[0].headers['x-message-id'] };
  } catch (error: unknown) {
    logError('SendGrid error:', error);
    const sgError = error as { response?: { body: unknown }; message?: string };
    if (sgError.response) {
      logError('SendGrid error body:', sgError.response.body);
    }
    throw new Error(`Failed to send email: ${sgError.message ?? 'Unknown error'}`);
  }
}

export async function sendBulkEmail(options: EmailOptions & { to: string[] }) {
  const from = process.env.SENDGRID_FROM_EMAIL || 'noreply@minneapoliscofchrist.org';

  try {
    const messages = options.to.map((recipient) => {
      const msg: Record<string, unknown> = {
        to: recipient,
        from: {
          email: from,
          name: 'Minneapolis Community of Christ',
        },
        subject: options.subject,
      };
      if (options.text) msg.text = options.text;
      if (options.html) msg.html = options.html;
      if (options.templateId) msg.templateId = options.templateId;
      if (options.dynamicTemplateData) msg.dynamicTemplateData = options.dynamicTemplateData;
      return msg as unknown as sgMail.MailDataRequired;
    });

    const result = await sgMail.send(messages);
    return { success: true, count: result.length };
  } catch (error: unknown) {
    logError('SendGrid bulk error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to send bulk email: ${message}`);
  }
}
