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
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[’'ʻ"]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
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
    defineField({ name: 'coverImage', type: 'image' }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        {
          type: 'richTextModule',
        },
        {
          type: 'singleImageModule',
        },
        {
          type: 'twoColumnTextWithImage',
        },
      ],
    }),

    defineField({
      name: 'loadMoreContent',
      type: 'array',
      of: [
        {
          type: 'richTextModule',
        },
        {
          type: 'singleImageModule',
        },
        {
          type: 'twoColumnTextWithImage',
        },
      ],
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
