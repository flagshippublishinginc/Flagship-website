import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true},
      description: 'Small icon shown next to the label',
    }),
    defineField({
      name: 'hoverIcon',
      title: 'Hover Icon',
      type: 'image',
      options: {hotspot: true},
      description: 'Small icon shown next to the label when hovered',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional image for the menu item (e.g. for mega menus)',
    }),
    defineField({
      name: 'children',
      title: 'Children',
      type: 'array',
      of: [{type: 'navItem'}],
      description: 'Nested navigation items (dropdown menu)',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      media: 'icon',
    },
  },
})
