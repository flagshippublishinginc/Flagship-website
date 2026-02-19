import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerModule',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [{ type: 'link' }]
    }),
    defineField({
      name: 'readerServices',
      title: 'Reader Services',
      type: 'array',
      of: [{ type: 'link' }]
    }),
    defineField({
      name: 'newsletterTitle',
      title: 'Newsletter Title',
      type: 'string',
      initialValue: 'Subscribe to the MNKO Newsletter'
    }),
    defineField({
      name: 'newsletterDescription',
      title: 'Newsletter Description',
      type: 'string',
      initialValue: "Stories, culture, and island life from Maui's magazine"
    }),
    // defineField({
    //   name: 'newsletterPlaceholder',
    //   title: 'Newsletter Placeholder',
    //   type: 'string',
    //   initialValue: 'Enter your email address'
    // }),
    // defineField({
    //   name: 'newsletterButtonText',
    //   title: 'Newsletter Button Text',
    //   type: 'string',
    //   initialValue: 'Subscribe Now'
    // }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'icon',
            title: 'Icon',
            type: 'image',
            options: { hotspot: true }
          },
          { name: 'url', title: 'URL', type: 'url' }
        ],
        preview: {
          select: { title: 'url', media: 'icon' }
        }
      }]
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links (Bottom)',
      type: 'array',
      of: [{ type: 'link' }]
    }),
    defineField({ name: 'copyright', title: 'Copyright text', type: 'string' })
  ]
})
