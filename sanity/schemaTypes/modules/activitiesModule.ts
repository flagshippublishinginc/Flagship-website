import { defineType, defineField } from 'sanity'
import MaxItemsArrayInput from '../../components/MaxItemsArrayInput'

export default defineType({
  name: 'activitiesModule',
  title: 'Activities Section',
  type: 'object',
  fieldsets: [
    {
      name: 'sectionHeading',
      title: 'Section Heading',
      options: { columns: 2 }
    }
  ],
  fields: [
    defineField({
      name: 'headingText',
      type: 'string',
      title: 'Normal Text',
      description: 'First part of the section heading',
      fieldset: 'sectionHeading'
    }),
    defineField({
      name: 'headingHighlight',
      type: 'string',
      title: 'Highlighted Text',
      description: 'Second part of the heading (styled/highlighted)',
      fieldset: 'sectionHeading'
    }),

    // Lead (left) article
    defineField({
      name: 'leadArticle',
      type: 'object',
      title: 'Lead Article (Left)',
      fields: [
        { name: 'title', type: 'string', title: 'Article Title' },
        { name: 'description', type: 'text', title: 'Article Description' },
        { name: 'image', type: 'image', title: 'Featured Image', options: { hotspot: true } },
        { name: 'readLink', type: 'url', title: 'Read Story Link' }
      ]
    }),

    // Sidebar articles (right) - max 3
    defineField({
      name: 'sidebarArticles',
      type: 'array',
      title: 'Sidebar Articles (Right)',
      description: 'Add up to 3 sidebar articles displayed on the right',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Article Title' },
            { name: 'description', type: 'text', title: 'Article Description' },
            { name: 'image', type: 'image', title: 'Thumbnail Image', options: { hotspot: true } },
            { name: 'readLink', type: 'url', title: 'Read Story Link' }
          ]
        }
      ],
      validation: (Rule) => Rule.max(3),
      // Use a custom input component which disables the add button when max is reached
      components: {
        input: MaxItemsArrayInput
      },
      // provide the max to the component via options so it's configurable
      // Cast to `any` because Sanity's TypeScript typings don't include custom props here
      options: ({ maxItems: 3 } as any)
    })
  ],

  preview: {
    select: {
      headingText: 'headingText',
      headingHighlight: 'headingHighlight',
      media: 'leadArticle.image'
    },
    prepare({ headingText, headingHighlight, media }) {
      const title = `${headingText || ''} ${headingHighlight || ''}`.trim()
      return {
        title: title || 'Activities Section',
        subtitle: 'Lead + sidebar articles',
        media
      }
    }
  }
})
