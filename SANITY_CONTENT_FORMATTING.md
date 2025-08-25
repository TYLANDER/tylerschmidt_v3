# Sanity Content Formatting Guide

This guide helps ensure all project content in Sanity uses proper typography and formatting to match our design system.

## Content Structure for Project Pages

### 1. Project Overview Section

Instead of using normal text for section titles, use proper heading levels:

**❌ Don't do this:**
```
Project Overview
This project involved creating...
```

**✅ Do this:**
```
## Project Overview
This project involved creating...
```

### 2. Common Section Headers

Use these formatted headers for consistency across all projects:

```markdown
## Project Overview
[Your overview content]

## Design Process
[Your design process content]

### Research & Discovery
[Research details]

### User Experience Design
[UX details]

### Visual Design
[Visual design details]

## Technical Implementation
[Technical details]

### Architecture
[Architecture details]

### Key Features
[Features list]

## Challenges & Solutions
[Challenges faced and how they were solved]

## Results & Impact
[Project outcomes]
```

### 3. Text Formatting

#### Bold Text (Strong Emphasis)
Use for important keywords or emphasis:
- **Key Feature:** Description
- **Technology Stack:** React, TypeScript, Next.js
- **Timeline:** 3 months

#### Lists
Use bullet points for features, technologies, or outcomes:

**Features:**
- Real-time collaboration
- Advanced search functionality
- Responsive design
- Accessibility compliance

**Technologies Used:**
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, PostgreSQL
- Infrastructure: AWS, Docker, CI/CD

#### Links
Format links with descriptive text:
- [View live project](https://example.com)
- [Read the case study](https://example.com/case-study)

### 4. Example Project Content Structure

Here's a complete example for a project:

```markdown
## Project Overview

**Destiny** is a comprehensive design system and component library built for a major e-commerce platform. The project aimed to unify the design language across multiple products and teams while improving development efficiency.

## Design Process

### Research & Discovery

We began with extensive **user research** and **stakeholder interviews** to understand:
- Current pain points in the design workflow
- Inconsistencies across products
- Developer needs and constraints

### Design System Architecture

The system was built on three core principles:
- **Modularity:** Components that work independently
- **Scalability:** Easy to extend and maintain
- **Accessibility:** WCAG AAA compliance

## Technical Implementation

### Component Architecture

Built using:
- **React** with TypeScript for type safety
- **Styled Components** for dynamic theming
- **Storybook** for component documentation
- **Jest** and **React Testing Library** for testing

### Key Features

- **40+ Components** covering all UI needs
- **Design Tokens** for consistent spacing, colors, and typography
- **Dark Mode Support** with automatic theme switching
- **Full Accessibility** with keyboard navigation and screen reader support

## Challenges & Solutions

### Challenge: Legacy Code Integration

**Solution:** Created a compatibility layer that allowed gradual migration from the old system.

### Challenge: Performance at Scale

**Solution:** Implemented tree-shaking and lazy loading to reduce bundle size by 60%.

## Results & Impact

- **50% reduction** in design-to-development time
- **90% component reuse** across projects
- **100% accessibility** compliance achieved
- Adopted by **12 product teams** within 6 months
```

## Sanity Editor Tips

### Using the Portable Text Editor

1. **Headings:** Use the dropdown to select H2, H3, H4 (never H1 - that's reserved for the page title)
2. **Bold:** Select text and click B or use Cmd/Ctrl + B
3. **Lists:** Use the list buttons for bullet points or numbered lists
4. **Links:** Select text and click the link button

### Visual Hierarchy

- **H2:** Major sections (Project Overview, Design Process, Results)
- **H3:** Subsections (Research, Implementation Details)
- **H4:** Minor sections (specific features or techniques)
- **Bold:** Important terms, metrics, or emphasis
- **Lists:** Features, technologies, outcomes

## Checklist for Each Project

Before publishing, ensure your project has:

- [ ] Clear section headers using H2/H3
- [ ] Bold emphasis on key terms and metrics
- [ ] Properly formatted lists for features/technologies
- [ ] Descriptive link text (not "click here")
- [ ] Consistent structure across all sections
- [ ] Alt text for all images
- [ ] Captions for images where helpful

## Common Sections to Include

1. **Project Overview** - What is it and why was it built?
2. **My Role** - What did you specifically do?
3. **Design Process** - How did you approach the problem?
4. **Technical Details** - What technologies and methods were used?
5. **Challenges & Solutions** - What problems did you solve?
6. **Results & Impact** - What were the outcomes?
7. **Key Learnings** - What did you learn?

Remember: The typography system is already in place in the code. You just need to use proper markdown formatting in Sanity for it to display correctly!
