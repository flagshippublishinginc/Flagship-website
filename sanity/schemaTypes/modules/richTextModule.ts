// richTextModule.ts  (or wherever your block is defined)
import {BoldIcon, ItalicIcon, UnderlineIcon, LinkIcon, ColorWheelIcon} from '@sanity/icons'
import {defineArrayMember, defineType} from 'sanity'

export default defineType({
  name: 'richTextModule',
  title: 'Rich Text',
  type: 'object',
  fields: [
    {
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong', icon: BoldIcon},
              {title: 'Italic', value: 'em', icon: ItalicIcon},
              {title: 'Underline', value: 'underline', icon: UnderlineIcon},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                icon: LinkIcon, // or whatever icon you're using
                fields: [
                  {
                    name: 'href',
                    title: 'URL / Email / Phone',
                    type: 'url',
                    description:
                      'Examples:\n• https://example.com\n• mailto:hello@company.com\n• tel:+911234567890',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }).error(
                        'Please enter a valid web URL, email (mailto:), or phone (tel:) link',
                      ),
                  },
                  {
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                    description: 'Recommended for external websites (not for mailto/tel)',
                  },
                ],
              },
              {
                name: 'textColor',
                title: 'Color',
                type: 'object',
                icon: ColorWheelIcon,
                options: {modal: 'popover'},
                fields: [
                  {
                    name: 'color',
                    type: 'string',
                    title: 'HEX',
                    validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/),
                  },
                ],
              },
              {
                name: 'alignment',
                title: 'Alignment',
                type: 'object',
                options: {modal: 'popover'},
                fields: [
                  {
                    name: 'align',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'Left', value: 'left'},
                        {title: 'Center', value: 'center'},
                        {title: 'Right', value: 'right'},
                        {title: 'Justify', value: 'justify'},
                      ],
                      layout: 'radioHorizontal',
                    },
                    initialValue: 'left',
                  },
                ],
              },
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Number', value: 'number'},
          ],
        }),
      ],
    },
  ],
})
