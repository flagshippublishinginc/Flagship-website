import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statsModule',
  title: 'Statistics',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', type: 'string', title: 'Label'},
          {name: 'value', type: 'string', title: 'Value'}
        ]
      }]
    })
  ]
  ,
  preview: {
    select: { stats: 'stats' },
    prepare({ stats }) {
      const c = Array.isArray(stats) ? stats.length : 0
      return { title: 'Statistics', subtitle: `${c} items` }
    }
  }
})
