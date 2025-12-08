# Dynamic Theme Settings - CMS Integration Guide

Your Sanity CMS now includes a **Theme Settings** document that allows non-technical team members to change website colors on-the-fly without any code changes or developer involvement.

## ✨ Features

- 🎨 Change all 8 brand colors from the CMS UI
- ✅ Real-time validation (hex color format)
- 🔄 Instantly updates your website (no rebuild needed)
- ♿ Built-in accessibility guidelines
- 📱 Works across web, mobile, and all devices

---

## How It Works

### 1. In Sanity Studio (for Content Editors)

1. Log into your Sanity Studio
2. Look for **"Theme Settings"** in the left sidebar under Content
3. Click to open the Theme Settings document
4. Edit any color you want:
   - Background Light
   - Background Mid
   - Primary Text
   - Secondary Text
   - Lines / Borders
   - Primary Accent (CTA/Links)
   - Accent Hover (Darker shade)
   - Button Text

5. **Publish** the changes
6. Your website colors update **instantly** ✨

### 2. In Your Frontend Code

#### For Next.js / React (Recommended)

**Step 1:** In your main layout or `_app.tsx`:

```typescript
import { useEffect } from 'react'
import { applyThemeFromCMS } from './theme.utils'

export default function RootLayout({ children }: any) {
  useEffect(() => {
    applyThemeFromCMS() // Fetch and apply theme on page load
  }, [])

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/global-theme.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Step 2:** Use CSS variables in your components:

```css
body {
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
}

a {
  color: var(--color-accent-primary);
}

a:hover {
  color: var(--color-accent-hover);
}

button {
  background-color: var(--color-accent-primary);
  color: var(--color-button-text);
}

button:hover {
  background-color: var(--color-accent-hover);
}
```

**Step 3 (Optional):** Use the utility functions in components:

```typescript
import { getThemeColor } from './theme.utils'

export default function Button() {
  const [accentColor, setAccentColor] = useState<string>()

  useEffect(() => {
    getThemeColor('primary-accent').then(setAccentColor)
  }, [])

  return <button style={{ backgroundColor: accentColor }}>Click me</button>
}
```

#### For Styled-Components

```typescript
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { getThemeSettings, transformThemeToCSSVariables } from './theme.utils'

const Container = styled.div`
  background-color: var(--color-background-light);
  color: var(--color-text-primary);
`

export default function App() {
  useEffect(() => {
    const applyTheme = async () => {
      const theme = await getThemeSettings()
      const cssVars = transformThemeToCSSVariables(theme)
      
      if (cssVars) {
        const root = document.documentElement
        Object.entries(cssVars).forEach(([key, value]) => {
          root.style.setProperty(key, value as string)
        })
      }
    }
    
    applyTheme()
  }, [])

  return <Container>Your content here</Container>
}
```

#### For Tailwind CSS

**Step 1:** Update your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'theme-bg-light': 'var(--color-background-light)',
        'theme-bg-mid': 'var(--color-background-mid)',
        'theme-text-primary': 'var(--color-text-primary)',
        'theme-text-secondary': 'var(--color-text-secondary)',
        'theme-border': 'var(--color-border)',
        'theme-accent': 'var(--color-accent-primary)',
        'theme-accent-hover': 'var(--color-accent-hover)',
        'theme-button-text': 'var(--color-button-text)',
      },
    },
  },
}
```

**Step 2:** Use in templates:

```jsx
<div className="bg-theme-bg-light text-theme-text-primary">
  <a href="#" className="text-theme-accent hover:text-theme-accent-hover">
    Link
  </a>
  <button className="bg-theme-accent text-theme-button-text hover:bg-theme-accent-hover">
    CTA
  </button>
</div>
```

#### For Plain CSS / Static Sites

**Step 1:** Create a `theme-loader.js`:

```javascript
async function loadTheme() {
  const response = await fetch('/api/theme')
  const theme = await response.json()

  const root = document.documentElement
  root.style.setProperty('--color-background-light', theme.backgroundSection.light)
  root.style.setProperty('--color-background-mid', theme.backgroundSection.mid)
  root.style.setProperty('--color-text-primary', theme.textSection.primary)
  root.style.setProperty('--color-text-secondary', theme.textSection.secondary)
  root.style.setProperty('--color-border', theme.borders)
  root.style.setProperty('--color-accent-primary', theme.accentSection.primary)
  root.style.setProperty('--color-accent-hover', theme.accentSection.hover)
  root.style.setProperty('--color-button-text', theme.buttonText)
}

loadTheme()
```

