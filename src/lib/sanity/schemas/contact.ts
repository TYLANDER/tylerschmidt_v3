import { defineField, defineType } from "sanity"

export default defineType({
  name: "contact",
  title: "Contact",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "availability",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Available for Work", value: "available" },
          { title: "Busy", value: "busy" },
          { title: "Unavailable", value: "unavailable" },
        ],
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "preferredContact",
      title: "Preferred Contact Methods",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Email", value: "email" },
              { title: "Phone", value: "phone" },
              { title: "Social Media", value: "social" },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
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
      title: "email",
      subtitle: "location",
    },
  },
}) 