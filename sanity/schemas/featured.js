import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'featured',
  title: 'Featured attractions categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: "Featured Category name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: "Short description",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'attractions',
      type: 'array',
      title: "Attractions",
      of:[{type:"reference", to:[{type:"attraction"}]}],
    },
  ],
})
