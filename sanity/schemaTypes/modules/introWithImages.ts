import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'introWithImages',
  title: 'Intro With Images',
  type: 'object',
  fieldsets: [
    {
      name: 'buttonSettings',
      title: 'Button Settings',
    },
  ],
  fields: [
    defineField({
      name: 'headingText',
      title: 'Heading Text',
      type: 'string',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
    }),
    defineField({
      name: 'textContent',
      title: 'Text Content',
      type: 'richTextModule',
    }),
    defineField({
      name: 'addButton',
      type: 'boolean',
      title: 'Add Button',
      initialValue: false,
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      fieldset: 'buttonSettings',
      hidden: ({parent}) => !parent?.addButton,
    }),
    defineField({
      name: 'buttonLink',
      type: 'string',
      title: 'Button Link',
      fieldset: 'buttonSettings',
      hidden: ({parent}) => !parent?.addButton,
    }),
    defineField({
      name: 'addImages',
      title: 'Image',
      type: 'array',
      of: [
        defineField({
          name: 'imageItem',
          title: 'Image Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      headingText: 'headingText',
      headingHighlight: 'headingHighlight',
    },
    prepare({headingText, headingHighlight}) {
      const title = `${headingText || ''} ${headingHighlight || ''}`.trim()
      return {
        title: title,
      }
    },
  },
})
