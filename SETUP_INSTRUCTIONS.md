# Sanity Setup Complete! 🎉

## Your Setup:
- **Sanity Studio URL**: https://tylerschmidt-portfolio.sanity.studio/
- **Project ID**: w41634kr
- **Dataset**: production

## Important Steps:

### 1. Create `.env.local` file
Copy the contents from `env.template` to `.env.local`:
```bash
cp env.template .env.local
```

### 2. Add Environment Variables to Vercel
Go to your Vercel project settings and add these environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` = `w41634kr`
- `NEXT_PUBLIC_SANITY_DATASET` = `production`
- `NEXT_PUBLIC_SANITY_API_VERSION` = `2024-01-01`

### 3. Start Adding Content
Visit your studio at: https://tylerschmidt-portfolio.sanity.studio/

### 4. Local Development
Run Sanity Studio locally:
```bash
npx sanity dev
```

## Content Structure:
- **Projects**: Add your portfolio projects with:
  - Title, slug, client info
  - Featured images and galleries
  - Rich text descriptions
  - Technologies used
  - Live/GitHub links

## Your Pages:
- `/work` - All projects
- `/work/[slug]` - Individual project pages
- Homepage - Featured projects (mark as featured in Sanity)

## Need to Import Existing Content?
Use the import script at `scripts/import-projects.js` as a template.
