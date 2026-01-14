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
        {
          name: 'mediaType',
          type: 'string',
          title: 'Media Type',
          description: 'Choose between image or video',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' }
            ],
            layout: 'radio'
          },
          initialValue: 'image',
          validation: Rule => Rule.required()
        },
        {
          name: 'image',
          type: 'image',
          title: 'Featured Image',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.mediaType !== 'image',
          validation: Rule => Rule.custom((field, context) => {
            const parent = context.parent as any;
            if (parent?.mediaType === 'image' && !field) {
              return 'Image is required when Image media type is selected';
            }
            return true;
          })
        },
        {
          name: 'video',
          type: 'file',
          title: 'Featured Video',
          description: 'Upload a video file (MP4, WebM, etc.)',
          options: {
            accept: 'video/*'
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video',
          validation: Rule => Rule.custom((field, context) => {
            const parent = context.parent as any;
            if (parent?.mediaType === 'video' && !field) {
              return 'Video is required when Video media type is selected';
            }
            return true;
          })
        },
        {
          name: 'videoThumbnail',
          type: 'image',
          title: 'Video Thumbnail',
          description: 'Thumbnail image for the video (optional)',
          options: { hotspot: true },
          hidden: ({ parent }) => parent?.mediaType !== 'video'
        },
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
    }),

    // Bottom CTA Button
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'e.g., "More Maui Activities"'
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'url',
      description: 'Where the button should link to'
    })
  ],

  preview: {
    select: {
      headingText: 'headingText',
      headingHighlight: 'headingHighlight',
      image: 'leadArticle.image',
      videoThumbnail: 'leadArticle.videoThumbnail',
      mediaType: 'leadArticle.mediaType'
    },
    prepare({ headingText, headingHighlight, image, videoThumbnail, mediaType }) {
      const title = `${headingText || ''} ${headingHighlight || ''}`.trim()
      // Show video thumbnail if video type, otherwise show image
      const media = mediaType === 'video' ? videoThumbnail : image
      return {
        title: title || 'Activities Section',
        subtitle: 'Lead + sidebar articles',
        media
      }
    }
  }
})
