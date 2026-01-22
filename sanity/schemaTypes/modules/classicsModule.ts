import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'classicsModule',
    title: 'Classics Module',
    type: 'object',
    fieldsets: [
        {
            name: 'sectionHeading',
            title: 'Section Heading',
            options: { columns: 2 }
        },
        {
            name: 'featuredArticle',
            title: 'Featured Article',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        defineField({
            name: 'headingText',
            type: 'string',
            title: 'Normal Text',
            description: 'First part of the section heading (e.g., "Maui\'s")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'headingHighlight',
            type: 'string',
            title: 'Highlighted Text',
            description: 'Second part of the heading (e.g., "Classics")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Large featured image on the left',
            fieldset: 'featuredArticle',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featuredTitle',
            title: 'Featured Title',
            type: 'string',
            description: 'e.g., "Weapons of Old Hawai\'i"',
            fieldset: 'featuredArticle',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featuredDescription',
            title: 'Featured Description',
            type: 'text',
            description: 'Long description for the featured article',
            fieldset: 'featuredArticle',
            rows: 4
        }),
        defineField({
            name: 'featuredButtonText',
            title: 'Featured Button Text',
            type: 'string',
            description: 'e.g., "Read Story"',
            fieldset: 'featuredArticle'
        }),
        defineField({
            name: 'featuredButtonLink',
            title: 'Featured Button Link',
            type: 'url',
            description: 'URL for the featured article',
            fieldset: 'featuredArticle'
        }),
        defineField({
            name: 'secondaryImage',
            title: 'Secondary Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Additional image to display alongside the featured article',
            fieldset: 'featuredArticle'
        })
    ],
    preview: {
        select: {
            headingText: 'headingText',
            headingHighlight: 'headingHighlight',
            featuredTitle: 'featuredTitle',
            media: 'featuredImage'
        },
        prepare({ headingText, headingHighlight, featuredTitle, media }) {
            const heading = [headingText, headingHighlight].filter(Boolean).join(' ');
            return {
                title: heading || 'Classics Module',
                subtitle: featuredTitle ? `Featured: ${featuredTitle}` : 'No featured article',
                media
            }
        }
    }
})
