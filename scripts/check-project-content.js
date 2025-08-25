import { client } from '../sanity/lib/client.js'

async function checkProjectContent() {
  console.log('Checking project content formatting...\n')

  try {
    // Fetch all projects
    const projects = await client.fetch(`
      *[_type == "project"] | order(year desc) {
        title,
        slug,
        overview,
        "hasHeadings": count(overview[style in ["h2", "h3", "h4"]]) > 0,
        "hasBold": count(overview[markDefs[]._type == "strong"]) > 0,
        "hasLists": count(overview[listItem == "bullet" || listItem == "number"]) > 0,
        "overviewLength": length(pt::text(overview))
      }
    `)

    console.log(`Found ${projects.length} projects\n`)

    // Check each project
    projects.forEach(project => {
      console.log(`📄 ${project.title}`)
      console.log(`   URL: /work/${project.slug}`)
      
      const issues = []
      
      if (!project.hasHeadings) {
        issues.push('❌ No section headings (H2/H3) found')
      } else {
        console.log('   ✅ Has section headings')
      }
      
      if (!project.hasBold) {
        issues.push('⚠️  No bold/strong emphasis found')
      } else {
        console.log('   ✅ Uses bold text')
      }
      
      if (!project.hasLists && project.overviewLength > 500) {
        issues.push('⚠️  Consider using lists for better readability')
      }
      
      if (project.overviewLength < 200) {
        issues.push('⚠️  Overview seems short, consider adding more detail')
      }
      
      if (issues.length > 0) {
        console.log('   Issues to address:')
        issues.forEach(issue => console.log(`   ${issue}`))
      } else {
        console.log('   ✨ Content formatting looks good!')
      }
      
      console.log('')
    })

    console.log('\nContent Formatting Tips:')
    console.log('1. Use ## for main section headers (Project Overview, Design Process, etc.)')
    console.log('2. Use ### for subsection headers')
    console.log('3. Use **bold** for emphasis on key terms and metrics')
    console.log('4. Use bullet lists for features, technologies, and outcomes')
    console.log('5. See SANITY_CONTENT_FORMATTING.md for detailed guidelines')

  } catch (error) {
    console.error('Error checking content:', error)
  }
}

checkProjectContent()
