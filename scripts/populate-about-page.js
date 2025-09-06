const { createClient } = require("@sanity/client")
require("dotenv").config()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your .env.local
  useCdn: false,
})

const aboutPageContent = {
  _type: "about",
  title: "About",
  headline: "Building for humans in a world of evolving technology",
  // Note: You'll need to upload the portrait image manually in Sanity Studio
  // The image is currently at: /images/tyler-portrait@2x.jpg
  bioFirstParagraph:
    "Currently optimizing commerce experiences at Adobe, where every pixel impacts millions in revenue. Previously transformed digital experiences at Ubisoft and led product design at Strangelove.",
  bioSecondParagraph:
    "Johns Hopkins alumni. Google intern turned Silicon Valley designer. Nielsen Norman certified. Great design is reducing the friction between a person and their goal - making the experience seamless.",
  expertiseSection: {
    title: "What I Do",
    skills: [
      {
        icon: "💰",
        title: "Conversion Optimization",
        description:
          "Turning friction into flow. Specializing in checkout experiences that convert.",
      },
      {
        icon: "🤖",
        title: "AI & Emerging Tech",
        description:
          "Making complex technology feel human. From AI interfaces to Web3 experiences.",
      },
      {
        icon: "📊",
        title: "Strategic Design",
        description:
          "Every decision backed by data. Design that drives business outcomes.",
      },
      {
        icon: "🎯",
        title: "Systems Thinking",
        description:
          "Building experiences that scale. From components to ecosystems.",
      },
      {
        icon: "🤝",
        title: "Cross-Functional Leadership",
        description:
          "Bridging design, engineering, and business. Fluent in multiple disciplines.",
      },
      {
        icon: "⚡",
        title: "Prototyping & Engineering",
        description:
          "From concept to code. Bringing ideas to life with interactive prototypes.",
      },
    ],
  },
  philosophyQuote: {
    quote:
      "The best designs are invisible. They don't announce themselves—they simply work.",
    showAttribution: false,
  },
  careerHighlights: {
    title: "Career Highlights",
    highlights: [
      {
        company: "Adobe",
        description:
          "Leading commerce growth initiatives, optimizing buy flows at scale",
      },
      {
        company: "Ubisoft",
        description:
          "Complete redesign of Ubisoft.com, transforming their digital presence",
      },
      {
        company: "SketchSite",
        description:
          "Product lead for innovative multichain wallet experiences",
      },
    ],
  },
  seo: {
    metaTitle: "About - Tyler Schmidt",
    metaDescription:
      "Product Designer crafting the future of digital commerce at Adobe. Specializing in conversion optimization and emerging technologies.",
  },
}

async function createOrUpdateAboutPage() {
  try {
    // Check if an about page already exists
    const existingAbout = await client.fetch(`*[_type == "about"][0]`)

    if (existingAbout) {
      console.log("Updating existing About page...")
      const result = await client
        .patch(existingAbout._id)
        .set(aboutPageContent)
        .commit()
      console.log("About page updated successfully!", result._id)
    } else {
      console.log("Creating new About page...")
      const result = await client.create(aboutPageContent)
      console.log("About page created successfully!", result._id)
    }
  } catch (error) {
    console.error("Error creating/updating About page:", error)
  }
}

// Run the script
createOrUpdateAboutPage()
