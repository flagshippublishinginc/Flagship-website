// schemas/documents/blogListingPage.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'blogListingPage',
  title: 'Blog Listing Page',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'titleHighlight', type: 'string'}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => {
          const title = doc.title || ''
          const highlight = doc.titleHighlight || ''

          // Combine both with a space
          return `${title} ${highlight}`.trim()
        },
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            // normalize accented characters
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            // remove smart quotes & apostrophes
            .replace(/[’'ʻ"]/g, '')
            // replace non-alphanumeric with hyphens
            .replace(/[^a-z0-9]+/g, '-')
            // trim hyphens
            .replace(/^-+|-+$/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{type: 'site'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'description', type: 'text'}),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
})
