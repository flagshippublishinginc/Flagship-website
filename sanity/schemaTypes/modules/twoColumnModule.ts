import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'twoColumnModule',
  title: 'Two Column Section',
  type: 'object',
  fields: [
    defineField({
      name: 'leftContent',
      type: 'array',
      title: 'Left Column Content',
      of: [{type: 'block'}]
    }),
    defineField({
      name: 'rightImage',
      type: 'image',
      title: 'Right Image',
      options: {hotspot: true}
    })
  ],
  preview: {
    select: { title: 'leftContent.0', media: 'rightImage' },
    prepare({ title, media }) {
      let t = 'Two Column'
      if (title && title.children && title.children[0]) t = (title.children[0].text || t).slice(0, 60)
      return { title: t, media }
    }
  }
})
