import React, { useCallback, useEffect, useState } from 'react'
import { Select, Stack, Text, Card, Flex, Spinner, Box } from '@sanity/ui'
import { ObjectInputProps, set, unset, PatchEvent } from 'sanity'
import { getAllProducts, getProductDetails } from '../lib/shopify'

export function ShopifyProductSelector(props: ObjectInputProps) {
    const { onChange, value, renderDefault } = props
    const [products, setProducts] = useState<{ id: string; title: string; handle: string }[]>([])
    const [loading, setLoading] = useState(false)

    // Cast value to any to access internal fields safely
    const objectValue = value as any

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const data = await getAllProducts()
                setProducts(data || [])
            } catch (err) {
                console.error("Error fetching products:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    const handleChange = useCallback(
        async (event: React.FormEvent<HTMLSelectElement>) => {
            const selectedId = event.currentTarget.value

            if (!selectedId) {
                // If unselecting, we don't necessarily want to unset the whole object,
                // just the shopifyId and maybe clear the others.
                onChange(PatchEvent.from([
                    unset(['shopifyId']),
                    unset(['title']),
                    unset(['description']),
                    unset(['price']),
                    unset(['imageUrl'])
                ]))
                return
            }

            setLoading(true)
            try {
                const details = await getProductDetails(selectedId)

                const patches = [set(selectedId, ['shopifyId'])]

                if (details) {
                    if (details.title) patches.push(set(details.title, ['title']))
                    if (details.description) patches.push(set(details.description, ['description']))
                    if (details.priceRange?.minVariantPrice?.amount) {
                        const price = `${details.priceRange.minVariantPrice.amount} ${details.priceRange.minVariantPrice.currencyCode}`
                        patches.push(set(price, ['price']))
                    }
                    if (details.featuredImage?.url) {
                        patches.push(set(details.featuredImage.url, ['imageUrl']))
                    }
                }

                onChange(PatchEvent.from(patches))
            } catch (err) {
                console.error("Error updating product details:", err)
                onChange(PatchEvent.from(set(selectedId, ['shopifyId'])))
            } finally {
                setLoading(false)
            }
        },
        [onChange]
    )

    return (
        <Stack space={4}>
            <Box>
                <Text size={1} weight="bold" style={{ marginBottom: '8px', display: 'block' }}>
                    Select Shopify Product
                </Text>
                <Flex align="center" gap={2}>
                    <Select
                        value={objectValue?.shopifyId || ''}
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
                    <Card padding={3} tone="caution" radius={2} marginTop={2}>
                        <Text size={1}>Shopify credentials missing in environment variables.</Text>
                    </Card>
                )}

                {!loading && products.length === 0 && ((import.meta as any).env.SANITY_STUDIO_SHOPIFY_STORE_DOMAIN || (import.meta as any).env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) && (
                    <Card padding={3} tone="caution" radius={2} marginTop={2}>
                        <Text size={1}>No active products found in Shopify. Ensure your products are published to the <b>Headless</b> or <b>Storefront</b> sales channel.</Text>
                    </Card>
                )}
                {objectValue?.imageUrl && (
                    <Box marginTop={2}>
                        <img
                            src={objectValue.imageUrl}
                            alt={objectValue.title || 'Product'}
                            style={{
                                width: '100%',
                                maxHeight: '200px',
                                objectFit: 'contain',
                                borderRadius: '4px',
                                border: '1px solid #eee'
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* Render the default fields (Title, Description, Price, etc.) */}
            <Card borderTop>
                {renderDefault(props)}
            </Card>
        </Stack>
    )
}
