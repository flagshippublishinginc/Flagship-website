// schemas/documents/settings.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteTitle', type: 'string'}),
    defineField({name: 'logo', type: 'image'}),
    defineField({name: 'favicon', type: 'image'}),
    defineField({name: 'header', title: 'Header', type: 'headerModule'}),
    defineField({name: 'footer', title: 'Footer', type: 'footerModule'}),
    defineField({name: 'seo', title: 'Default SEO', type: 'seo'}),
  ],
  preview: {select: {title: 'siteTitle'}},
})
