import { defineField, defineType } from "sanity"

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "About Me",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: "content",
      title: "Content",
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
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
      name: "resumeUrl",
      title: "Resume URL",
      type: "url",
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
              title: "Skill Name",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "category",
              type: "string",
              title: "Category",
              options: {
                list: [
                  { title: "Design", value: "design" },
                  { title: "Frontend", value: "frontend" },
                  { title: "Backend", value: "backend" },
                  { title: "Mobile", value: "mobile" },
                  { title: "Tools", value: "tools" },
                  { title: "Other", value: "other" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "level",
              type: "string",
              title: "Level",
              options: {
                list: [
                  { title: "Beginner", value: "beginner" },
                  { title: "Intermediate", value: "intermediate" },
                  { title: "Advanced", value: "advanced" },
                  { title: "Expert", value: "expert" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "years",
              type: "number",
              title: "Years of Experience",
              validation: (Rule) => Rule.min(0).max(50),
            },
          ],
        },
      ],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "company",
              type: "string",
              title: "Company",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "position",
              type: "string",
              title: "Position",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "startDate",
              type: "date",
              title: "Start Date",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "endDate",
              type: "date",
              title: "End Date",
            },
            {
              name: "current",
              type: "boolean",
              title: "Current Position",
              initialValue: false,
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: "location",
              type: "string",
              title: "Location",
            },
            {
              name: "companyUrl",
              type: "url",
              title: "Company URL",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "institution",
              type: "string",
              title: "Institution",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "degree",
              type: "string",
              title: "Degree",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "field",
              type: "string",
              title: "Field of Study",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "startDate",
              type: "date",
              title: "Start Date",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "endDate",
              type: "date",
              title: "End Date",
            },
            {
              name: "description",
              type: "text",
              title: "Description",
              rows: 2,
            },
            {
              name: "location",
              type: "string",
              title: "Location",
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
})
