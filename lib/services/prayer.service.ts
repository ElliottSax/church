/**
 * Prayer Request Service Layer
 *
 * Business logic for prayer wall operations
 */

import { prayerRepository } from '@/lib/db/repositories/prayer.repository';
import { sendEmail } from '@/lib/email';
import siteConfig from '@/config/site-config';
import type { PrayerRequest } from '@prisma/client';

export class PrayerService {
  /**
   * Submit prayer request with moderation
   */
  async submitPrayerRequest(data: any): Promise<PrayerRequest> {
    const requireApproval = siteConfig.prayerWall.requireApproval;

    // Filter inappropriate content (basic implementation)
    const filteredRequest = this.filterContent(data.request);

    const prayerRequest = await prayerRepository.create({
      ...data,
      request: filteredRequest,
      approved: !requireApproval,
      name: data.isAnonymous ? 'Anonymous' : data.name,
    });

    // Notify admin if approval required
    if (requireApproval) {
      await this.notifyAdminOfNewRequest(prayerRequest);
    }

    // Send confirmation to submitter
    if (data.userEmail) {
      await this.sendSubmissionConfirmation(prayerRequest, data.userEmail);
    }

    return prayerRequest;
  }

  /**
   * Approve prayer request and notify submitter
   */
  async approvePrayerRequest(requestId: string): Promise<void> {
    const request = await prayerRepository.approve(requestId);

    if (request && request.userEmail) {
      await this.sendApprovalNotification(request);
    }
  }

  /**
   * Pray for request (increment count)
   */
  async prayForRequest(requestId: string, userId: string): Promise<number> {
    return await prayerRepository.incrementPrayerCount(requestId, userId);
  }

  /**
   * Get prayer wall digest for email
   */
  async getPrayerDigest(days: number = 7): Promise<PrayerRequest[]> {
    return await prayerRepository.findTrending(days, 10);
  }

  /**
   * Send weekly prayer digest email
   */
  async sendWeeklyDigest(emails: string[]): Promise<void> {
    const digest = await this.getPrayerDigest(7);

    if (digest.length === 0) return;

    const subject = 'Weekly Prayer Digest';

    const requestsHtml = digest.map(req => `
      <div style="margin-bottom: 20px; padding: 15px; border-left: 3px solid #4F46E5; background: #F9FAFB;">
        <h4 style="margin: 0 0 10px 0;">${req.name}</h4>
        <p style="margin: 0 0 10px 0;">${req.request}</p>
        <small style="color: #6B7280;">🙏 ${req.prayerCount} prayers</small>
      </div>
    `).join('');

    const html = `
      <h2>This Week's Prayer Requests</h2>
      <p>Join us in praying for these requests from our church family:</p>
      ${requestsHtml}
      <p style="margin-top: 30px;">
        <a href="${siteConfig.site.url}/grow/prayer"
           style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Visit Prayer Wall
        </a>
      </p>
      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    for (const email of emails) {
      await sendEmail({
        to: email,
        subject,
        html
      });
    }
  }

  /**
   * Content filtering (basic implementation)
   */
  private filterContent(content: string): string {
    // Basic profanity filter - expand as needed
    const inappropriateWords = ['spam', 'scam']; // Add more as needed

    let filtered = content;
    inappropriateWords.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filtered = filtered.replace(regex, '***');
    });

    return filtered;
  }

  /**
   * Email notifications
   */
  private async notifyAdminOfNewRequest(request: PrayerRequest): Promise<void> {
    const adminEmails = siteConfig.admin.allowedAdminEmails;

    const subject = 'New Prayer Request Pending Approval';

    const html = `
      <h2>New Prayer Request</h2>
      <p>A new prayer request has been submitted and requires approval.</p>

      <div style="padding: 15px; background: #F9FAFB; border-left: 3px solid #4F46E5;">
        <p><strong>From:</strong> ${request.name}</p>
        <p><strong>Category:</strong> ${request.category}</p>
        <p><strong>Request:</strong> ${request.request}</p>
      </div>

      <p style="margin-top: 20px;">
        <a href="${siteConfig.site.url}/admin/prayer-requests"
           style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Review Request
        </a>
      </p>
    `;

    for (const email of adminEmails) {
      await sendEmail({
        to: email,
        subject,
        html
      });
    }
  }

  private async sendSubmissionConfirmation(request: PrayerRequest, email: string): Promise<void> {
    const requireApproval = siteConfig.prayerWall.requireApproval;

    const subject = 'Prayer Request Received';

    const html = `
      <h2>Prayer Request Received</h2>
      <p>Thank you for sharing your prayer request with our church family.</p>

      ${requireApproval ?
        '<p>Your request is pending approval and will be posted to the prayer wall shortly.</p>' :
        '<p>Your request has been posted to the prayer wall.</p>'
      }

      <div style="padding: 15px; background: #F9FAFB; border-left: 3px solid #4F46E5; margin: 20px 0;">
        <p><strong>Your Request:</strong></p>
        <p>${request.request}</p>
      </div>

      <p>We are praying for you!</p>
      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: email,
      subject,
      html
    });
  }

  private async sendApprovalNotification(request: PrayerRequest): Promise<void> {
    if (!request.userEmail) return;

    const subject = 'Prayer Request Approved';

    const html = `
      <h2>Prayer Request Approved</h2>
      <p>Great news! Your prayer request has been approved and posted to our prayer wall.</p>

      <p>Our church family will be praying for you!</p>

      <p style="margin-top: 20px;">
        <a href="${siteConfig.site.url}/grow/prayer"
           style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          View Prayer Wall
        </a>
      </p>

      <p>Blessings,<br>${siteConfig.site.name}</p>
    `;

    await sendEmail({
      to: request.userEmail,
      subject,
      html
    });
  }
}

export const prayerService = new PrayerService();
