import { defineField, defineType } from "sanity"

export default defineType({
  name: "projectCategory",
  title: "Project Category",
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
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Blue", value: "#3b82f6" },
          { title: "Green", value: "#10b981" },
          { title: "Purple", value: "#8b5cf6" },
          { title: "Pink", value: "#ec4899" },
          { title: "Orange", value: "#f59e0b" },
          { title: "Red", value: "#ef4444" },
          { title: "Gray", value: "#6b7280" },
        ],
      },
      initialValue: "#3b82f6",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
})
