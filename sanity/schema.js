export const schema = {
    types: [
        {
            name: 'post',
            title: 'Post',
            type: 'document',
            fields: [
                {
                    name: 'title',
                    title: 'Title',
                    type: 'string',
                },
                {
                    name: 'slug',
                    title: 'Slug',
                    type: 'slug',
                    options: { source: 'title' },
                },
                {
                    name: 'content',
                    title: 'Content',
                    type: 'array',
                    of: [{ type: 'block' }],
                },
                {
                    name: 'mainImage',
                    title: 'Main image',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'publishedAt',
                    title: 'Published at',
                    type: 'datetime',
                }
            ],
        },
        {
            name: 'project',
            title: 'Project',
            type: 'document',
            fields: [
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text' },
                { name: 'link', title: 'Link', type: 'url' },
                { name: 'image', title: 'Image', type: 'image' },
            ]
        }
    ],
}
