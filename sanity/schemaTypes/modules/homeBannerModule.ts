import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeBannerModule',
  title: 'Home Banner',
  type: 'object',
  fieldsets: [
    {
      name: 'authorGroup',
      title: 'Author',
      options: { columns: 2 },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'authorPrefix',
      title: 'Author Prefix',
      type: 'string',
      fieldset: 'authorGroup',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      fieldset: 'authorGroup',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Hero',
        subtitle: subtitle ? subtitle.slice(0, 60) : 'Hero section',
        media,
      }
    },
  },
})
