import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'headerModule',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      of: [{ type: 'navItem' }]
    }),
    defineField({ name: 'ctaText', title: 'CTA text', type: 'string' }),
    defineField({ name: 'ctaUrl', title: 'CTA URL', type: 'url' })
  ]
})
