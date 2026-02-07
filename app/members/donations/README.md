# Donation History Page

## Overview

The Donation History page provides church members with a comprehensive view of their donation history, including detailed records, receipts, and analytics.

## Location

- **URL**: `/members/donations`
- **Page Component**: `/app/members/donations/page.tsx`
- **API Endpoint**: `GET /api/v2/donations`
- **Receipt API**: `GET /api/v2/donations/[id]/receipt`

## Features

### 1. Authentication Required
- Only logged-in users can access this page
- Uses NextAuth session to verify user identity
- Automatically redirects to sign-in if not authenticated
- Shows only the user's own donations

### 2. Donation Statistics Dashboard
Three key metrics displayed in cards:
- **Year to Date (YTD)**: Total donations for the current calendar year
- **All Time**: Total donations across all years
- **Top Fund**: The fund that received the most donations

### 3. Search and Filters

#### Search
- Search by amount, fund name, or notes
- Real-time filtering as you type

#### Advanced Filters
- **Fund Filter**: Filter by specific donation fund (General, Missions, Building, Youth, Benevolence)
- **Date Range**: Filter by start date and/or end date
- Clear all filters with one click
- Shows active filter count

### 4. Donation Table
Displays all donations with the following columns:
- **Date**: Formatted donation date
- **Amount**: Dollar amount with green highlighting
- **Fund**: Color-coded badge showing the fund
- **Payment Method**: Credit card or other payment type
- **Receipt**: Action buttons for printing and downloading

### 5. Receipt Generation

#### Print Receipt
- Click the printer icon to open a print-friendly version
- Opens in new window with professional formatting
- Includes all donation details and tax information
- Auto-sized for standard letter paper

#### Download Receipt (PDF)
- Click the download icon to get a PDF-ready HTML file
- Can be saved as PDF using browser's "Save as PDF" option
- Includes official receipt formatting
- Contains tax deduction information

### 6. Giving Analytics

#### Fund Breakdown
- Visual breakdown of donations by fund
- Animated progress bars showing percentage distribution
- Total amount per fund
- Sorted by highest to lowest contribution

#### Donations Over Time Chart
- 12-month bar chart showing donation trends
- Hover tooltips with detailed information
- Monthly totals and donation counts
- Summary statistics (total, average, peak month)

## API Integration

### Fetch Donations
```typescript
GET /api/v2/donations

Response:
{
  "data": [
    {
      "id": "donation_123",
      "amount": 100.00,
      "fund": "general",
      "frequency": "one-time",
      "createdAt": "2024-01-15T10:30:00Z",
      "status": "completed",
      "donorName": "John Doe",
      "donorEmail": "john@example.com",
      "stripePaymentId": "pi_123456",
      "notes": "Monthly giving"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 20
  }
}
```

### Get Receipt
```typescript
GET /api/v2/donations/[id]/receipt?format=pdf

Parameters:
- format: "pdf" | "html" (default: "pdf")

Returns: HTML receipt with print styles
```

## Security

- **Authentication Required**: All endpoints require valid NextAuth session
- **Ownership Verification**: Users can only view their own donations
- **Rate Limiting**: API calls are rate-limited to prevent abuse
- **Data Privacy**: Only shows donations linked to user's ID or email

## Styling

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Animations**: Smooth transitions using Framer Motion
- **Gradient Background**: Professional blue-purple gradient
- **Print-Friendly**: Receipts optimized for printing

## Components

### Main Page Component
`/app/members/donations/page.tsx`
- Client-side React component
- Uses NextAuth for authentication
- Integrates with donation API
- Handles all filtering and display logic

### Donation Chart Component
`/components/donations/DonationChart.tsx`
- Reusable chart component
- Shows monthly donation trends
- Animated bar chart with tooltips
- Configurable time period

### Receipt API Route
`/app/api/v2/donations/[id]/receipt/route.ts`
- Server-side receipt generation
- HTML templates for print and PDF
- Ownership verification
- Professional formatting with tax information

## Usage

### For Church Members
1. Navigate to `/members/donations`
2. Sign in if not already authenticated
3. View your donation history and statistics
4. Use filters to find specific donations
5. Download or print receipts for tax purposes

### For Developers

#### Adding New Funds
Update the `FUND_LABELS` constant in `page.tsx`:
```typescript
const FUND_LABELS: Record<string, string> = {
  general: "General Fund",
  missions: "Missions",
  building: "Building Fund",
  youth: "Youth Ministry",
  benevolence: "Benevolence",
  // Add new funds here
  newFund: "New Fund Name",
};
```

#### Customizing Receipt Template
Edit the receipt generation functions in `/app/api/v2/donations/[id]/receipt/route.ts`:
- `generateReceiptHTML()`: For display receipt
- `generatePrintableReceiptHTML()`: For print/PDF receipt

Update church information:
- Church name and address
- EIN (Tax ID number)
- Contact information

#### Extending Statistics
Add new calculations in the `stats` useMemo hook:
```typescript
const stats: DonationStats = useMemo(() => {
  // Add custom calculations here
  return {
    ytd: /* calculation */,
    allTime: /* calculation */,
    // Add new stats
  };
}, [donations]);
```

## Dependencies

- **next-auth**: User authentication
- **framer-motion**: Animations
- **date-fns**: Date formatting and manipulation
- **lucide-react**: Icons
- **tailwindcss**: Styling

## Future Enhancements

Potential improvements:
1. Export all donations to CSV/Excel
2. Recurring donation management
3. Donation pledges and tracking
4. Email receipt delivery
5. Tax year summaries
6. Donation impact stories
7. Comparative year-over-year analytics
8. Mobile app integration
9. Automated thank-you emails
10. Donation categories/tags

## Support

For issues or questions:
1. Check the console for error messages
2. Verify authentication is working
3. Ensure API endpoints are accessible
4. Check database connection
5. Review NextAuth configuration

## License

Part of the Minneapolis Community of Christ church website.
