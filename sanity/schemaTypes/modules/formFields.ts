import {defineType} from 'sanity'

export default defineType({
  name: 'formContent',
  title: 'Form Module',
  type: 'object',
  fields: [
    {
      name: 'rowLayout',
      title: 'Row Layout',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'row',
          title: 'Row',
          fields: [
            {
              name: 'columnType',
              title: 'Column Type',
              type: 'string',
              options: {
                list: [
                  {title: 'One Column', value: 'one'},
                  {title: 'Two Column', value: 'two'},
                  {title: 'Three Column', value: 'three'},
                ],
                layout: 'dropdown',
              },
            },

            {
              name: 'formFields',
              title: 'Form Fields',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'formField',
                  title: 'Form Field',
                  fields: [
                    // ✅ Always Visible
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'type',
                      title: 'Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Text', value: 'text'},
                          {title: 'Email', value: 'email'},
                          {title: 'Phone', value: 'phone'},
                          {title: 'Number', value: 'number'},
                          {title: 'Date', value: 'date'},
                          {title: 'Date & Time', value: 'datetime'},
                          {title: 'Select', value: 'select'},
                          {title: 'Radio', value: 'radio'},
                          {title: 'Checkbox', value: 'checkbox'},
                          {title: 'File', value: 'file'},
                          {title: 'Image', value: 'image'},
                          {title: 'URL', value: 'url'},
                          {title: 'Text Area', value: 'textarea'},
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    },

                    {
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: false,
                    },

                    // ✅ Show ONLY for radio/checkbox
                    {
                      name: 'defaultChecked',
                      title: 'Default Checked',
                      type: 'boolean',
                      initialValue: false,
                      hidden: ({parent}: any) => !['radio', 'checkbox'].includes(parent?.type),
                    },

                    // ✅ Hide for radio/checkbox
                    {
                      name: 'defaultValue',
                      title: 'Default Value',
                      type: 'string',
                      hidden: ({parent}: any) => ['radio', 'checkbox'].includes(parent?.type),
                    },

                    {
                      name: 'placeholder',
                      title: 'Placeholder',
                      type: 'string',
                      hidden: ({parent}: any) => ['radio', 'checkbox'].includes(parent?.type),
                    },

                    // ✅ Options ONLY for select
                    {
                      name: 'options',
                      title: 'Options',
                      type: 'array',
                      of: [{type: 'string'}],
                      hidden: ({parent}: any) => parent?.type !== 'select',
                      validation: (Rule) =>
                        Rule.custom((value: any, context: any) => {
                          const fieldType = context.parent?.type
                          if (fieldType === 'select' && (!value || value.length === 0)) {
                            return 'Options are required for select field'
                          }
                          return true
                        }),
                    },
                  ],

                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'type',
                    },
                  },
                },
              ],

              validation: (Rule) =>
                Rule.custom((value: any, context: any) => {
                  const columnType = context.parent?.columnType

                  if (!value || value.length === 0) {
                    return 'At least one form field is required'
                  }

                  if (columnType === 'one' && value.length > 1) {
                    return 'Only 1 field allowed in One Column layout'
                  }

                  if (columnType === 'two' && value.length > 2) {
                    return 'Maximum 2 fields allowed in Two Column layout'
                  }

                  if (columnType === 'three' && value.length > 3) {
                    return 'Maximum 3 fields allowed in Three Column layout'
                  }

                  return true
                }),
            },
          ],

          preview: {
            select: {
              columnType: 'columnType',
              fields: 'formFields',
            },
            prepare({columnType, fields}: any) {
              return {
                title:
                  columnType.charAt(0).toUpperCase() + columnType.slice(1) + ' Column' || 'Row',
                subtitle: `${fields?.length || 0} field(s)`,
              }
            },
          },
        },
      ],
    },
  ],

  preview: {
    select: {
      rows: 'rowLayout',
    },
    prepare({rows}: any) {
      return {
        title: 'Form Content',
        subtitle: `${rows?.length || 0} row(s)`,
      }
    },
  },
})
