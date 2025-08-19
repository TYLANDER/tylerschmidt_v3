# Sanity CMS Guide for Your Portfolio

## Understanding Sanity

Sanity is a headless CMS that separates your content from your presentation. Here's how it works:

1. **Content is stored in Sanity's cloud** (not in your codebase)
2. **You edit content in Sanity Studio** (the interface you're seeing now)
3. **Your Next.js app fetches this content** via API calls

## Step-by-Step: Adding Your First Project

### 1. In Sanity Studio (https://tylerschmidt-portfolio.sanity.studio/)

1. **Click "Project" in the left sidebar**
2. **Click the "+" button** or "Create new Project"
3. **Fill in the fields:**
   - **Title**: e.g., "Nike Innovation Lab"
   - **Slug**: This becomes the URL (e.g., "nike-innovation-lab" → `/work/nike-innovation-lab`)
   - **Client**: Company name
   - **Year**: Project year
   - **Category**: Type of work (e.g., "Brand Identity", "Web Design", "Mobile App")
   - **Description**: Short tagline (shows on project cards)
   - **Overview**: Rich text editor for the full project story
     - Use formatting tools (bold, italic, lists)
     - Add multiple paragraphs
     - Include project details
   - **Featured Image**: Main project image (drag & drop or click to upload)
   - **Gallery**: Additional project images
   - **Live URL**: Link to live project (optional)
   - **GitHub URL**: Repository link (optional)

4. **Click "Publish"** to save

### 2. Understanding the Rich Text Editor (Overview Field)

The Overview field uses "Portable Text" which gives you:
- **Headings** (H2, H3, H4)
- **Bold/Italic** text
- **Bullet/Numbered lists**
- **Links**
- **Block quotes**

Example structure:
```
## The Challenge
Nike needed a digital experience that...

## Our Approach
We designed a system that...

### Key Features
- Real-time data visualization
- Progressive web app capabilities
- Gesture-based interactions

## The Impact
The project resulted in...
```

### 3. Image Best Practices

- **Featured Image**: 16:9 ratio works best (e.g., 1920x1080)
- **Gallery Images**: Can be any ratio, but consistent sizes look better
- **File Types**: JPG for photos, PNG for graphics with transparency
- **File Size**: Keep under 2MB for performance

### 4. Viewing Your Content

After publishing in Sanity:
1. Visit `/work` on your site to see all projects
2. Click a project to see its detail page at `/work/[slug]`
3. Featured projects will appear on your homepage

### 5. Content Strategy Tips

**Project Order**: Add projects in the order you want them displayed

**Categories**: Be consistent with category names:
- "Brand Identity"
- "Web Design"
- "Mobile App"
- "UI/UX Design"
- "Motion Design"

**Descriptions**: Keep them short and impactful (50-100 characters)

**Slugs**: Use lowercase with hyphens (no spaces or special characters)

## Quick Reference: Your Content Flow

```
Sanity Studio → Cloud Database → Your Next.js App → Live Website
     ↓                                    ↓
  You edit here                    Fetches content via API
```

## Common Tasks

### Edit Existing Project
1. Click on the project in Sanity Studio
2. Make changes
3. Click "Publish"

### Delete Project
1. Click on the project
2. Click the menu (three dots)
3. Select "Delete"
4. Confirm

### Reorder Projects
Currently, projects display in the order they were created. To feature specific projects, we can add a "featured" toggle or order field later.

## Need Help?

- **Sanity Documentation**: https://www.sanity.io/docs
- **Your Schema**: Located in `/sanity/schemas/project.ts`
- **Queries**: Located in `/sanity/lib/queries.ts`
