import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'collections',
  title: 'collections',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'titleHighlight', type: 'string'}),
    defineField({
      name: 'description',
      type: 'richTextModule',
    }),
    defineField({
      name: 'contentAlignment',
      type: 'string',
      title: 'Content Alignment',
      initialValue: 'left',
      options: {
        list: [
          {value: 'left', title: 'Left'},
          {value: 'center', title: 'Center'},
          {value: 'right', title: 'Right'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'moduleBuilder',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'site'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title}
    },
  },
})
