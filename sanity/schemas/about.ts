import { defineField, defineType } from "sanity"
import { UserIcon } from "@sanity/icons"

export default defineType({
  name: "about",
  title: "About Page",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headline",
      title: "Main Headline",
      type: "string",
      description: "The impactful headline at the top of the page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "portraitImage",
      title: "Portrait Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for SEO and accessibility",
        },
      ],
    }),
    defineField({
      name: "bioFirstParagraph",
      title: "Bio - First Paragraph",
      type: "text",
      rows: 3,
      description:
        "The opening paragraph about your current role and experience",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bioSecondParagraph",
      title: "Bio - Second Paragraph",
      type: "text",
      rows: 3,
      description: "Additional context about your background and philosophy",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "expertiseSection",
      title: "Expertise Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "What I Do",
        }),
        defineField({
          name: "skills",
          title: "Skills",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon Emoji",
                  type: "string",
                  description: "Enter an emoji for this skill",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Skill Title",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Skill Description",
                  type: "text",
                  rows: 2,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  subtitle: "description",
                  icon: "icon",
                },
                prepare({ title, subtitle, icon }) {
                  return {
                    title: `${icon || "📌"} ${title || "Untitled Skill"}`,
                    subtitle: subtitle,
                  }
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "philosophyQuote",
      title: "Philosophy Quote",
      type: "object",
      fields: [
        defineField({
          name: "quote",
          title: "Quote Text",
          type: "text",
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "showAttribution",
          title: "Show Attribution",
          type: "boolean",
          description:
            'Whether to show "— My Design Philosophy" below the quote',
          initialValue: false,
        }),
      ],
    }),
    defineField({
      name: "careerHighlights",
      title: "Career Highlights",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Career Highlights",
        }),
        defineField({
          name: "highlights",
          title: "Highlights",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "company",
                  title: "Company/Project Name",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "company",
                  subtitle: "description",
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "object",
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          description: "Title for search engines",
        }),
        defineField({
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          description: "Description for search engines",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "About Page",
        subtitle: "About page content",
      }
    },
  },
})
