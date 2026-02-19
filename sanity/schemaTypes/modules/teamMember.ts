import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'teamMembers',
  title: 'Team Members',
  type: 'object',
  fields: [
    defineField({
      name: 'headingHighlight',
      type: 'string',
      title: 'Highlighted Text',
    }),
    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
    }),
    defineField({
      name: 'teamMembers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'designation',
              type: 'string',
              title: 'Designation',
            }),
            defineField({
              name: 'name',
              type: 'string',
              title: 'Name',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {media: 'image', heading: 'heading', headingHighlight: 'headingHighlight'},
    prepare({media, heading, headingHighlight}) {
      return {title: 'Team Member', subtitle: headingHighlight + ' ' + heading, media}
    },
  },
})
