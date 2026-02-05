export const shopifyFetch = async ({ query, variables = {} }: { query: string; variables?: any }) => {
  // Sanity Studio uses Vite, so we use import.meta.env
  const domain = (import.meta as any).env.SANITY_STUDIO_SHOPIFY_STORE_DOMAIN || (import.meta as any).env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = (import.meta as any).env.SANITY_STUDIO_SHOPIFY_STOREFRONT_ACCESS_TOKEN || (import.meta as any).env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    console.warn("Shopify credentials missing in Sanity Studio env");
    return null;
  }

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    console.log("Shopify Fetch Result:", result);
    if (result.errors) {
      console.error("Shopify API Errors:", result.errors);
      return null;
    }
    return result.data;
  } catch (error) {
    console.error("Shopify Fetch Error:", error);
    return null;
  }
};

export const getAllProducts = async () => {
  const query = `
    query getProducts {
      products(first: 250) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;
  const data = await shopifyFetch({ query })
  const products = data?.products?.edges.map((edge: any) => edge.node) || []
  console.log("Found products:", products.length);
  return products;
}

export const getProductDetails = async (id: string) => {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          url
          altText
        }
      }
    }
  `;
  const data = await shopifyFetch({ query, variables: { id } });
  return data?.product;
};
