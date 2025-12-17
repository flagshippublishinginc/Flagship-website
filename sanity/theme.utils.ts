/**
 * Theme Settings Utilities
 * Fetch and manage theme colors from Sanity CMS
 */

import { createClient } from '@sanity/client'

// Create a Sanity client (use your project ID and dataset)
const sanityClient = createClient({
  projectId: 'p2ttbhct',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

/**
 * Fetch the active theme settings from Sanity
 * @returns Promise with theme colors object
 */
export async function getThemeSettings() {
  const query = `*[_type == "themeSettings"][0]{
    _id,
    title,
    backgroundSection,
    textSection,
    "borders": borderColor,
    accentSection,
    "buttonText": buttonTextColor,
    fontFamily,
    useGoogleFont,
    googleFontUrl
  }`

  try {
    const theme = await sanityClient.fetch(query)
    if (!theme) {
      console.warn('No theme settings found in Sanity. Using defaults.')
      return null
    }
    return theme
  } catch (error) {
    console.error('Error fetching theme settings:', error)
    return null
  }
}

/**
 * Transform Sanity theme data to CSS variables format
 * @param theme - Theme settings object from Sanity
 * @returns Object with CSS variable names and color values
 */
export function transformThemeToCSSVariables(theme: any) {
  if (!theme) return null
  const hex = (val: any, fallback: string) => {
    if (!val) return fallback
    if (typeof val === 'string') return val
    if (val.hex) return val.hex
    // some color inputs store {hex, rgba} etc.
    return fallback
  }

  return {
    '--color-background-light': hex(theme.backgroundSection?.lightColor, '#F8F6F3'),
    '--color-background-mid': hex(theme.backgroundSection?.midColor, '#EAE6DF'),
    '--color-text-primary': hex(theme.textSection?.primaryColor, '#1A1A1A'),
    '--color-text-secondary': hex(theme.textSection?.secondaryColor, '#4B4B4B'),
    '--color-border': hex(theme.borders, '#DDD8D1'),
    '--color-accent-primary': hex(theme.accentSection?.primaryAccentColor, '#C63C22'),
    '--color-accent-hover': hex(theme.accentSection?.hoverAccentColor, '#8B2A17'),
    '--color-button-text': hex(theme.buttonText, '#FFFFFF'),
  }
}

/**
 * Fetch theme and apply as CSS variables to document root
 * Call this in your app initialization (e.g., in layout or _app.tsx)
 */
export async function applyThemeFromCMS() {
  const theme = await getThemeSettings()
  const cssVars = transformThemeToCSSVariables(theme)

  if (cssVars) {
    const root = document.documentElement
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
    // Apply font family if provided
    if (theme?.fontFamily) {
      root.style.setProperty('font-family', theme.fontFamily)
      // Also set it as document fontFamily for inline styles
      try {
        document.documentElement.style.fontFamily = theme.fontFamily
      } catch (e) {
        // ignore if server-side or restricted
      }
    }

    // If using Google Fonts, inject the provided URL
    if (theme?.useGoogleFont && theme?.googleFontUrl) {
      const href = theme.googleFontUrl
      // avoid duplicating the link tag
      if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = href
        document.head.appendChild(link)
      }
    }

    console.log('✅ Theme applied from Sanity CMS')
  }
}

/**
 * Get a specific color value from theme
 * @param colorKey - Color key (e.g., 'primaryAccent', 'primaryText')
 */
export async function getThemeColor(colorKey: string) {
  const theme = await getThemeSettings()
  const cssVars = transformThemeToCSSVariables(theme)

  const keyMap: { [key: string]: string } = {
    'primary-accent': '--color-accent-primary',
    'accent-hover': '--color-accent-hover',
    'primary-text': '--color-text-primary',
    'secondary-text': '--color-text-secondary',
    'background-light': '--color-background-light',
    'background-mid': '--color-background-mid',
    'border': '--color-border',
    'button-text': '--color-button-text',
  }

  return cssVars ? (cssVars as any)[keyMap[colorKey]] : null
}
