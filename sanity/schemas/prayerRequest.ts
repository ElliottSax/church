import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'request',
      title: 'Prayer Request',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'isPublic',
      title: 'Display on Prayer Wall',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Display',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'prayerCount',
      title: 'Prayer Count',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      request: 'request',
      date: 'submittedAt',
    },
    prepare(selection) {
      const { name, request, date } = selection;
      return {
        title: name,
        subtitle: `${request.substring(0, 60)}... - ${date ? new Date(date).toLocaleDateString() : ''}`,
      };
    },
  },
});
