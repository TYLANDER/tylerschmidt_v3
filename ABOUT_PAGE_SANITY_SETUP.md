# About Page Sanity Setup Guide

## Overview

The About page is now fully integrated with Sanity CMS. This guide will help you populate the content and manage it going forward.

## Quick Setup

### 1. Get a Sanity API Token

1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to API → Tokens
4. Create a new token with "Editor" permissions
5. Copy the token

### 2. Add Token to Environment

Add this to your `.env.local` file:

```
SANITY_API_TOKEN=your_token_here
```

### 3. Run the Population Script

```bash
node scripts/populate-about-page.js
```

This will create or update your About page with all the content from the hardcoded version.

## Manual Content Entry (Alternative)

If you prefer to enter content manually through Sanity Studio:

1. Open Sanity Studio (http://localhost:3333)
2. Click on "About Page" in the sidebar
3. Fill in the following fields:

### Basic Information

- **Page Title**: About
- **Main Headline**: Building for humans in a world of evolving technology

### Portrait Image

- Upload your portrait image (recommended: at least 800px wide)
- Add alt text: "Tyler Schmidt - Product Designer"

### Bio Paragraphs

- **First Paragraph**: Currently optimizing commerce experiences at Adobe, where every pixel impacts millions in revenue. Previously transformed digital experiences at Ubisoft and led product design at Strangelove.
- **Second Paragraph**: Johns Hopkins alumni. Google intern turned Silicon Valley designer. Nielsen Norman certified. Great design is reducing the friction between a person and their goal - making the experience seamless.

### Expertise Section

**Section Title**: What I Do

Add these skills (click "Add item" for each):

1. **Conversion Optimization**
   - Icon: 💰
   - Description: Turning friction into flow. Specializing in checkout experiences that convert.

2. **AI & Emerging Tech**
   - Icon: 🤖
   - Description: Making complex technology feel human. From AI interfaces to Web3 experiences.

3. **Strategic Design**
   - Icon: 📊
   - Description: Every decision backed by data. Design that drives business outcomes.

4. **Systems Thinking**
   - Icon: 🎯
   - Description: Building experiences that scale. From components to ecosystems.

5. **Cross-Functional Leadership**
   - Icon: 🤝
   - Description: Bridging design, engineering, and business. Fluent in multiple disciplines.

6. **Prototyping & Engineering**
   - Icon: ⚡
   - Description: From concept to code. Bringing ideas to life with interactive prototypes.

### Philosophy Quote

- **Quote**: The best designs are invisible. They don't announce themselves—they simply work.
- **Show Attribution**: false (unchecked)

### Career Highlights

**Section Title**: Career Highlights

Add these highlights:

1. **Adobe**: Leading commerce growth initiatives, optimizing buy flows at scale
2. **Ubisoft**: Complete redesign of Ubisoft.com, transforming their digital presence
3. **SketchSite**: Product lead for innovative multichain wallet experiences

### SEO Settings

- **Meta Title**: About - Tyler Schmidt
- **Meta Description**: Product Designer crafting the future of digital commerce at Adobe. Specializing in conversion optimization and emerging technologies.

## Editing Content

Once the content is in Sanity, you can easily update it anytime:

1. Go to Sanity Studio
2. Click on "About Page"
3. Make your changes
4. Click "Publish"
5. Changes will be live immediately on your website

## Benefits of Sanity Integration

- ✅ Edit content without code changes
- ✅ Preview changes before publishing
- ✅ Version history and rollback capabilities
- ✅ SEO metadata management
- ✅ Image optimization handled automatically
- ✅ No need to redeploy for content updates

## Troubleshooting

If the About page shows a 404:

1. Make sure you've created the About document in Sanity
2. Check that it's published (not just saved as draft)
3. Clear your Next.js cache: `rm -rf .next && npm run dev`

If content isn't updating:

1. Make sure you've published the changes in Sanity
2. The site doesn't use CDN caching, so changes should be immediate
3. Try hard refreshing your browser (Cmd+Shift+R on Mac)
