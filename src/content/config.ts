import { defineCollection, z } from "astro:content";
import { notionLoader, notionPageSchema } from "notion-astro-loader";
import { propertySchema } from "notion-astro-loader/schemas";
import { transformedPropertySchema } from "notion-astro-loader/schemas";

const projectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
    date: z.date(),
  }),
});

const aboutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
  }),
});

const reportNotionCollection = defineCollection({
  loader: notionLoader({
    auth: import.meta.env.NOTION_TOKEN,
    database_id: import.meta.env.NOTION_DATABASE_ID,
  }),
  schema: notionPageSchema({
    properties: z.object({
      Name: transformedPropertySchema.title,
      Author: transformedPropertySchema.rich_text,
      Description: transformedPropertySchema.rich_text,
      Date: propertySchema.last_edited_time,
    }),
  }),
});

export const collections = {
  about: aboutCollection,
  other: defineCollection({
    type: "content",
  }),
  reports: reportNotionCollection,
  projects: projectCollection,
};
