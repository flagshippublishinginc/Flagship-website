import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'subscriptionBannerModule',
    title: 'Subscription CTA Banner',
    type: 'object',
    fieldsets: [
        {
            name: 'heading',
            title: 'Heading',
            options: { columns: 2 }
        }
    ],
    fields: [
        defineField({
            name: 'imageLayout',
            title: 'Image Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Single Image', value: 'single' },
                    { title: 'Three Images', value: 'triple' }
                ],
                layout: 'radio'
            },
            description: 'Choose to display 1 or 3 magazine cover images',
            validation: Rule => Rule.required(),
            initialValue: 'triple'
        }),
        defineField({
            name: 'singleImage',
            title: 'Magazine Cover Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Single magazine cover image (used when "Single Image" is selected)',
            hidden: ({ parent }) => parent?.imageLayout !== 'single',
            validation: Rule => Rule.custom((field, context) => {
                const parent = context.parent as any;
                if (parent?.imageLayout === 'single' && !field) {
                    return 'Image is required when Single Image layout is selected';
                }
                return true;
            })
        }),
        defineField({
            name: 'tripleImages',
            title: 'Three Magazine Cover Images',
            type: 'object',
            description: 'Three magazine cover images (used when "Three Images" is selected)',
            hidden: ({ parent }) => parent?.imageLayout !== 'triple',
            fields: [
                defineField({
                    name: 'image1',
                    title: 'Image 1 (Left)',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'image2',
                    title: 'Image 2 (Center)',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'image3',
                    title: 'Image 3 (Right)',
                    type: 'image',
                    options: {
                        hotspot: true
                    },
                    validation: Rule => Rule.required()
                })
            ],
            validation: Rule => Rule.custom((field, context) => {
                const parent = context.parent as any;
                if (parent?.imageLayout === 'triple' && !field) {
                    return 'All three images are required when Triple Images layout is selected';
                }
                return true;
            })
        }),
        defineField({
            name: 'headingText',
            type: 'string',
            title: 'Normal Text',
            description: 'First part of the heading (e.g., "Subscribe to")',
            fieldset: 'heading'
        }),
        defineField({
            name: 'headingHighlight',
            type: 'string',
            title: 'Highlighted Text',
            description: 'Second part of the heading (e.g., "Maui No Ka \'Oi")',
            fieldset: 'heading'
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'e.g., "Become A Subscriber And Dive Into Maui Life"',
            rows: 3
        }),
        defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            description: 'e.g., "Subscribe to Maui No Ka \'Oi"',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'buttonLink',
            title: 'Button Link',
            type: 'url',
            description: 'URL for the subscription page',
            validation: Rule => Rule.required()
        })
    ],
    preview: {
        select: {
            headingText: 'headingText',
            headingHighlight: 'headingHighlight',
            imageLayout: 'imageLayout',
            singleImage: 'singleImage',
            tripleImage1: 'tripleImages.image1'
        },
        prepare({ headingText, headingHighlight, imageLayout, singleImage, tripleImage1 }) {
            const heading = [headingText, headingHighlight].filter(Boolean).join(' ');
            const layoutLabel = imageLayout === 'single' ? '1 Image' : '3 Images';
            return {
                title: heading || 'Subscription CTA Banner',
                subtitle: `Layout: ${layoutLabel}`,
                media: singleImage || tripleImage1
            }
        }
    }
})
