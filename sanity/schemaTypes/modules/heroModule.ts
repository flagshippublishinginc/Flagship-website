import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'heroModule',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Heading' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subheading' }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: { hotspot: true }
    }),
    defineField({ name: 'ctaText', type: 'string', title: 'CTA Text' }),
    defineField({ name: 'ctaLink', type: 'url', title: 'CTA Link' })
  ]
  ,
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'backgroundImage'
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero',
        subtitle: subtitle ? subtitle.slice(0, 60) : 'Hero section',
        media
      }
    }
  }
})
