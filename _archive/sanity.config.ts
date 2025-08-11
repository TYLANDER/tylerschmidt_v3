import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemas } from "./src/lib/sanity/schemas"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: "tyler-schmidt-portfolio",
  title: "Tyler Schmidt Portfolio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("About")
              .child(S.document().schemaType("about").documentId("about")),
            S.listItem()
              .title("Contact")
              .child(S.document().schemaType("contact").documentId("contact")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (listItem) =>
                !["siteSettings", "about", "contact"].includes(
                  listItem.getId() || ""
                )
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
})
