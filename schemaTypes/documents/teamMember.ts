// schemas/documents/teamMember.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'role', type: 'string' }),
    defineField({ name: 'photo', type: 'image' }),
    defineField({ name: 'bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'social', title: 'Social links', type: 'array', of: [{ type: 'link' }] })
  ],
  preview: {
    select: { title: 'name', media: 'photo' }
  }
})
