import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'coverageOverview',
  title: 'Coverage Overview',
  type: 'object',

  fieldsets: [
    {
      name: 'leftColumnContent',
      title: 'Left Column Content',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'rightColumnContent',
      title: 'Right Column Content',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],

  fields: [
    // ---------- LEFT COLUMN ----------
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      fieldset: 'leftColumnContent',
    }),
    defineField({
      name: 'headingBackgroundColor',
      title: 'Heading Background Color',
      type: 'string',
      description: 'Enter Hex Code',
      fieldset: 'leftColumnContent',
    }),
    defineField({
      name: 'headingColor',
      title: 'Heading Color',
      type: 'string',
      description: 'Enter Hex Code',
      fieldset: 'leftColumnContent',
    }),

    defineField({
      name: 'title',
      title: 'Title Text',
      type: 'string',
      fieldset: 'rightColumnContent',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Title Highlight',
      type: 'string',
      fieldset: 'rightColumnContent',
    }),

    defineField({
      name: 'listItems',
      title: 'List Items',
      type: 'array',
      fieldset: 'rightColumnContent',
      of: [
        defineField({
          name: 'listItem',
          title: 'List Item',
          type: 'object',
          fields: [
            defineField({
              name: 'iconImage',
              title: 'Icon Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'text',
              title: 'Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      headingText: 'title',
      headingHighlight: 'titleHighlight',
    },
    prepare({headingText, headingHighlight}) {
      return {
        title: `${headingText || ''} ${headingHighlight || ''}`.trim(),
      }
    },
  },
})
