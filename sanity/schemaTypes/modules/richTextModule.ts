import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'richTextModule',
  title: 'Rich Text Module',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'object',
                options: {
                  modal: 'popover', // 🔥 THIS IS THE KEY
                },
                fields: [
                  {
                    name: 'color',
                    title: 'HEX Color',
                    type: 'string',
                    description: 'Example: #FF5733',
                    validation: (Rule) =>
                      Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/).error(
                        'Enter a valid HEX color',
                      ),
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
})
