import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBannerModule',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({name: 'text', type: 'string', title: 'Banner Text'}),
    defineField({name: 'ctaText', type: 'string', title: 'CTA Text'}),
    defineField({name: 'ctaLink', type: 'url', title: 'CTA Link'}),
  ]
  ,
  preview: {
    select: { title: 'text', subtitle: 'ctaText' },
    prepare({ title, subtitle }) {
      return { title: title || 'CTA Banner', subtitle: subtitle ? `CTA: ${subtitle}` : undefined }
    }
  }
})
