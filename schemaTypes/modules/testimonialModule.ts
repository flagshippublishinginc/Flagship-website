import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'testimonialModule',
  title: 'Testimonials',
  type: 'object',
  fields: [
    defineField({
      name: 'testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'name', type: 'string', title: 'Name'},
          {name: 'role', type: 'string', title: 'Role'},
          {name: 'quote', type: 'text', title: 'Quote'},
          {name: 'avatar', type: 'image', title: 'Avatar', options: {hotspot: true}}
        ]
      }]
    })
  ]
  ,
  preview: {
    select: { title: 'testimonials.0.name', subtitle: 'testimonials.0.role', media: 'testimonials.0.avatar' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Testimonials', subtitle, media }
    }
  }
})
