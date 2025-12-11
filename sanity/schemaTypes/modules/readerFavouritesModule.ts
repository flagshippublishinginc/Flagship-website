import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'readerFavourites',
  title: 'Reader Favourites',
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
      description: 'e.g., "Reader"',
      fieldset: 'sectionHeading'
    }),
    defineField({
      name: 'headingHighlight',
      type: 'string',
      title: 'Highlighted Text',
      description: 'e.g., "Favourites" (will be styled differently)',
      fieldset: 'sectionHeading'
    }),
    defineField({
      name: 'articles',
      type: 'array',
      title: 'Featured Articles',
      description: 'Add up to 3 favourite articles to display',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Article Title'
            },
            {
              name: 'description',
              type: 'text',
              title: 'Article Description',
              description: 'Brief summary of the article'
            },
            {
              name: 'image',
              type: 'image',
              title: 'Featured Image',
              options: { hotspot: true }
            },
            {
              name: 'category',
              type: 'string',
              title: 'Category Label',
              description: 'e.g., "MAGAZINES", "TRAVEL", etc.'
            },
            {
              name: 'publishDate',
              type: 'date',
              title: 'Publish Date',
              description: 'Will display as "6 NOV 2025" in the UI'
            },
            {
              name: 'author',
              type: 'string',
              title: 'Author Name',
              description: 'e.g., "LISA TRUESDALE"'
            },
            {
              name: 'readText',
              type: 'string',
              title: 'Read Text',
              description: 'e.g., "Read Story"'
            },
            {
              name: 'readLink',
              type: 'url',
              title: 'Read Story Link',
              description: 'Link to the full article'
            }
          ]
        }
      ]
    })
  ],
  preview: {
    select: {
      headingText: 'headingText',
      headingHighlight: 'headingHighlight',
      media: 'articles.0.image'
    },
    prepare({ headingText, headingHighlight, media }) {
      const title = `${headingText || ''} ${headingHighlight || ''}`.trim()
      return {
        title: title || 'Reader Favourites',
        subtitle: 'Featured articles section',
        media
      }
    }
  }
})
