// schemas/documents/post.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      readOnly: false,
      options: {
        source: 'title',
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
    }),
    defineField({
      name: 'selectBlog',
      type: 'reference',
      to: [{ type: 'blogListingPage' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'coverImage', type: 'image' }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related posts (manual)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author.name' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    },
  },
})
