import { defineCollection, z } from 'astro:content';

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
    date: z.date()
  })
});

const aboutCollection = defineCollection({
  type: "content"
})

export const collections = {
  'projects': projectCollection,
  'about': aboutCollection
};