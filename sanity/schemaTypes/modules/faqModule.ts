import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'faqModule',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'faqs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string', title: 'Question'},
          {name: 'answer', type: 'text', title: 'Answer'}
        ]
      }]
    })
  ]
  ,
  preview: {
    select: { count: 'faqs' },
    prepare({ count }) {
      const c = Array.isArray(count) ? count.length : 0
      return { title: 'FAQ', subtitle: `${c} items` }
    }
  }
})
