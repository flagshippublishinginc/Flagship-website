import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'currentIssueModule',
    title: 'Current Issue',
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
            name: 'badge',
            title: 'Badge Text',
            type: 'string',
            description: 'e.g. "OUT NOW"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'issueDate',
            title: 'Issue Date',
            type: 'string',
            description: 'e.g. "November 2025"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'coverImage',
            title: 'Magazine Cover Image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'volumeInfo',
            title: 'Volume Information',
            type: 'string',
            description: 'e.g. "VOLUME 390 | ISSUE #774 | NOVEMBER 2025"'
        }),
        defineField({
            name: 'featuredTitle',
            title: 'Featured Section Title',
            type: 'string',
            description: 'e.g. "FEATURING"'
        }),
        defineField({
            name: 'mainFeature',
            title: 'Main Feature Title',
            type: 'string',
            description: 'e.g. "Pele"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'features',
            title: 'Feature List',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'List of featured articles in this issue'
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Large background image on the right side',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'e.g. "Explore the Issue"'
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
            issueDate: 'issueDate',
            mainFeature: 'mainFeature',
            media: 'coverImage'
        },
        prepare({ issueDate, mainFeature, media }) {
            return {
                title: `Current Issue: ${issueDate || 'Untitled'}`,
                subtitle: mainFeature ? `Featuring: ${mainFeature}` : 'No feature selected',
                media
            }
        }
    }
})
