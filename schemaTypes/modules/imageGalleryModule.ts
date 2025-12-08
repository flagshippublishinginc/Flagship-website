import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'imageGalleryModule',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image'}],
      title: 'Gallery Images'
    })
  ]
  ,
  preview: {
    select: { media: 'images.0' },
    prepare({ media }) {
      return { title: 'Image Gallery', subtitle: media ? 'Gallery image' : 'No images', media }
    }
  }
})
