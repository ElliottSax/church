/**
 * Donation Receipt API Route
 *
 * GET /api/v2/donations/[id]/receipt - Generate and download receipt (PDF or HTML)
 */

import { NextRequest } from 'next/server';
import { prisma } from '@/lib/db/client';
import {
  validateMethod,
  requireAuth,
} from '@/lib/api/middleware';
import { withErrorHandling } from '@/lib/api/response';
import { format } from 'date-fns';

/**
 * GET /api/v2/donations/[id]/receipt
 * Generate receipt for a specific donation
 */
export const GET = withErrorHandling(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  validateMethod(request, ['GET']);
  const session = await requireAuth(request);

  // Fetch donation
  const donation = await prisma.donation.findUnique({
    where: { id: params.id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!donation) {
    return new Response(JSON.stringify({ error: 'Donation not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify ownership
  if (
    donation.userId !== session.user.id &&
    donation.donorEmail !== session.user.email
  ) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if user wants PDF or HTML
  const { searchParams } = new URL(request.url);
  const format_type = searchParams.get('format') || 'pdf';

  if (format_type === 'html') {
    // Return HTML receipt
    const html = generateReceiptHTML(donation, session.user);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }

  // For PDF, we'll use a simple HTML-to-PDF approach
  // In production, you'd want to use a library like puppeteer or react-pdf
  // For now, we'll return HTML with print styles that can be saved as PDF
  const html = generatePrintableReceiptHTML(donation, session.user);

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': `inline; filename="receipt-${donation.id}.html"`,
    },
  });
});

/**
 * Generate HTML receipt for display
 */
function generateReceiptHTML(donation: any, user: any): string {
  const fundLabels: Record<string, string> = {
    general: 'General Fund',
    missions: 'Missions',
    building: 'Building Fund',
    youth: 'Youth Ministry',
    benevolence: 'Benevolence',
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Receipt - ${donation.id}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 40px auto;
          padding: 20px;
          background: #f9fafb;
        }
        .receipt {
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #2563eb;
          padding-bottom: 20px;
        }
        .header h1 {
          margin: 0;
          color: #1f2937;
          font-size: 32px;
        }
        .header p {
          margin: 5px 0;
          color: #6b7280;
        }
        .receipt-info {
          background: #f3f4f6;
          padding: 15px;
          border-radius: 6px;
          margin-bottom: 30px;
        }
        .details {
          margin: 20px 0;
        }
        .row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .label {
          font-weight: 600;
          color: #4b5563;
        }
        .value {
          color: #1f2937;
        }
        .amount-box {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          color: white;
          padding: 30px;
          border-radius: 8px;
          text-align: center;
          margin: 30px 0;
        }
        .amount-box .label {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
          margin-bottom: 10px;
        }
        .amount-box .amount {
          font-size: 48px;
          font-weight: bold;
          color: white;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
          text-align: center;
        }
        .footer p {
          color: #6b7280;
          font-size: 14px;
          margin: 8px 0;
        }
        .tax-notice {
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          padding: 15px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .tax-notice p {
          margin: 0;
          color: #92400e;
          font-size: 14px;
        }
        @media print {
          body {
            background: white;
          }
          .receipt {
            box-shadow: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          <h1>Minneapolis Community of Christ</h1>
          <p>Tax-Exempt Organization</p>
          <p>EIN: [Your EIN Here]</p>
        </div>

        <div class="receipt-info">
          <strong>Receipt #${donation.id}</strong>
        </div>

        <div class="details">
          <div class="row">
            <span class="label">Date of Donation:</span>
            <span class="value">${format(new Date(donation.createdAt), 'MMMM d, yyyy')}</span>
          </div>
          <div class="row">
            <span class="label">Donor Name:</span>
            <span class="value">${donation.donorName || user.name || 'Anonymous'}</span>
          </div>
          <div class="row">
            <span class="label">Donor Email:</span>
            <span class="value">${donation.donorEmail || user.email}</span>
          </div>
          <div class="row">
            <span class="label">Donation Fund:</span>
            <span class="value">${fundLabels[donation.fund] || donation.fund}</span>
          </div>
          <div class="row">
            <span class="label">Payment Method:</span>
            <span class="value">${donation.stripePaymentId ? 'Credit/Debit Card' : 'Other'}</span>
          </div>
          ${donation.frequency !== 'one-time' ? `
          <div class="row">
            <span class="label">Frequency:</span>
            <span class="value">${donation.frequency.charAt(0).toUpperCase() + donation.frequency.slice(1)}</span>
          </div>
          ` : ''}
          ${donation.notes ? `
          <div class="row">
            <span class="label">Notes:</span>
            <span class="value">${donation.notes}</span>
          </div>
          ` : ''}
        </div>

        <div class="amount-box">
          <div class="label">DONATION AMOUNT</div>
          <div class="amount">$${donation.amount.toFixed(2)}</div>
        </div>

        <div class="tax-notice">
          <p>
            <strong>Tax Information:</strong>
            No goods or services were provided in exchange for this donation.
            This receipt serves as proof of your charitable contribution for tax purposes.
          </p>
        </div>

        <div class="footer">
          <p><strong>Thank you for your generous support!</strong></p>
          <p>Your donation helps us continue our mission to serve the community.</p>
          <p style="margin-top: 20px; font-size: 12px;">
            Minneapolis Community of Christ<br>
            [Your Address Here]<br>
            [Your Phone Number] | [Your Email]
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate printable receipt with better print styles
 */
function generatePrintableReceiptHTML(donation: any, user: any): string {
  const fundLabels: Record<string, string> = {
    general: 'General Fund',
    missions: 'Missions',
    building: 'Building Fund',
    youth: 'Youth Ministry',
    benevolence: 'Benevolence',
  };

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Donation Receipt - ${donation.id}</title>
      <style>
        @page {
          margin: 20mm;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 3px solid #333;
          padding-bottom: 20px;
        }

        .header h1 {
          margin: 0 0 10px 0;
          color: #333;
          font-size: 28px;
        }

        .header p {
          margin: 3px 0;
          color: #666;
          font-size: 14px;
        }

        .receipt-number {
          background: #f5f5f5;
          padding: 10px;
          margin: 20px 0;
          text-align: center;
          font-weight: bold;
          font-size: 14px;
        }

        .details {
          margin: 30px 0;
        }

        .row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #ddd;
        }

        .label {
          font-weight: 600;
          color: #555;
        }

        .value {
          color: #333;
          text-align: right;
        }

        .amount-section {
          background: #f9f9f9;
          border: 2px solid #333;
          padding: 30px;
          text-align: center;
          margin: 30px 0;
        }

        .amount-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .amount {
          font-size: 42px;
          font-weight: bold;
          color: #333;
        }

        .tax-notice {
          background: #fffbea;
          border: 1px solid #f4c430;
          padding: 15px;
          margin: 20px 0;
          font-size: 13px;
        }

        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 2px solid #333;
          text-align: center;
        }

        .footer p {
          color: #666;
          font-size: 13px;
          margin: 5px 0;
        }

        .footer .thank-you {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        @media print {
          body {
            padding: 0;
          }

          .no-print {
            display: none;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Minneapolis Community of Christ</h1>
        <p>Tax-Exempt Religious Organization</p>
        <p>501(c)(3) Non-Profit</p>
      </div>

      <div class="receipt-number">
        OFFICIAL DONATION RECEIPT #${donation.id}
      </div>

      <div class="details">
        <div class="row">
          <span class="label">Date of Donation:</span>
          <span class="value">${format(new Date(donation.createdAt), 'MMMM d, yyyy')}</span>
        </div>
        <div class="row">
          <span class="label">Donor Name:</span>
          <span class="value">${donation.donorName || user.name || 'Anonymous'}</span>
        </div>
        <div class="row">
          <span class="label">Donor Email:</span>
          <span class="value">${donation.donorEmail || user.email}</span>
        </div>
        <div class="row">
          <span class="label">Donation Fund:</span>
          <span class="value">${fundLabels[donation.fund] || donation.fund}</span>
        </div>
        <div class="row">
          <span class="label">Payment Method:</span>
          <span class="value">${donation.stripePaymentId ? 'Credit/Debit Card' : 'Other'}</span>
        </div>
        ${donation.frequency !== 'one-time' ? `
        <div class="row">
          <span class="label">Frequency:</span>
          <span class="value">${donation.frequency.charAt(0).toUpperCase() + donation.frequency.slice(1)}</span>
        </div>
        ` : ''}
        ${donation.stripePaymentId ? `
        <div class="row">
          <span class="label">Transaction ID:</span>
          <span class="value">${donation.stripePaymentId}</span>
        </div>
        ` : ''}
        ${donation.notes ? `
        <div class="row">
          <span class="label">Notes:</span>
          <span class="value">${donation.notes}</span>
        </div>
        ` : ''}
      </div>

      <div class="amount-section">
        <div class="amount-label">TOTAL DONATION AMOUNT</div>
        <div class="amount">$${donation.amount.toFixed(2)}</div>
      </div>

      <div class="tax-notice">
        <strong>Tax Deduction Information:</strong><br>
        No goods or services were provided in exchange for this charitable contribution.
        This official receipt may be used for tax deduction purposes. Minneapolis Community of Christ
        is a tax-exempt organization under section 501(c)(3) of the Internal Revenue Code.
        Please consult with your tax advisor regarding the deductibility of this contribution.
      </div>

      <div class="footer">
        <p class="thank-you">Thank You for Your Generous Support!</p>
        <p>Your donation makes a real difference in our community.</p>
        <p style="margin-top: 20px; font-size: 11px;">
          Minneapolis Community of Christ<br>
          [Insert Church Address]<br>
          [Insert Phone Number] | [Insert Email Address]<br>
          EIN: [Insert Tax ID Number]
        </p>
      </div>

      <div class="no-print" style="margin-top: 30px; text-align: center;">
        <button onclick="window.print()" style="
          background: #2563eb;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          margin-right: 10px;
        ">
          Print Receipt
        </button>
        <button onclick="window.close()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
        ">
          Close
        </button>
      </div>

      <script>
        // Auto-print dialog for PDF saving
        // Commented out to allow user control
        // window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;
}
