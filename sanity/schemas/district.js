import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'district',
  title: 'District',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'District Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'District Image',
      type: 'image',
    },
  ],
})
