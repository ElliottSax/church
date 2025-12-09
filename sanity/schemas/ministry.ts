import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ministry',
  title: 'Ministries & Programs',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ministry Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Children', value: 'children' },
          { title: 'Youth', value: 'youth' },
          { title: 'Young Adults', value: 'young_adults' },
          { title: 'Men', value: 'mens' },
          { title: 'Women', value: 'womens' },
          { title: 'Seniors', value: 'seniors' },
          { title: 'Worship & Arts', value: 'worship' },
          { title: 'Outreach & Missions', value: 'outreach' },
          { title: 'Education', value: 'education' },
          { title: 'Small Groups', value: 'small_groups' },
          { title: 'Support & Recovery', value: 'support' },
          { title: 'Prayer', value: 'prayer' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'image',
      title: 'Ministry Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Wide banner image for ministry page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'leaders',
      title: 'Ministry Leaders',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'staff' }],
        },
      ],
    }),
    defineField({
      name: 'meetingSchedule',
      title: 'Meeting Schedule',
      type: 'object',
      fields: [
        {
          name: 'day',
          title: 'Day of Week',
          type: 'string',
          options: {
            list: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
          },
        },
        {
          name: 'time',
          title: 'Time',
          type: 'string',
          description: 'e.g., "7:00 PM"',
        },
        {
          name: 'frequency',
          title: 'Frequency',
          type: 'string',
          options: {
            list: [
              { title: 'Weekly', value: 'weekly' },
              { title: 'Bi-weekly', value: 'biweekly' },
              { title: 'Monthly', value: 'monthly' },
              { title: 'First Sunday', value: 'first_sunday' },
              { title: 'Last Sunday', value: 'last_sunday' },
              { title: 'As Announced', value: 'as_announced' },
            ],
          },
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'ageRange',
      title: 'Age Range',
      type: 'object',
      fields: [
        { name: 'min', title: 'Minimum Age', type: 'number' },
        { name: 'max', title: 'Maximum Age', type: 'number' },
      ],
      description: 'Leave empty if no age restrictions',
    }),
    defineField({
      name: 'registrationRequired',
      title: 'Registration Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      hidden: ({ parent }) => !parent?.registrationRequired,
    }),
    defineField({
      name: 'cost',
      title: 'Cost/Fees',
      type: 'string',
      description: 'e.g., "Free", "$10/month", "$50/semester"',
    }),
    defineField({
      name: 'activities',
      title: 'Activities & Programs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Activity Name', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
            { name: 'schedule', title: 'Schedule', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'resources',
      title: 'Ministry Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Resource Title', type: 'string' },
            { name: 'type', title: 'Type', type: 'string' },
            { name: 'file', title: 'File', type: 'file' },
            { name: 'url', title: 'External URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook Group URL', type: 'url' },
        { name: 'instagram', title: 'Instagram Handle', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp Group Link', type: 'url' },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', title: 'Caption', type: 'string' },
            { name: 'alt', title: 'Alt Text', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'testimony' }],
        },
      ],
    }),
    defineField({
      name: 'upcomingEvents',
      title: 'Upcoming Events',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'event' }],
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Is this ministry currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Ministry',
      type: 'boolean',
      description: 'Show this ministry prominently on the homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      isActive: 'isActive',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, isActive, featured } = selection;
      return {
        title: `${featured ? '⭐ ' : ''}${!isActive ? '⏸️ ' : ''}${title}`,
        subtitle: subtitle.replace('_', ' ').toUpperCase(),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
});