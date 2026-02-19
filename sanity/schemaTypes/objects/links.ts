// schemas/objects/link.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', type: 'string'}),
    defineField({
      name: 'type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
      },
    }),
    defineField({
      name: 'internal',
      title: 'Internal link',
      type: 'reference',
      to: [{type: 'page'}, {type: 'post'}],
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
    }),
  ],
  preview: {
    select: {title: 'label'},
    prepare({title}) {
      return {title}
    },
  },
})
