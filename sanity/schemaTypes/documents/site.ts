import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (Domain ID)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Used to identify the site (e.g. "site-1" or "flagship").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'domain',
      title: 'Domain',
      type: 'url',
      description: 'The full URL of the website (e.g. https://www.example.com)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'theme',
      title: 'Theme Settings',
      type: 'reference',
      to: [{type: 'themeSettings'}],
      description: 'Select the theme settings for this site.',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'headerModule',
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footerModule',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'domain',
      media: 'logo',
    },
  },
})
