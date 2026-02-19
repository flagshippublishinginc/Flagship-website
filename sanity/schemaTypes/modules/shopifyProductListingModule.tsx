import React from 'react'
import { defineField, defineType } from 'sanity'
import { ShopifyProductSelector } from '../../components/ShopifyProductSelector'

export default defineType({
    name: 'shopifyProductListingModule',
    title: 'Shopify Product Listing',
    type: 'object',
    fields: [
        defineField({
            name: 'products',
            title: 'Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'shopifyProduct',
                    title: 'Shopify Product',
                    components: {
                        input: ShopifyProductSelector
                    },
                    fields: [
                        defineField({
                            name: 'shopifyId',
                            title: 'Shopify Product ID',
                            type: 'string',
                            readOnly: true,
                            hidden: true,
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
                                media: imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : null
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
