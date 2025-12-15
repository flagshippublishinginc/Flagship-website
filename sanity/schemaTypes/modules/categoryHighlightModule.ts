import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'categoryHighlightModule',
    title: 'Category Highlight',
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
        defineField({
            name: 'featuredPost',
            title: 'Featured Post (Center)',
            type: 'reference',
            to: [{ type: 'post' }],
            description: 'The large central post in the layout.',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'sidePosts',
            title: 'Side Posts',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'post' }] }],
            validation: Rule => Rule.required().min(4).max(4).error('You must select exactly 4 side posts.')
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'e.g. "More Maui Travel"'
        }),
        defineField({
            name: 'buttonLink',
            title: 'Button Link',
            type: 'url',
            description: 'Where the button should link to.'
        })
    ],
    preview: {
        select: {
            heading: 'heading',
            featuredPostTitle: 'featuredPost.title',
            media: 'featuredPost.coverImage'
        },
        prepare({ heading, featuredPostTitle, media }) {
            return {
                title: heading || 'Category Highlight',
                subtitle: featuredPostTitle ? `Featured: ${featuredPostTitle}` : 'No post selected',
                media
            }
        }
    }
})
