import React from 'react'
import { defineType, defineField } from 'sanity'
import { ColorStringInput } from '../../components/ColorStringInput'

export default defineType({
  name: 'themeSettings',
  title: 'Theme Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Theme Name',
      type: 'string',
      initialValue: 'Primary Theme',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'site',
      title: 'Site',
      type: 'reference',
      to: [{ type: 'site' }],
      validation: Rule => Rule.required()
    }),


    // Logos
    defineField({
      name: 'logo',
      title: 'Logos',
      type: 'object',
      fields: [
        defineField({
          name: 'dark',
          title: 'Dark Logo (for light backgrounds)',
          type: 'image',
          options: { hotspot: true }
        }),
        defineField({
          name: 'light',
          title: 'Light Logo (for dark backgrounds)',
          type: 'image',
          options: { hotspot: true }
        })
      ]
    }),

    // Background Colors

    defineField({
      name: 'backgroundSection',
      title: 'Background Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'lightColor',
          title: 'Background Light',
          description: 'Warm ivory white; keeps pages bright without starkness',
          type: 'string',
          initialValue: '#F8F6F3',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'midColor',
          title: 'Background Mid',
          description: 'Subtle beige divider tone for section breaks or cards',
          type: 'string',
          initialValue: '#EAE6DF',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        })
      ]
    }),

    // Text Colors
    defineField({
      name: 'textSection',
      title: 'Text Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryColor',
          title: 'Primary Text',
          description: 'Deep neutral black for maximum readability',
          type: 'string',
          initialValue: '#1A1A1A',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'secondaryColor',
          title: 'Secondary Text',
          description: 'Gray tone for subheads, captions, metadata',
          type: 'string',
          initialValue: '#4B4B4B',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        })
      ]
    }),

    // Borders and Lines
    defineField({
      name: 'borderColor',
      title: 'Lines / Borders',
      description: 'Soft neutral gray for dividers',
      type: 'string',
      initialValue: '#DDD8D1',
      components: { input: ColorStringInput },
      validation: Rule => Rule.required()
    }),

    // Accent Colors
    defineField({
      name: 'accentSection',
      title: 'Accent & CTA Colors',
      type: 'object',
      fields: [
        defineField({
          name: 'primaryAccentColor',
          title: 'Primary Accent / CTA / Link Hover',
          description: 'Terracotta red – warm, human, rooted',
          type: 'string',
          initialValue: '#C63C22',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'hoverAccentColor',
          title: 'Accent Hover / Active State',
          description: 'Slightly darker shade for hover depth',
          type: 'string',
          initialValue: '#8B2A17',
          components: { input: ColorStringInput },
          validation: Rule => Rule.required()
        })
      ]
    }),

    // Button Text Color
    defineField({
      name: 'buttonTextColor',
      title: 'Button Text (on accent)',
      description: 'Pure white; passes accessibility contrast',
      type: 'string',
      initialValue: '#FFFFFF',
      components: { input: ColorStringInput },
      validation: Rule => Rule.required()
    }),

    // Font family selection
    defineField({
      name: 'fontFamily',
      title: 'Font Family',
      type: 'string',
      description: 'Select the base font family used across the site',
      initialValue: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      options: {
        list: [
          { title: 'System (sans)', value: 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' },
          { title: 'Inter', value: 'Inter, ui-sans-serif, system-ui' },
          { title: 'Roboto', value: 'Roboto, Helvetica, Arial, sans-serif' },
          { title: 'Montserrat', value: 'Montserrat, sans-serif' },
          { title: 'Georgia (serif)', value: 'Georgia, serif' },
          { title: 'Merriweather (serif)', value: 'Merriweather, serif' }
        ]
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: 'useGoogleFont',
      title: 'Use Google Font',
      type: 'boolean',
      description: 'If enabled, provide a Google Fonts URL in the field below',
      initialValue: false
    }),

    defineField({
      name: 'googleFontUrl',
      title: 'Google Fonts URL',
      type: 'url',
      description: 'Paste the Google Fonts embed URL (e.g. https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap). This will be loaded on the frontend when enabled.',
      hidden: ({ document }) => !document?.useGoogleFont
    }),

    // Preview note
    defineField({
      name: 'note',
      title: 'Info',
      type: 'array',
      of: [{
        type: 'block',
        styles: [
          { title: 'Normal', value: 'normal' },
          { title: 'Quote', value: 'blockquote' }
        ]
      }],
      initialValue: [
        {
          _type: 'block',
          children: [
            {
              _type: 'span',
              text: '💡 Tip: Change any color and click "Publish" to instantly update your entire website theme. All colors must be valid hex codes (e.g., #FFFFFF).'
            }
          ]
        }
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      accentPrimary: 'accentSection.primaryAccentColor',
      backgroundLight: 'backgroundSection.lightColor',
      fontFamily: 'fontFamily'
    },
    prepare({ title, accentPrimary, backgroundLight, fontFamily }) {
      const primary = accentPrimary || '#C63C22'
      const bg = backgroundLight || '#F8F6F3'

      // small SVG swatch showing primary (left) and background (right)
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'>` +
        `<rect width='20' height='20' fill='${primary}' />` +
        `<rect x='20' width='20' height='20' fill='${bg}' />` +
        `</svg>`
      const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

      return {
        title: title || 'Theme Settings',
        subtitle: `Accent: ${primary} · Font: ${fontFamily || 'Inter'}`,
        // return a small image element as media so React doesn't treat the data URL as a tag name
        media: () => (
          React.createElement('img', { src: dataUrl, alt: 'swatch', style: { width: 40, height: 20, display: 'block' } })
        )
      }
    }
  }
})
