import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerModule',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'columns',
      title: 'Footer columns',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Column title' },
          { name: 'links', type: 'array', title: 'Links', of: [{ type: 'link' }] }
        ]
      }]
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [{ type: 'link' }]
    }),
    defineField({ name: 'copyright', title: 'Copyright text', type: 'string' })
  ]
})
