# Admin Settings Management Interface

## Overview

The Admin Settings Management interface provides a comprehensive, user-friendly dashboard for managing all church website configuration settings. It features organized sections, real-time validation, and clear feedback.

## Location

- **URL**: `/admin/settings`
- **File**: `/app/admin/settings/page.tsx`
- **API Endpoint**: `/api/v2/admin/settings`

## Features

### 1. **Organized Settings Sections**

The interface is divided into 6 logical sections:

- **Site Information** (🏛️) - Church details, contact info, timezone
- **Features** (⚡) - Toggle major site features on/off
- **Events** (📅) - Event calendar configuration
- **Prayer Wall** (🙏) - Prayer request settings
- **Donations** (💰) - Giving system configuration
- **Notifications** (📧) - Admin notification preferences

### 2. **User-Friendly Controls**

- **Toggle Switches** - Smooth animated toggles for boolean settings
- **Text Inputs** - Full validation with help text
- **Number Inputs** - Min/max constraints for numeric values
- **Select Dropdowns** - Predefined options (e.g., timezone)
- **Text Areas** - Multi-line input for addresses and descriptions

### 3. **Real-Time Feedback**

- **Loading States** - Spinner while fetching settings
- **Change Detection** - "Unsaved changes" warning
- **Success Messages** - Confirmation when settings are saved
- **Error Messages** - Clear error display with retry option

### 4. **Smart Features**

- **Conditional Fields** - Some fields enable/disable based on parent settings
- **Help Text** - Every field has explanatory help text
- **Required Fields** - Visual indicators with red asterisk
- **Auto-Save** - Save button activates only when changes are made

## Settings Structure

### Site Info Settings

```typescript
{
  siteName: string;        // Church name
  tagline: string;         // Short description
  email: string;           // Contact email
  phone: string;           // Phone number
  address: string;         // Physical address
  timezone: string;        // Timezone for events
}
```

### Features Settings

```typescript
{
  enableEvents: boolean;       // Events calendar
  enablePrayerWall: boolean;   // Prayer requests
  enableDonations: boolean;    // Online giving
  enableLiveStream: boolean;   // Live stream player
  enableSermons: boolean;      // Sermon library
  enableBlog: boolean;         // Blog posts
  enableNewsletter: boolean;   // Newsletter signup
}
```

### Events Settings

```typescript
{
  requireApproval: boolean;   // Admin approval needed
  maxAttendees: number;       // Default capacity
  allowWaitlist: boolean;     // Enable waitlist
  sendReminders: boolean;     // Auto-send reminders
  reminderHours: number;      // Hours before event
}
```

### Prayer Wall Settings

```typescript
{
  requireModeration: boolean;  // Approval needed
  allowAnonymous: boolean;     // Anonymous posts OK
  maxRequestLength: number;    // Character limit
  autoExpireDays: number;      // Archive after days
}
```

### Donations Settings

```typescript
{
  defaultAmounts: number[];    // Quick select amounts
  enableRecurring: boolean;    // Monthly/yearly donations
  taxDeductible: boolean;      // 501(c)(3) status
  minimumAmount: number;       // Min donation
}
```

### Notifications Settings

```typescript
{
  emailNotifications: boolean;   // Master toggle
  adminEmail: string;            // Notification recipient
  notifyNewEvents: boolean;      // Event notifications
  notifyNewPrayers: boolean;     // Prayer notifications
  notifyNewDonations: boolean;   // Donation notifications
}
```

## API Integration

### GET `/api/v2/admin/settings`

Fetches all settings grouped by category.

**Response:**
```json
{
  "success": true,
  "data": {
    "siteInfo": { ... },
    "features": { ... },
    "events": { ... },
    "prayerWall": { ... },
    "donations": { ... },
    "notifications": { ... }
  }
}
```

### POST `/api/v2/admin/settings`

Updates settings for a specific category.

**Request:**
```json
{
  "category": "siteInfo",
  "settings": {
    "siteName": "My Church",
    "email": "contact@church.org"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Settings updated successfully"
  }
}
```

## Usage Guide

### Navigating Sections

1. Click on any section in the left sidebar
2. The main panel updates to show that section's settings
3. Unsaved changes are preserved when switching sections

### Making Changes

1. Modify any field (text, number, toggle, etc.)
2. The "Unsaved changes" warning appears
3. Click "Save Changes" to persist
4. Success message confirms the save

### Field Validation

- **Required fields** show a red asterisk (*)
- **Number fields** enforce min/max values
- **Email fields** validate email format
- **Disabled fields** appear grayed out

### Conditional Logic

Some fields depend on others:

- **Reminder Hours** is disabled if "Send Reminders" is off
- **Notification emails** disabled if "Email Notifications" is off
- **Admin Email** disabled if notifications are off

## Styling & Design

### Color Scheme

- **Primary Blue**: Buttons, active states, toggles
- **Gray Tones**: Background, borders, disabled states
- **Green**: Success messages
- **Red**: Error messages, delete actions
- **Amber**: Warning messages (unsaved changes)

### Layout

- **Responsive**: Works on mobile, tablet, and desktop
- **Sidebar**: Fixed on desktop, collapsible on mobile
- **Cards**: White cards with shadows for content
- **Spacing**: Consistent padding and margins

### Animations

- **Framer Motion**: Smooth transitions
- **Toggle Switches**: Slide animation
- **Messages**: Fade in/out
- **Loading**: Spinning indicators

## Component Structure

The page includes several reusable form components:

### InputField
Text/email/number/tel input with label and help text

### TextAreaField
Multi-line text input for longer content

### SelectField
Dropdown with predefined options

### ToggleField
Animated switch for boolean values

## Accessibility

- **Keyboard Navigation**: All controls accessible via keyboard
- **ARIA Labels**: Proper role and aria-checked attributes
- **Focus States**: Visible focus indicators
- **Screen Readers**: Descriptive labels and help text

## Error Handling

The interface handles errors gracefully:

1. **Network Errors**: "Failed to load settings" with retry button
2. **Save Errors**: Error message with option to try again
3. **Validation Errors**: Inline validation feedback
4. **Loading States**: Clear indicators while processing

## Best Practices

1. **Save Regularly**: Changes are per-section, save often
2. **Review Help Text**: Each field has explanatory notes
3. **Test After Changes**: Verify settings work as expected
4. **Use Toggles Wisely**: Disabling features hides them from users
5. **Check Dependencies**: Some settings affect others

## Future Enhancements

Potential improvements:

- [ ] Global save button (all sections at once)
- [ ] Change history/audit log
- [ ] Export/import settings
- [ ] Advanced validation rules
- [ ] Bulk edit mode
- [ ] Settings preview
- [ ] Role-based permissions

## Troubleshooting

### Settings Not Loading
- Check database connection
- Verify admin authentication
- Check browser console for errors

### Save Not Working
- Ensure you're authenticated as admin
- Check network tab for API errors
- Verify database is accessible

### Validation Errors
- Review field requirements
- Check min/max values for numbers
- Ensure email format is correct

## Related Files

- **API Route**: `/app/api/v2/admin/settings/route.ts`
- **Database Schema**: See Prisma schema for `Setting` model
- **Admin Dashboard**: `/app/admin/dashboard/page.tsx`
- **Components**: Reusable form components in this file

## Support

For issues or questions about the settings interface:

1. Check this documentation
2. Review the code comments
3. Check the database schema
4. Test the API endpoints directly
5. Review server logs for errors
