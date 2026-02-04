import { defineField, defineType } from 'sanity'
import { ShopifyProductSelector } from '../../components/ShopifyProductSelector'

export default defineType({
    name: 'shopifyProductListingModule',
    title: 'Shopify Product Listing',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            title: 'Module Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Module Description',
            type: 'text',
        }),
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'shopifyProduct',
                    title: 'Shopify Product',
                    fields: [
                        defineField({
                            name: 'shopifyId',
                            title: 'Select Shopify Product',
                            type: 'string',
                            components: {
                                input: ShopifyProductSelector
                            },
                            description: 'Select a product from Shopify to auto-fill details',
                        }),
                        defineField({
                            name: 'title',
                            title: 'Product Title',
                            type: 'string',
                            description: 'Editable title (auto-filled from Shopify)',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Product Description',
                            type: 'text',
                            description: 'Editable description (auto-filled from Shopify)',
                        }),
                        defineField({
                            name: 'price',
                            title: 'Price',
                            type: 'string',
                            readOnly: true,
                            description: 'Read-only price from Shopify',
                        }),
                        defineField({
                            name: 'imageUrl',
                            title: 'Image URL',
                            type: 'string',
                            readOnly: true,
                            hidden: true, // Internal helper for frontend
                        }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            subtitle: 'price',
                            imageUrl: 'imageUrl'
                        },
                        prepare({ title, subtitle, imageUrl }) {
                            return {
                                title: title || 'New Product',
                                subtitle: subtitle || 'No price',
                                // Sanity preview can show external images if matched correctly
                                // But for standard media preview, it usually expects a Sanity image object.
                                // We'll just show the text for now.
                            }
                        }
                    }
                }
            ]
        }),
        defineField({
            name: 'buttonText',
            title: 'Show More Button Text',
            type: 'string',
            initialValue: 'Show More'
        })
    ]
})
