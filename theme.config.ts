// Color Palette for Flagship Publication
export const colorPalette = {
  // Background colors
  backgroundLight: '#F8F6F3',  // Warm ivory white
  backgroundMid: '#EAE6DF',    // Subtle beige for dividers/cards
  
  // Text colors
  primaryText: '#1A1A1A',      // Deep neutral black
  secondaryText: '#4B4B4B',    // Gray tone for subheads/metadata
  
  // Borders and dividers
  borders: '#DDD8D1',          // Soft neutral gray
  
  // Accent and CTA (Terracotta red)
  primaryAccent: '#C63C22',    // Main accent/CTA/link hover
  accentHover: '#8B2A17',      // Darker for hover/active states
  
  // Button text
  buttonText: '#FFFFFF',       // Pure white on accent
}

// CSS-in-JS styles for global application
export const globalStyles = `
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

button, [role="button"] {
  background-color: ${colorPalette.primaryAccent};
  color: ${colorPalette.buttonText};
}

button:hover, [role="button"]:hover {
  background-color: ${colorPalette.accentHover};
}

input, textarea, select {
  border-color: ${colorPalette.borders};
}

.sanity-studio {
  --_base-bg-color: ${colorPalette.backgroundLight};
  --_border-color: ${colorPalette.borders};
  --_text-color: ${colorPalette.primaryText};
}
`
