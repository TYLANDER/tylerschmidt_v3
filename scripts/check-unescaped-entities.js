#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const glob = require('glob')

// ANSI color codes
const RED = '\x1b[31m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RESET = '\x1b[0m'

// Pattern to find unescaped apostrophes in JSX text content
const patterns = [
  // Match text prop with unescaped quotes
  /text=["']([^"']*[^&]'[^"']*|[^"']*[^&]"[^"']*|[^"']*[^&]<[^"']*|[^"']*[^&]>[^"']*)["']/g,
  // Match children content with unescaped quotes
  />([^<]*[^&]'[^<]*|[^<]*[^&]"[^<]*|[^<]*[^&]<[^<]*|[^<]*[^&]>[^<]*)</g,
]

// Common false positives to ignore
const falsePositives = [
  "don't", "can't", "won't", "isn't", "aren't", "wasn't", "weren't",
  "I'm", "you're", "we're", "they're", "he's", "she's", "it's",
  "I've", "you've", "we've", "they've",
  "I'd", "you'd", "we'd", "they'd",
  "I'll", "you'll", "we'll", "they'll",
  "let's", "that's", "what's", "there's", "here's",
  "shouldn't", "couldn't", "wouldn't", "hasn't", "haven't",
  "didn't", "doesn't", "hadn't"
]

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const lines = content.split('\n')
  const issues = []

  lines.forEach((line, index) => {
    // Skip lines that are comments or imports
    if (line.trim().startsWith('//') || line.trim().startsWith('import') || line.trim().startsWith('*')) {
      return
    }

    // Check for text prop patterns
    const textPropMatch = line.match(/text=["']([^"']*)["']/g)
    if (textPropMatch) {
      textPropMatch.forEach(match => {
        // Extract the content between quotes
        const textContent = match.slice(6, -1) // Remove text=" and trailing "
        
        // Check for unescaped apostrophes
        falsePositives.forEach(word => {
          if (textContent.toLowerCase().includes(word)) {
            issues.push({
              file: filePath,
              line: index + 1,
              content: line.trim(),
              issue: `Unescaped apostrophe in text: ${match}`
            })
          }
        })
        
        // Check for other HTML entities that should be escaped
        if (textContent.includes('<') && !textContent.includes('&lt;')) {
          issues.push({
            file: filePath,
            line: index + 1,
            content: line.trim(),
            issue: `Unescaped < in text: ${match}`
          })
        }
        if (textContent.includes('>') && !textContent.includes('&gt;')) {
          issues.push({
            file: filePath,
            line: index + 1,
            content: line.trim(),
            issue: `Unescaped > in text: ${match}`
          })
        }
      })
    }
  })

  return issues
}

function main() {
  console.log('🔍 Checking for unescaped entities in JSX files...\n')

  // Find all TSX and JSX files
  const files = glob.sync('src/**/*.{tsx,jsx}', {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.next/**']
  })

  let totalIssues = []

  files.forEach(file => {
    const issues = checkFile(file)
    if (issues.length > 0) {
      totalIssues = totalIssues.concat(issues)
    }
  })

  if (totalIssues.length > 0) {
    console.log(`${RED}❌ Found ${totalIssues.length} unescaped entities:${RESET}\n`)
    
    totalIssues.forEach(issue => {
      console.log(`${YELLOW}${issue.file}:${issue.line}${RESET} - ${issue.issue}`)
    })
    
    console.log(`\n${RED}Please escape these entities:${RESET}`)
    console.log("  ' → &apos;")
    console.log('  " → &quot;')
    console.log('  < → &lt;')
    console.log('  > → &gt;')
    console.log('  & → &amp;')
    
    process.exit(1)
  } else {
    console.log(`${GREEN}✅ No unescaped entities found!${RESET}`)
    process.exit(0)
  }
}

// Run the check
main()
