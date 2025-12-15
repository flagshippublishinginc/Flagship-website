// schemas/documents/blogListingPage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'blogListingPage',
  title: 'Blog Listing Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'description', type: 'text' }),
    defineField({
      name: 'modules',
      title: 'Page Modules',
      type: 'array',
      of: [
        { type: 'heroModule' },
        { type: 'featuredCardsModule' },
        { type: 'richTextModule' },
        { type: 'imageGalleryModule' },
        { type: 'ctaBannerModule' },
        { type: 'testimonialModule' },
        { type: 'faqModule' },
        { type: 'statsModule' },
        { type: 'logosModule' },
        { type: 'twoColumnModule' }
      ]
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})
