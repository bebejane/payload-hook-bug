import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    description: 'Post',
    livePreview: {
      url: async ({ data: doc }) => {
        return `http://localhost:3000/posts/${doc.slug}`
      },
    },
    preview: async (doc) => {
      return `http://localhost:3000/posts/${doc.slug}`
    },
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  /*
  versions: {
    drafts: { 
      autosave: {
        interval: 300,
      },
    },
  },
  */
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'text',
      label: 'Text',
      type: 'text',
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        if (data && data.title) {
          data.slug = data?.title?.replace(/\s+/g, '-').toLowerCase()
        }
        return data
      },
    ],
  },
}
