import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'miniGallery',
  title: 'Mini Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'highlightedHeadingText',
      title: 'Highlighted Heading Text',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      validation: (Rule) => Rule.required().max(4).error('You can add a maximum of 4 images'),
      of: [
        defineField({
          name: 'images',
          title: 'Images',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      heading: 'heading',
      highlight: 'highlightedHeadingText',
      images: 'images',
    },
    prepare({heading, highlight, images}) {
      return {
        title: `${heading || 'Mini Gallery'} ${highlight || ''}`.trim(),
        media: images?.[0]?.image,
      }
    },
  },
})
