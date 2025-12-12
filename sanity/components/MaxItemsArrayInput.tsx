import React, {useEffect, useRef} from 'react'
import {Box, Card, Text} from '@sanity/ui'

// A small wrapper that renders the default array input and disables/hides
// the "Add item" button when the array length reaches `maxItems`.
// This relies on `props.renderDefault` being available (Sanity Studio input API).

type Props = any

export default function MaxItemsArrayInput(props: Props) {
  const {value, schemaType} = props
  const ref = useRef<HTMLDivElement | null>(null)
  const maxItems = (schemaType?.options && schemaType.options.maxItems) || 3

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Query for buttons that are likely to be the array "Add item" buttons.
    // Sanity uses a few different button labels depending on locale/versions,
    // so check several possibilities.
    const selectors = [
      'button[title^="Add"], button[aria-label^="Add"], button[aria-label*="add"], button[title*="add"]',
    ].join(', ')

    const buttons = Array.from(el.querySelectorAll<HTMLButtonElement>(selectors))

    const shouldDisable = Array.isArray(value) && value.length >= maxItems

    buttons.forEach((btn) => {
      try {
        btn.disabled = shouldDisable
        if (shouldDisable) btn.setAttribute('data-max-disabled', 'true')
        else btn.removeAttribute('data-max-disabled')
      } catch (e) {
        // ignore
      }
    })
  }, [value, schemaType, ref, maxItems])

  return (
    <Box ref={ref}>
      {/* Render the default input UI */}
      {props.renderDefault ? (
        props.renderDefault(props)
      ) : (
        <Card padding={3} tone="caution">
          <Text>Default render not available for this custom input.</Text>
        </Card>
      )}
    </Box>
  )
}
