import {defineType, defineField} from 'sanity'

export default defineType ({
    name: 'richTextModule',
    title: 'Rich Text Module',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            type: 'array',
            title: 'Content',
            of: [{type: 'block'}]
        })
    ]
        ,
        preview: {
            select: { content: 'content' },
            prepare({ content }) {
                const firstBlock = Array.isArray(content) && content.find(Boolean)
                const title = firstBlock && firstBlock.children && firstBlock.children[0] && firstBlock.children[0].text
                return { title: title ? title.slice(0, 60) : 'Rich Text' }
            }
        }
})