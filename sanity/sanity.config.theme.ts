import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {colorPalette} from './theme.config'

// Inject custom theme CSS
const styleElement = document.createElement('style')
styleElement.textContent = `
  :root {
    --color-background-light: ${colorPalette.backgroundLight};
    --color-background-mid: ${colorPalette.backgroundMid};
    --color-text-primary: ${colorPalette.primaryText};
    --color-text-secondary: ${colorPalette.secondaryText};
    --color-border: ${colorPalette.borders};
    --color-accent-primary: ${colorPalette.primaryAccent};
    --color-accent-hover: ${colorPalette.accentHover};
    --color-button-text: ${colorPalette.buttonText};
  }
  
  body {
    background-color: ${colorPalette.backgroundLight};
    color: ${colorPalette.primaryText};
  }
  
  a {
    color: ${colorPalette.primaryAccent};
  }
  
  a:hover {
    color: ${colorPalette.accentHover};
  }
  
  button, [role="button"], .sanity-button {
    background-color: ${colorPalette.primaryAccent};
    color: ${colorPalette.buttonText};
  }
  
  button:hover, [role="button"]:hover, .sanity-button:hover {
    background-color: ${colorPalette.accentHover};
  }
`

if (typeof document !== 'undefined') {
  document.head.appendChild(styleElement)
}

export default defineConfig({
  name: 'default',
  title: 'Flagship Publication',

  projectId: 'o9to2bdp',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
