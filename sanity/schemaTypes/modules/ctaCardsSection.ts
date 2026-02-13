import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'ctaCardsSection',
  title: 'CTA Cards Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    }),
    defineField({
      name: 'titleTextAlignment',
      title: 'Title Text Alignment',
      type: 'string',
      initialValue: 'left',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Center', value: 'center'},
          {title: 'Right', value: 'right'},
        ],
      },
    }),
    defineField({
      name: 'ctaCards',
      title: 'CTA Cards',
      type: 'array',
      of: [
        defineField({
          name: 'ctaCard',
          title: 'CTA Card',
          type: 'object',
          fields: [
            defineField({
              name: 'link',
              title: 'Link',
              type: 'link',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'link.label',
              subtitle: 'description',
            },
            prepare: ({title, subtitle}) => ({
              title: title || 'Untitled',
              subtitle: subtitle || 'No description',
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'highlightedText',
    },
    prepare: ({title, subtitle}) => ({
      title: `CTA Cards Section`,
      subtitle: `${title} ${subtitle}`,
    }),
  },
})
