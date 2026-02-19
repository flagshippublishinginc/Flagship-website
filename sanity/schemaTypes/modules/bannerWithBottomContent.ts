import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bannerWithBottomContent',
  type: 'object',
  title: 'Banner With Bottom Content',
  fieldsets: [
    {
      name: 'buttonSettings',
      title: 'Button Settings',
    },
    {
      name: 'bottomContentSettings',
      title: 'Bottom Content Settings',
    },
  ],

  fields: [
    defineField({
      name: 'topTextContent',
      type: 'richTextModule',
      title: 'Top Text Content',
    }),

    defineField({
      name: 'addButton',
      type: 'boolean',
      title: 'Add Button',
      initialValue: false,
    }),

    defineField({
      name: 'buttonText',
      type: 'string',
      title: 'Button Text',
      fieldset: 'buttonSettings',
      hidden: ({parent}) => !parent?.addButton,
    }),
    defineField({
      name: 'buttonLink',
      type: 'string',
      title: 'Button Link',
      fieldset: 'buttonSettings',
      hidden: ({parent}) => !parent?.addButton,
    }),
    defineField({
      name: 'buttonAlignment',
      type: 'string',
      title: 'Button Alignment',
      initialValue: 'center',
      fieldset: 'buttonSettings',
      hidden: ({parent}) => !parent?.addButton,
      options: {
        list: [
          {value: 'left', title: 'Left'},
          {value: 'center', title: 'Center'},
          {value: 'right', title: 'Right'},
        ],
      },
    }),

    defineField({
      name: 'addBottomContent',
      type: 'boolean',
      title: 'Add Bottom Content',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
    }),
    defineField({
      name: 'imageAlt',
      type: 'string',
      title: 'Image Alt Text',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
    }),
    defineField({
      name: 'textContent',
      type: 'text',
      title: 'Text Content',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
    }),
    defineField({
      name: 'textBackgroundColor',
      type: 'string',
      title: 'Text Background Color - Example :- #FFFFFF',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
    }),
    defineField({
      name: 'textColor',
      type: 'string',
      title: 'Text Color - Example :- #010101',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
    }),
    defineField({
      name: 'contentMaxWidth',
      type: 'number',
      title: 'Content Max Width (px)',
      fieldset: 'bottomContentSettings',
      hidden: ({parent}) => !parent?.addBottomContent,
      initialValue: 704,
    }),
  ],
  preview: {
    select: {
      topTextContent: 'topTextContent',
    },
    prepare(selection) {
      const {topTextContent} = selection

      let title = 'Banner With Bottom Content'

      if (Array.isArray(topTextContent)) {
        const firstBlock = topTextContent.find((block) => block?._type === 'block')

        if (firstBlock?.children?.length) {
          title = firstBlock.children
            .map((child: any) => child.text)
            .join('')
            .slice(0, 60)
        }
      }

      return {
        title,
        subtitle: 'Banner Module',
      }
    },
  },
})
