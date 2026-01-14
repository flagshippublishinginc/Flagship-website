import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'galleryModule',
    title: 'Gallery Module',
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
            description: 'First part of the section heading (e.g., "Maui")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'headingHighlight',
            type: 'string',
            title: 'Highlighted Text',
            description: 'Second part of the heading (e.g., "Gallery")',
            fieldset: 'sectionHeading'
        }),
        defineField({
            name: 'galleryItems',
            title: 'Gallery Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'galleryItem',
                    title: 'Gallery Item',
                    fields: [
                        defineField({
                            name: 'itemType',
                            type: 'string',
                            title: 'Item Type',
                            description: 'Choose between image or text',
                            options: {
                                list: [
                                    { title: 'Image', value: 'image' },
                                    { title: 'Text', value: 'text' }
                                ],
                                layout: 'radio'
                            },
                            initialValue: 'image',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'image',
                            title: 'Image',
                            type: 'image',
                            options: {
                                hotspot: true
                            },
                            hidden: ({ parent }) => parent?.itemType !== 'image',
                            validation: Rule => Rule.custom((field, context) => {
                                const parent = context.parent as any;
                                if (parent?.itemType === 'image' && !field) {
                                    return 'Image is required when Image type is selected';
                                }
                                return true;
                            })
                        }),
                        defineField({
                            name: 'title',
                            title: 'Image Title',
                            type: 'string',
                            description: 'Title shown on hover (e.g., "Nature\'s colors over the ocean.")',
                            hidden: ({ parent }) => parent?.itemType !== 'image'
                        }),
                        defineField({
                            name: 'location',
                            title: 'Location',
                            type: 'string',
                            description: 'e.g., "Location, Town, Landmark"',
                            hidden: ({ parent }) => parent?.itemType !== 'image'
                        }),
                        defineField({
                            name: 'photoCredit',
                            title: 'Photo Credit',
                            type: 'string',
                            description: 'e.g., "Photo Credit - Photographer Name Or Instagram Handle"',
                            hidden: ({ parent }) => parent?.itemType !== 'image'
                        }),
                        defineField({
                            name: 'link',
                            title: 'Link',
                            type: 'url',
                            description: 'Optional link when image is clicked',
                            hidden: ({ parent }) => parent?.itemType !== 'image'
                        }),
                        defineField({
                            name: 'textContent',
                            title: 'Text Content',
                            type: 'string',
                            description: 'e.g., "Who\'s Who on Maui"',
                            hidden: ({ parent }) => parent?.itemType !== 'text',
                            validation: Rule => Rule.custom((field, context) => {
                                const parent = context.parent as any;
                                if (parent?.itemType === 'text' && !field) {
                                    return 'Text content is required when Text type is selected';
                                }
                                return true;
                            })
                        })
                    ],
                    preview: {
                        select: {
                            itemType: 'itemType',
                            title: 'title',
                            textContent: 'textContent',
                            location: 'location',
                            media: 'image'
                        },
                        prepare({ itemType, title, textContent, location, media }) {
                            if (itemType === 'text') {
                                return {
                                    title: textContent || 'Untitled Text',
                                    subtitle: 'Text Item'
                                }
                            }
                            return {
                                title: title || 'Untitled Image',
                                subtitle: location || 'No location',
                                media
                            }
                        }
                    }
                }
            ],
            description: 'Add unlimited gallery images with hover overlay information',
            validation: Rule => Rule.min(1).error('Add at least one gallery item')
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'e.g., "Explore Gallery"'
        }),
        defineField({
            name: 'buttonLink',
            title: 'Button Link',
            type: 'url',
            description: 'URL for the gallery button'
        })
    ],
    preview: {
        select: {
            headingText: 'headingText',
            headingHighlight: 'headingHighlight',
            firstImage: 'galleryItems.0.image',
            itemCount: 'galleryItems'
        },
        prepare({ headingText, headingHighlight, firstImage, itemCount }) {
            const heading = [headingText, headingHighlight].filter(Boolean).join(' ');
            const count = Array.isArray(itemCount) ? itemCount.length : 0;
            return {
                title: heading || 'Gallery Module',
                subtitle: `${count} image${count !== 1 ? 's' : ''}`,
                media: firstImage
            }
        }
    }
})
