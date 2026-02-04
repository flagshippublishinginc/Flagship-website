import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'simpleBanner',
  type: 'object',
  title: 'Simple Banner',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'titleHighlight', type: 'string'}),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Description',
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
    }),
    defineField({
      name: 'buttonLink',
      type: 'string',
      title: 'Button Link',
    }),
    defineField({
      name: 'contentAlignment',
      type: 'string',
      title: 'Content Alignment',
      initialValue: 'center',
      options: {
        list: [
          {value: 'left', title: 'Left'},
          {value: 'center', title: 'Center'},
          {value: 'right', title: 'Right'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title,
      }
    },
  },
})
