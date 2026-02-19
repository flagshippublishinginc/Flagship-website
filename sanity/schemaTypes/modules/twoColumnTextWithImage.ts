import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'twoColumnTextWithImage',
  title: 'Two Column Text With Image',
  type: 'object',
  fields: [
    defineField({
      name: 'textColumn',
      title: 'Text Column',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
    }),
    defineField({
      name: 'imageAltText',
      title: 'Image Alt Text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'textColumn',
      media: 'image',
    },
    prepare({title, media}) {
      const firstBlock = Array.isArray(title) && title.find(Boolean)
      const titleText =
        firstBlock && firstBlock.children && firstBlock.children[0] && firstBlock.children[0].text
      return {title: titleText ? titleText.slice(0, 60) : 'Two Column Text With Image', media}
    },
  },
})
