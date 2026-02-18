import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactUsModule',
  type: 'object',
  fields: [
    // LEFT COLUMN
    defineField({
      name: 'leftColumnContent',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'topContent', type: 'richTextModule'}),
            defineField({name: 'bottomContent', type: 'richTextModule'}),

            // Social Links
            defineField({
              name: 'socialLinks',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({name: 'link', type: 'url'}),
                    defineField({name: 'icon', type: 'image'}),
                    defineField({name: 'altText', type: 'string'}),
                  ],
                  preview: {
                    select: {
                      title: 'altText',
                      media: 'icon',
                      subtitle: 'link',
                    },
                    prepare({title, media, subtitle}) {
                      return {
                        title: title || 'Social Link',
                        media,
                        subtitle,
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'Left Column Block',
            },
            prepare({title}) {
              return {
                title: title || 'Left Column Block',
              }
            },
          },
        },
      ],
    }),

    // RIGHT COLUMN
    defineField({
      name: 'rightColumnContent',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'formTitle', type: 'string'}),
            defineField({name: 'formDescription', type: 'string'}),
            defineField({name: 'formFields', type: 'formContent'}),
            defineField({name: 'formButtonText', type: 'string'}),
            defineField({
              name: 'bottomContent',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'contentItems',
                      title: 'Content Items',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'contentItem',
                          fields: [
                            defineField({name: 'iconImage', type: 'image'}),
                            defineField({name: 'title', type: 'string'}),

                            defineField({
                              name: 'rowContent',
                              type: 'array',
                              of: [
                                {
                                  type: 'object',
                                  fields: [
                                    defineField({
                                      name: 'contentType',
                                      type: 'string',
                                      options: {
                                        list: [
                                          {title: 'Text', value: 'text'},
                                          {title: 'Image', value: 'image'},
                                        ],
                                        layout: 'dropdown',
                                      },
                                    }),
                                    defineField({
                                      name: 'label',
                                      type: 'string',
                                      hidden: ({parent}) => parent?.contentType !== 'text',
                                    }),
                                    defineField({
                                      name: 'text',
                                      type: 'string',
                                      hidden: ({parent}) => parent?.contentType !== 'text',
                                    }),
                                    defineField({
                                      name: 'image',
                                      type: 'image',
                                      hidden: ({parent}) => parent?.contentType !== 'image',
                                    }),
                                    defineField({
                                      name: 'imageAltText',
                                      type: 'string',
                                      hidden: ({parent}) => parent?.contentType !== 'image',
                                    }),
                                  ],
                                  preview: {
                                    select: {
                                      title: 'contentType',
                                    },
                                    prepare({title}) {
                                      return {
                                        title:
                                          title === 'text'
                                            ? 'Text Content'
                                            : title === 'image'
                                              ? 'Image Content'
                                              : 'Row Content',
                                      }
                                    },
                                  },
                                },
                              ],
                            }),
                          ],
                          preview: {
                            select: {
                              title: 'title',
                              media: 'iconImage',
                            },
                            prepare({title, media}) {
                              return {
                                title: title || 'Content Item',
                                media,
                              }
                            },
                          },
                        },
                      ],
                    }),
                  ],
                  preview: {
                    prepare() {
                      return {
                        title: 'Bottom Content Group',
                      }
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'formTitle',
              subtitle: 'formDescription',
            },
            prepare({title, subtitle}) {
              return {
                title: title || 'Right Column Block',
                subtitle,
              }
            },
          },
        },
      ],
    }),
  ],

  // MODULE PREVIEW
  preview: {
    prepare: () => {
      return {
        title: 'Contact Us Module',
      }
    },
  },
})
