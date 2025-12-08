// schemas/documents/homePage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Home' }),
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
      ] 
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ],
  preview: {
    select: { title: 'title' }
  }
})
