// schemas/documents/post.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'excerpt', type: 'text' }),
    defineField({ name: 'coverImage', type: 'image' }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
    defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'relatedPosts', title: 'Related posts (manual)', type: 'array', of: [{ type: 'reference', to: [{ type: 'post' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' })
  ],
  preview: {
    select: { title: 'title', subtitle: 'author.name' },
    prepare({ title, subtitle }) { return { title, subtitle } }
  }
})
