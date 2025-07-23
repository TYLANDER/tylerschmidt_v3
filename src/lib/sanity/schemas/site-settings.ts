import { defineField, defineType } from "sanity"

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "Site URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
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
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: { accept: ".ico,.png,.svg" },
    }),
    defineField({
      name: "analytics",
      title: "Analytics",
      type: "object",
      fields: [
        {
          name: "googleAnalyticsId",
          type: "string",
          title: "Google Analytics ID",
          description: "Format: G-XXXXXXXXXX",
        },
        {
          name: "plausibleDomain",
          type: "string",
          title: "Plausible Domain",
          description: "Your domain for Plausible Analytics",
        },
      ],
    }),
    defineField({
      name: "social",
      title: "Default Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: {
                list: [
                  { title: "Twitter", value: "twitter" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "GitHub", value: "github" },
                  { title: "Dribbble", value: "dribbble" },
                  { title: "Behance", value: "behance" },
                  { title: "Instagram", value: "instagram" },
                  { title: "YouTube", value: "youtube" },
                  { title: "Figma", value: "figma" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              type: "url",
              title: "URL",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "username",
              type: "string",
              title: "Username",
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}) 