# Flagship Publication Project

This project consists of a high-performance Next.js frontend and a flexible Sanity CMS backend, designed to manage and display content for Flagship Publication.

## Project Structure

The repository is divided into two main parts:

- `next-app/`: The frontend application built with Next.js, React, and Tailwind CSS.
- `sanity/`: The Sanity Studio configuration for content management.

## Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) (App Router), [React 19](https://reactjs.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (v3/v5)
- **Architecture**: Modular page builder using Sanity's "Array of Objects" for dynamic layouts.
- **Shopify Integration**: Uses Shopify Storefront API for product listings.

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn

### Environment Variables

Both `next-app` and `sanity` may require environment variables. 

#### next-app (.env)
Create a `.env` file in the `next-app` directory with the following:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=o9to2bdp
NEXT_PUBLIC_SANITY_TOKEN="your_sanity_token_here"
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=flagship-publishing.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_shopify_token_here
```

### Installation

1. Clone the repository.
2. Install dependencies for both the frontend and the backend:

```bash
# Install next-app dependencies
cd next-app
npm install

# Install sanity dependencies
cd ../sanity
npm install
```

### Development

To run both the frontend and the CMS in development mode:

1. **Start Sanity Studio:**
   ```bash
   cd sanity
   npm run dev
   ```
   The studio will be available at [http://localhost:3333](http://localhost:3333).

2. **Start Next.js Frontend:**
   ```bash
   cd next-app
   npm run dev
   ```
   The website will be available at [http://localhost:3000](http://localhost:3000).

## Folder Overview

### next-app
- `/app`: Next.js App Router pages.
- `/components`: UI components. Major page sections are located here.
- `/lib`: Helper functions, Sanity client setup, and animation utilities.
- `/public`: Static assets like images and fonts.

### sanity
- `/schemaTypes`: All Sanity schema definitions.
    - `/documents`: Main document types like `Page`, `Post`, `Author`.
    - `/modules`: Reusable modules used in the Page Builder.
    - `/objects`: Shared object types like `SEO`, `Links`, `NavItem`.

## Deployment

### Sanity
To deploy the Sanity Studio to the cloud:
```bash
cd sanity
npm run deploy
```

### Next.js
The frontend can be deployed to platforms like Vercel. 
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: Ensure all variables from `.env` are set in the deployment dashboard.

## Common Tasks

### Adding a New Page Module
1. Define the schema in `sanity/schemaTypes/modules/[moduleName].ts`.
2. Register the schema in `sanity/schemaTypes/index.ts`.
3. Create the React component in `next-app/components/[ModuleName].tsx`.
4. Map the new module in `next-app/lib/moduleMapper.ts` (if applicable) and `next-app/components/ModuleRenderer.tsx`.
