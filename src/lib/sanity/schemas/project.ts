import { defineField, defineType } from "sanity"

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "longDescription",
      title: "Long Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "projectCategory" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Completed", value: "completed" },
          { title: "In Progress", value: "in-progress" },
          { title: "Concept", value: "concept" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "completed",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "url",
              type: "url",
              title: "Video URL",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              type: "string",
              title: "Video Title",
            },
            {
              name: "poster",
              type: "image",
              title: "Poster Image",
              options: { hotspot: true },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
              title: "Link Title",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "type",
              type: "string",
              title: "Link Type",
              options: {
                list: [
                  { title: "Website", value: "website" },
                  { title: "GitHub", value: "github" },
                  { title: "App Store", value: "app-store" },
                  { title: "Play Store", value: "play-store" },
                  { title: "Figma", value: "figma" },
                  { title: "Behance", value: "behance" },
                  { title: "Dribbble", value: "dribbble" },
                  { title: "Other", value: "other" },
                ],
              },
              initialValue: "website",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      category: "category.title",
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
}) 