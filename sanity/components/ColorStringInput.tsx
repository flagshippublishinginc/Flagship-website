import React from 'react'
import { StringInputProps } from 'sanity'
import { Box, Flex, Card } from '@sanity/ui'

export function ColorStringInput(props: StringInputProps) {
    const { value } = props

    return (
        <Flex gap={3} align="center">
            <Box flex={1}>
                {props.renderDefault(props)}
            </Box>
            <Card
                border
                radius={2}
                style={{
                    backgroundColor: value || 'transparent',
                    width: '35px',
                    height: '35px',
                    flexShrink: 0,
                    border: '1px solid #ddd'
                }}
            />
        </Flex>
    )
}
