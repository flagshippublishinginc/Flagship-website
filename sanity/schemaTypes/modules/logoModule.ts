import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'logosModule',
  title: 'Logo Wall',
  type: 'object',
  fields: [
    defineField({
      name: 'logos',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Logos'
    })
  ]
  ,
  preview: {
    select: { media: 'logos.0' },
    prepare({ media }) {
      return { title: 'Logo Wall', subtitle: media ? 'Logos' : 'No logos', media }
    }
  }
})
