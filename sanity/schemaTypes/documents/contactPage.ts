// schemas/documents/contactPage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'Contact' }),
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
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
    defineField({ name: 'email', title: 'Contact Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Contact Phone', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'text' })
  ]
})
