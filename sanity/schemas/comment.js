import {defineField, defineType} from 'sanity'

export default defineType({
  title: 'Comment',
  name: 'comment',
  type: 'document',
  fields: [
    {
      title: 'Username',
      name: 'username',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Header',
      name: 'header',
      type: 'image',
    },
    {
      title: 'Attraction',
      name: 'attraction',
      type: 'reference',
      to: [{type: 'attraction'}],
    },
    {
      title: 'Rating (1-5 Stars)',
      name: 'rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).error('Rating must be between 1 and 5'),
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Comment Date',
      name: 'commentDate',
      type: 'date',
      options: {
        dateFormat: 'MMM YYYY',
      },
    },
    {
      title: 'Content',
      name: 'content',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
})