**Step 2:** Add to your HTML `<head>`:

```html
<script src="/theme-loader.js"></script>
<link rel="stylesheet" href="/styles.css" />
```

---

## Available Color Variables

All colors are available as CSS variables:

```css
--color-background-light     /* #F8F6F3 */
--color-background-mid       /* #EAE6DF */
--color-text-primary         /* #1A1A1A */
--color-text-secondary       /* #4B4B4B */
--color-border              /* #DDD8D1 */
--color-accent-primary      /* #C63C22 */
--color-accent-hover        /* #8B2A17 */
--color-button-text         /* #FFFFFF */
```

---

## Utility Functions

The `theme.utils.ts` file provides helper functions:

### `getThemeSettings()`
Fetch the complete theme object from Sanity.

```typescript
const theme = await getThemeSettings()
console.log(theme.accentSection.primary) // '#C63C22'
```

### `transformThemeToCSSVariables(theme)`
Convert theme object to CSS variable format.

```typescript
const cssVars = transformThemeToCSSVariables(theme)
// Returns: { '--color-accent-primary': '#C63C22', ... }
```

### `applyThemeFromCMS()`
Fetch theme and immediately apply to document root.

```typescript
await applyThemeFromCMS()
// Colors update on page
```

### `getThemeColor(colorKey)`
Get a specific color value.

```typescript
const accentColor = await getThemeColor('primary-accent') // '#C63C22'
```

---

## Content Editor Instructions

### Changing Colors

1. **Navigate to Theme Settings**
   - From Sanity Studio home, click "Theme Settings" or find it in Content sidebar

2. **Edit a Color**
   - Click on any color field
   - Enter a valid hex color code (e.g., `#FF5733`, `#000`, `#FFFFFF`)
   - Color preview will show as you type

3. **Publish Changes**
   - Click the **Publish** button in the top right
   - Changes take effect immediately on your website

### Color Format

All colors must be in **hexadecimal** format:
- Full format: `#RRGGBB` (e.g., `#FF5733`)
- Short format: `#RGB` (e.g., `#F57`)

**Examples:**
- Red: `#FF0000`
- Green: `#00FF00`
- Blue: `#0000FF`
- Black: `#000000` or `#000`
- White: `#FFFFFF` or `#FFF`

### Tools to Find Hex Colors

- 🎨 [Coolors.co](https://coolors.co)
- 🎨 [Color-hex.com](https://www.color-hex.com)
- 🎨 [Google Color Picker](https://www.google.com/search?q=color+picker)
- 🎨 Your browser's DevTools (built-in)

---

## Troubleshooting

### Colors not updating?

1. **Check publishing:** Make sure you hit Publish after editing colors
2. **Browser cache:** Hard refresh (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
3. **API key:** Verify your Sanity client has read permissions
4. **Network:** Check browser console for fetch errors

### Invalid color format error?

- Only use hex format: `#RRGGBB`
- Make sure there's a `#` at the start
- Valid example: `#C63C22`
- Invalid examples: `rgb(198, 60, 34)`, `red`, `C63C22`

### Changes took too long to appear?

- CSS variables cache on first load
- Hard refresh your browser
- Check if your app calls `applyThemeFromCMS()` on page load

---

## Advanced: Real-time Theme Updates

For live real-time updates without page refresh, use Sanity's listener:

```typescript
import { sanityClient } from './client'

export function subscribeToThemeChanges(callback: (theme: any) => void) {
  const subscription = sanityClient
    .listen('*[_type == "themeSettings"]')
    .subscribe((event) => {
      if (event.type === 'mutation') {
        getThemeSettings().then(callback)
      }
    })

  return () => subscription.unsubscribe()
}

// Use in your app:
useEffect(() => {
  const unsubscribe = subscribeToThemeChanges((theme) => {
    const cssVars = transformThemeToCSSVariables(theme)
    const root = document.documentElement
    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
    console.log('🎨 Theme updated in real-time!')
  })

  return unsubscribe
}, [])
```

---

## Files Created

- `schemaTypes/documents/themeSettings.ts` — CMS schema for editing colors
- `theme.utils.ts` — Utility functions to fetch and apply theme
- `THEME_INTEGRATION_GUIDE.md` — This guide

---

**You're all set!** 🎉 Your content team can now change website colors directly from Sanity without touching code.
