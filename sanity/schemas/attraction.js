import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'attraction',
  title: 'Attraction',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Rating (1-5 Stars)',
      validation: (Rule) => Rule.min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      name: 'district',
      title: 'District',
      type: 'reference',
      to: [{type: 'district'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'introduction',
      type: 'array',
      title: 'Introduction',
      of: [{type: 'string'}],
    },
    {
      name: 'comments',
      type: 'array',
      title: 'Comments',
      of: [
        {
          type: 'reference',
          to: [{type: 'comment'}],
        },
      ],
    },
  ],
})
