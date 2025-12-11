import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'featuredCardsModule',
  title: 'Featured Cards',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Section Heading'
    }),
    defineField({
      name: 'cards',
      type: 'array',
      title: 'Cards',
      of: [{
        type: 'object',
        fields: [
          {name: 'title', type: 'string', title: 'Title'},
          {name: 'description', type: 'text', title: 'Description'},
          {name: 'icon', type: 'image', title: 'Icon', options: {hotspot: true}},
        ]
      }]
    })
  ]
  ,
  preview: {
    select: {
      title: 'heading',
      media: 'cards.0.icon'
    },
    prepare({title, media}) {
      return {
        title: title || 'Featured Cards',
        subtitle: 'Cards: ' + (media ? '' : ''),
        media
      }
    }
  }
})
