// schemas/documents/page.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', validation: Rule => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({ 
      name: 'modules', 
      title: 'Page Modules', 
      type: 'array', 
      of: [ 
        {type: 'heroModule'}, 
        {type: 'featuredCardsModule'}, 
        {type: 'richTextModule'}, 
        {type: 'imageGalleryModule'}, 
        {type: 'ctaBannerModule'}, 
        {type: 'testimonialModule'}, 
        {type: 'faqModule'}, 
        {type: 'statsModule'}, 
        {type: 'logosModule'}, 
        {type: 'twoColumnModule'}
      ],
      options: { modal: { type: 'dialog' } }
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ],
  preview: {
    select: { title: 'title' },
    prepare({ title }) { return { title } }
  }
})
