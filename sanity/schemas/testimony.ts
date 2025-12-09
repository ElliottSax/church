import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimony',
  title: 'Testimonies',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'Use "Anonymous" if the person prefers to remain unnamed',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Salvation', value: 'salvation' },
          { title: 'Healing', value: 'healing' },
          { title: 'Deliverance', value: 'deliverance' },
          { title: 'Provision', value: 'provision' },
          { title: 'Answered Prayer', value: 'answered_prayer' },
          { title: 'Life Change', value: 'life_change' },
          { title: 'Ministry Impact', value: 'ministry' },
          { title: 'Baptism', value: 'baptism' },
          { title: 'Faith Journey', value: 'faith_journey' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When did this testimony occur or when was it shared?',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Brief Summary',
      type: 'text',
      rows: 2,
      validation: (rule) => rule.required().max(200),
      description: 'A brief summary (max 200 characters) for preview',
    }),
    defineField({
      name: 'fullTestimony',
      title: 'Full Testimony',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Testimony URL',
      type: 'url',
      description: 'YouTube or Vimeo URL if testimony was recorded',
    }),
    defineField({
      name: 'audioUrl',
      title: 'Audio Testimony URL',
      type: 'url',
      description: 'Audio recording URL if available',
    }),
    defineField({
      name: 'scriptureReferences',
      title: 'Related Scripture',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Scripture verses related to this testimony',
    }),
    defineField({
      name: 'isAnonymous',
      title: 'Anonymous Testimony',
      type: 'boolean',
      description: 'Hide the person\'s name when displaying',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimony',
      type: 'boolean',
      description: 'Show this testimony prominently',
      initialValue: false,
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Publication',
      type: 'boolean',
      description: 'Has this testimony been approved for public display?',
      initialValue: false,
    }),
    defineField({
      name: 'consent',
      title: 'Publication Consent',
      type: 'object',
      fields: [
        {
          name: 'hasConsent',
          title: 'Has Given Consent',
          type: 'boolean',
          validation: (rule) => rule.required(),
        },
        {
          name: 'consentDate',
          title: 'Consent Date',
          type: 'date',
        },
        {
          name: 'consentNotes',
          title: 'Consent Notes',
          type: 'text',
          rows: 2,
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      approved: 'approved',
      featured: 'featured',
    },
    prepare(selection) {
      const { title, subtitle, media, approved, featured } = selection;
      return {
        title: `${featured ? '⭐ ' : ''}${approved ? '' : '⏳ '}${title}`,
        subtitle: subtitle.replace('_', ' ').toUpperCase(),
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Date (Newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'date', direction: 'desc' },
      ],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
});