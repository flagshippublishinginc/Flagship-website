import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',

  fields: [
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'site'}],
      validation: (Rule) => Rule.required(),
    }),
  ],

  preview: {
    select: {
      title: 'site.title',
      media: 'site.logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'Settings',
        media,
      }
    },
  },
})
