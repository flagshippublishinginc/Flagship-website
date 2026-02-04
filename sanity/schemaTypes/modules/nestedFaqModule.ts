import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nestedFaqModule',
  title: 'Nested FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'faqs',
      type: 'array',
      of: [
        defineField({
          name: 'faqItem',
          type: 'object',
          fields: [
            defineField({name: 'title', type: 'string', title: 'Title'}),
            defineField({
              name: 'faqs',
              type: 'array',
              of: [
                defineField({
                  name: 'faqItem',
                  type: 'object',
                  fields: [
                    defineField({name: 'question', type: 'string', title: 'Question'}),
                    defineField({name: 'answer', type: 'text', title: 'Answer'}),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'faqs[0].title',
      subtitle: 'faqs[0].faqs[0].question',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
})
