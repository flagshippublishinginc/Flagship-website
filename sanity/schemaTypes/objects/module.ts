// schemas/objects/module.ts
import { defineType } from 'sanity'

export default defineType({
  name: 'moduleBuilder',
  title: 'Page Modules',
  type: 'array',
  of: [
    { type: 'heroModule' },
    { type: 'homeBannerModule' },
    { type: 'ctaBannerModule' },
    { type: 'faqModule' },
    { type: 'featuredCardsModule' },
    { type: 'imageGalleryModule' },
    { type: 'logosModule' },
    { type: 'richTextModule' },
    { type: 'statsModule' },
    { type: 'testimonialModule' },
    { type: 'twoColumnModule' }
  ]
})
