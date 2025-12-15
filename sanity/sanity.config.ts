import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { colorInput } from '@sanity/color-input'
import pageBuilder from './plugins/pageBuilder'
import { structure } from './structure'

export default defineConfig({
  name: 'default',
  title: 'Flagship Publication',

  projectId: 'o9to2bdp',
  dataset: 'production',

  plugins: [structureTool({ structure }), visionTool(), colorInput(), pageBuilder()],

  schema: {
    types: schemaTypes,
    templates: (prev) => [
      ...prev,
      {
        id: 'page-by-site',
        title: 'Page by Site',
        schemaType: 'page',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'post-by-site',
        title: 'Post by Site',
        schemaType: 'post',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'homePage-by-site',
        title: 'Home Page by Site',
        schemaType: 'homePage',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'blogListingPage-by-site',
        title: 'Blog Listing Page by Site',
        schemaType: 'blogListingPage',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      }
    ]
  },
})
