import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'ctaBannerModule',
  title: 'CTA Banner',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'description', type: 'string', title: 'Description'}),
    defineField({name: 'buttonText', type: 'string', title: 'Button Text'}),
    defineField({name: 'buttonLink', type: 'url', title: 'Button Link'}),
    defineField({name: 'image', type: 'image', title: 'Image'}),
  ],
  preview: {
    select: {
      image: 'image',
      title: 'title',
      description: 'description',
      buttonText: 'buttonText',
      buttonLink: 'buttonLink',
    },
    prepare({title, description, buttonText, buttonLink, image}) {
      return {
        title: title || 'CTA Banner',
        description: description ? `CTA: ${description}` : undefined,
        buttonText: buttonText ? `CTA: ${buttonText}` : undefined,
        buttonLink: buttonLink ? `CTA: ${buttonLink}` : undefined,
        media: image,
      }
    },
  },
})
