// schemas/documents/teamPage.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'members',
      title: 'Team Members (ordered)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }]
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
      ] 
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ]
})
