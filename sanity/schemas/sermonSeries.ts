import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sermonSeries',
  title: 'Sermon Series',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief overview of the sermon series',
    }),
    defineField({
      name: 'theme',
      title: 'Theme/Topic',
      type: 'string',
      options: {
        list: [
          { title: 'Faith & Belief', value: 'faith' },
          { title: 'Love & Relationships', value: 'love' },
          { title: 'Prayer & Worship', value: 'prayer' },
          { title: 'Service & Mission', value: 'service' },
          { title: 'Growth & Discipleship', value: 'growth' },
          { title: 'Hope & Healing', value: 'hope' },
          { title: 'Scripture Study', value: 'scripture' },
          { title: 'Seasonal', value: 'seasonal' },
          { title: 'Special Events', value: 'special' },
        ],
      },
    }),
    defineField({
      name: 'scriptureReference',
      title: 'Primary Scripture Reference',
      type: 'string',
      description: 'e.g., "John 3:16" or "Romans 8"',
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Series Artwork',
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
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      description: 'Wide banner image for series page',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'primarySpeaker',
      title: 'Primary Speaker',
      type: 'reference',
      to: [{ type: 'staff' }],
    }),
    defineField({
      name: 'sermons',
      title: 'Sermons in Series',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sermon' }],
        },
      ],
      description: 'Add sermons to this series in order',
    }),
    defineField({
      name: 'resources',
      title: 'Series Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Resource Title',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'type',
              title: 'Resource Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Study Guide', value: 'study_guide' },
                  { title: 'Discussion Questions', value: 'discussion' },
                  { title: 'Reading Plan', value: 'reading_plan' },
                  { title: 'Devotional', value: 'devotional' },
                  { title: 'Video', value: 'video' },
                  { title: 'Audio', value: 'audio' },
                  { title: 'PDF', value: 'pdf' },
                ],
              },
            },
            {
              name: 'file',
              title: 'File',
              type: 'file',
              description: 'Upload resource file',
            },
            {
              name: 'url',
              title: 'External URL',
              type: 'url',
              description: 'Or link to external resource',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'type',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'studyGuide',
      title: 'Study Guide Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      description: 'Optional study guide content for the series',
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
    defineField({
      name: 'featured',
      title: 'Featured Series',
      type: 'boolean',
      description: 'Show this series prominently on the website',
      initialValue: false,
    }),
    defineField({
      name: 'isActive',
      title: 'Currently Active',
      type: 'boolean',
      description: 'Is this the current sermon series?',
      initialValue: false,
    }),
    defineField({
      name: 'youtubePlaylistId',
      title: 'YouTube Playlist ID',
      type: 'string',
      description: 'ID of YouTube playlist containing series videos',
    }),
    defineField({
      name: 'spotifyPlaylistUrl',
      title: 'Spotify Playlist URL',
      type: 'url',
      description: 'Link to worship music playlist for this series',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'theme',
      media: 'image',
      startDate: 'startDate',
      isActive: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, media, startDate, isActive } = selection;
      return {
        title: `${isActive ? '🔴 ' : ''}${title}`,
        subtitle: `${subtitle || 'Series'} - ${new Date(startDate).toLocaleDateString()}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: 'Start Date (Newest)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
    {
      title: 'Start Date (Oldest)',
      name: 'startDateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});