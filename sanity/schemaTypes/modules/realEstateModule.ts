import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'realEstateModule',
    title: 'Real Estate Module',
    type: 'object',
    fieldsets: [
        {
            name: 'sectionHeading',
            title: 'Section Heading',
            options: { columns: 2 }
        },
        {
            name: 'featuredArticle',
            title: 'Featured Article (Left Side)',
            options: { collapsible: true, collapsed: false }
        }
    ],
    fields: [
        defineField({
            name: 'headingText',
            type: 'string',
            title: 'Normal Text',
            description: 'First part of the section heading (e.g., "Maui")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'headingHighlight',
            type: 'string',
            title: 'Highlighted Text',
            description: 'Second part of the heading (e.g., "Real Estate")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Large image for the main featured article',
            fieldset: 'featuredArticle',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featuredTitle',
            title: 'Featured Title',
            type: 'string',
            description: 'e.g., "The Points Are in Your Favor"',
            fieldset: 'featuredArticle',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'featuredDescription',
            title: 'Featured Description',
            type: 'text',
            description: 'e.g., "Learn What Makes Vacation Ownership So Popular."',
            fieldset: 'featuredArticle'
        }),
        defineField({
            name: 'sidebarArticles',
            title: 'Sidebar Articles (Right)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'sidebarArticle',
                    title: 'Sidebar Article',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Article Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'title',
                            title: 'Article Title',
                            type: 'string',
                            description: 'e.g., "The Luxury Home", "In the Market for Luxury?"',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            title: 'Article Description',
                            type: 'text',
                            description: 'Brief description of the article'
                        }),
                        defineField({
                            name: 'link',
                            title: 'Article Link',
                            type: 'url',
                            description: 'URL to the article page'
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                            media: 'image'
                        },
                        prepare({ title, subtitle, media }) {
                            return {
                                title: title || 'Untitled Article',
                                subtitle: subtitle ? subtitle.slice(0, 60) : 'No description',
                                media
                            }
                        }
                    }
                }
            ],
            description: 'Add articles for the right sidebar section (displayed next to featured article)'
        }),
        defineField({
            name: 'propertySlides',
            title: 'Property Slides',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'propertySlide',
                    title: 'Property Slide',
                    fields: [
                        defineField({
                            name: 'image',
                            title: 'Property Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'title',
                            title: 'Property Title',
                            type: 'string',
                            description: 'e.g., "The Luxury Home", "In the Market for Luxury?"',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'description',
                            title: 'Property Description',
                            type: 'text',
                            description: 'Brief description of the property or article'
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            description: 'URL to the property or article page'
                        })
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'description',
                            media: 'image'
                        },
                        prepare({ title, subtitle, media }) {
                            return {
                                title: title || 'Untitled Property',
                                subtitle: subtitle ? subtitle.slice(0, 60) : 'No description',
                                media
                            }
                        }
                    }
                }
            ],
            description: 'Add unlimited property slides for the sidebar/slider section',
            validation: Rule => Rule.min(1).error('Add at least one property slide')
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
                title: heading || 'Real Estate Module',
                subtitle: featuredTitle ? `Featured: ${featuredTitle}` : 'No featured article',
                media
            }
        }
    }
})
