import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorInput} from '@sanity/color-input'
import pageBuilder from './plugins/pageBuilder'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Flagship Publication',

  projectId: 'p2ttbhct',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), colorInput(), pageBuilder()],

  schema: {
    types: schemaTypes,
  },
})

