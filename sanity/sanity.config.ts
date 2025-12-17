import { defineConfig } from 'sanity'
import { presentationTool } from '@sanity/presentation'
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

  plugins: [
    structureTool({ structure }),
    visionTool(),
    colorInput(),
    pageBuilder(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
          disable: '/api/disable-draft',
        },
      },
    }),
  ],

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
      },
      {
        id: 'teamMember-by-site',
        title: 'Team Member by Site',
        schemaType: 'teamMember',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'author-by-site',
        title: 'Author by Site',
        schemaType: 'author',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'category-by-site',
        title: 'Category by Site',
        schemaType: 'category',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'testimonial-by-site',
        title: 'Testimonial by Site',
        schemaType: 'testimonial',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'themeSettings-by-site',
        title: 'Theme Settings by Site',
        schemaType: 'themeSettings',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'contactPage-by-site',
        title: 'Contact Page by Site',
        schemaType: 'contactPage',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      },
      {
        id: 'teamPage-by-site',
        title: 'Team Page by Site',
        schemaType: 'teamPage',
        parameters: [{ name: 'siteId', type: 'string' }],
        value: ({ siteId }: { siteId: string }) => ({
          site: { _type: 'reference', _ref: siteId }
        })
      }
    ]
  },
})
