// schemas/documents/testimonial.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'author', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'content', type: 'text' }),
    defineField({ name: 'photo', type: 'image' })
  ],
  preview: {
    select: { title: 'author', subtitle: 'role', media: 'photo' }
  }
})
