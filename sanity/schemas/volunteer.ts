import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'volunteer',
  title: 'Volunteer Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Worship', value: 'worship' },
          { title: 'Youth & Children', value: 'youth' },
          { title: 'Community Service', value: 'service' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Administration', value: 'admin' },
          { title: 'Facilities', value: 'facilities' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'commitment',
      title: 'Time Commitment',
      type: 'string',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      active: 'active',
    },
    prepare(selection) {
      const { title, category, active } = selection;
      return {
        title,
        subtitle: `${category} - ${active ? 'Active' : 'Inactive'}`,
      };
    },
  },
});
