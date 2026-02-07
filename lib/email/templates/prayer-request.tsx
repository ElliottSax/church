/**
 * Prayer Request Email Templates
 */

export const PrayerRequestSubmitted = ({
  name,
  request,
  requiresApproval,
  churchName,
}: {
  name: string;
  request: string;
  requiresApproval: boolean;
  churchName: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prayer Request Received</title>
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
      background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
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
    .prayer-box {
      background: #f8f9fa;
      border-left: 4px solid #764ba2;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .info-box {
      background: #e7f3ff;
      border: 1px solid #b3d9ff;
      padding: 15px;
      border-radius: 6px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px; color: #764ba2;">🙏 Prayer Request Received</h1>
  </div>

  <div class="content">
    <p style="font-size: 18px; margin-top: 0;">Dear ${name},</p>

    <p>
      Thank you for sharing your prayer request with our church family.
      We are honored to lift you up in prayer.
    </p>

    <div class="prayer-box">
      <h3 style="margin-top: 0; color: #764ba2;">Your Prayer Request:</h3>
      <p style="font-style: italic; color: #555;">${request}</p>
    </div>

    ${requiresApproval ? `
    <div class="info-box">
      <strong>📋 Pending Approval</strong><br>
      Your prayer request has been submitted and is pending approval by our pastoral team.
      Once approved, it will be shared with our prayer community.
    </div>
    ` : `
    <div class="info-box">
      <strong>✅ Posted to Prayer Wall</strong><br>
      Your prayer request has been posted to our prayer wall and our church family
      will be praying for you.
    </div>
    `}

    <p style="margin-top: 30px;">
      <em>"The prayer of a righteous person is powerful and effective."</em><br>
      <strong>- James 5:16</strong>
    </p>

    <p style="margin-top: 30px; color: #666;">
      May God's peace and comfort be with you.<br><br>
      Blessings,<br>
      <strong>${churchName}</strong>
    </p>
  </div>
</body>
</html>
  `.trim();
};

export const PrayerRequestApproved = ({
  name,
  churchName,
  prayerWallUrl,
}: {
  name: string;
  churchName: string;
  prayerWallUrl: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prayer Request Approved</title>
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
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: #4facfe;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 28px;">✅ Prayer Request Approved</h1>
  </div>

  <div class="content">
    <p style="font-size: 18px; margin-top: 0;">Dear ${name},</p>

    <p>
      Great news! Your prayer request has been approved and is now visible on our prayer wall.
    </p>

    <p>
      Our church family will be praying for you. You can view all the prayers and see how
      many people are lifting you up at:
    </p>

    <p style="text-align: center;">
      <a href="${prayerWallUrl}" class="button">View Prayer Wall</a>
    </p>

    <p style="margin-top: 30px; color: #666;">
      Thank you for allowing us to pray with you.<br><br>
      Blessings,<br>
      <strong>${churchName}</strong>
    </p>
  </div>
</body>
</html>
  `.trim();
};

export const WeeklyPrayerDigest = ({
  recipientName,
  prayerRequests,
  churchName,
  prayerWallUrl,
}: {
  recipientName?: string;
  prayerRequests: Array<{ name: string; request: string; prayerCount: number }>;
  churchName: string;
  prayerWallUrl: string;
}) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weekly Prayer Digest</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 10px 10px 0 0;
      text-align: center;
    }
    .content {
      background: #fff;
      padding: 30px;
    }
    .prayer-item {
      background: #f8f9fa;
      border-left: 4px solid #667eea;
      padding: 20px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .prayer-name {
      font-weight: 600;
      color: #667eea;
      margin-bottom: 10px;
    }
    .prayer-text {
      color: #555;
      line-height: 1.8;
    }
    .prayer-count {
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
    .button {
      display: inline-block;
      padding: 14px 32px;
      background: #667eea;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1 style="margin: 0; font-size: 32px;">🙏 Weekly Prayer Digest</h1>
    <p style="margin: 10px 0 0 0; opacity: 0.9;">Join us in praying for our church family</p>
  </div>

  <div class="content">
    ${recipientName ? `<p style="font-size: 18px; margin-top: 0;">Dear ${recipientName},</p>` : ''}

    <p>
      This week, our church family has shared these prayer requests.
      We invite you to join us in lifting them up to our loving Father.
    </p>

    ${prayerRequests.map(prayer => `
      <div class="prayer-item">
        <div class="prayer-name">${prayer.name}</div>
        <div class="prayer-text">${prayer.request}</div>
        <div class="prayer-count">🙏 ${prayer.prayerCount} people praying</div>
      </div>
    `).join('')}

    <p style="text-align: center; margin: 40px 0 30px 0;">
      <a href="${prayerWallUrl}" class="button">Visit Prayer Wall</a>
    </p>

    <p style="font-style: italic; color: #666; text-align: center; margin-top: 40px;">
      "Do not be anxious about anything, but in every situation, by prayer and petition,
      with thanksgiving, present your requests to God."<br>
      <strong>- Philippians 4:6</strong>
    </p>

    <p style="margin-top: 40px; color: #666; text-align: center;">
      Blessings,<br>
      <strong>${churchName}</strong>
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
    <p>You're receiving this because you're subscribed to prayer updates.</p>
    <p>To unsubscribe, please contact us.</p>
  </div>
</body>
</html>
  `.trim();
};
