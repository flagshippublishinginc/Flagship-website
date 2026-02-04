import React, { useCallback, useEffect, useState } from 'react'
import { Select, Stack, Text, Card, Flex, Spinner } from '@sanity/ui'
import { StringInputProps, set, unset } from 'sanity'
import { getAllProducts, getProductDetails } from '../lib/shopify'

export function ShopifyProductSelector(props: StringInputProps) {
    const { onChange, value } = props
    const [products, setProducts] = useState<{ id: string; title: string; handle: string }[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const data = await getAllProducts()
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [])

    const handleChange = useCallback(
        async (event: React.FormEvent<HTMLSelectElement>) => {
            const selectedId = event.currentTarget.value

            if (!selectedId) {
                onChange(unset())
                return
            }

            onChange(set(selectedId))

            // Fetch details and patch other fields
            setLoading(true)
            const details = await getProductDetails(selectedId)
            if (details) {
                // We assume the sibling fields are named title, description, price, imageUrl
                // This patch needs to be relative to the parent object if this is a field input
                // Since we are an input for 'shopifyId', we can use path-based patches or just emit multiple patches

                // Note: In Sanity, if you're inside an object, you might need to use a custom object input 
                // OR use the 'patch' function from the parent if available. 
                // But usually, an input can only patch its own value easily unless we use 'useFormValue'.

                // However, we can emit multiple patches if we have the parent path.
                // For simplicity in this module, I will trigger patches for siblings.

                const patches = []
                if (details.title) patches.push(set(details.title, ['title']))
                if (details.description) patches.push(set(details.description, ['description']))
                if (details.priceRange?.minVariantPrice?.amount) {
                    const price = `${details.priceRange.minVariantPrice.amount} ${details.priceRange.minVariantPrice.currencyCode}`
                    patches.push(set(price, ['price']))
                }
                if (details.featuredImage?.url) {
                    patches.push(set(details.featuredImage.url, ['imageUrl']))
                }

                // We need to apply these patches. props.onChange can take an array of patches.
                // But these paths are relative to the current field. 
                // To patch siblings, we need to go up. 
                // In Sanity 3+, we can use 'path' from props to determine where we are.

                const parentPath = props.path.slice(0, -1)

                const siblingPatches = patches.map(p => ({
                    ...p,
                    path: [...parentPath, ...p.path]
                }))

                onChange(siblingPatches)
            }
            setLoading(false)
        },
        [onChange, props.path]
    )

    return (
        <Stack space={3}>
            <Flex align="center" gap={2}>
                <Select
                    value={value || ''}
                    onChange={handleChange}
                    disabled={loading}
                >
                    <option value="">Select a product...</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.title} ({product.handle})
                        </option>
                    ))}
                </Select>
                {loading && <Spinner />}
            </Flex>
            {!(import.meta as any).env.SANITY_STUDIO_SHOPIFY_STORE_DOMAIN && !(import.meta as any).env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && (
                <Card padding={3} tone="caution" radius={2}>
                    <Text size={1}>Shopify credentials missing in environment variables.</Text>
                </Card>
            )}
        </Stack>
    )
}
