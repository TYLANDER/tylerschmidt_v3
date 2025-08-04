import { execSync } from "child_process"
import fs from "fs"
import path from "path"

describe("Code Quality and Build Tests", () => {
  test("TypeScript type checking should pass", () => {
    try {
      execSync("npm run type-check", { stdio: "pipe" })
    } catch (error) {
      throw new Error(
        `TypeScript type checking failed: ${error.stdout || error.stderr}`
      )
    }
  })

  test("ESLint should pass with no errors", () => {
    try {
      execSync("npm run lint", { stdio: "pipe" })
    } catch (error) {
      throw new Error(`ESLint failed: ${error.stdout || error.stderr}`)
    }
  })

  test("Next.js build should complete successfully", () => {
    try {
      execSync("npm run build", { stdio: "pipe" })
    } catch (error) {
      throw new Error(`Build failed: ${error.stdout || error.stderr}`)
    }
  })

  test("No unescaped entities in JSX files", () => {
    const checkFile = (filePath) => {
      const content = fs.readFileSync(filePath, "utf8")
      const lines = content.split("\n")
      const errors = []

      lines.forEach((line, index) => {
        // Check for unescaped apostrophes in JSX content
        if (
          (line.includes("'") && line.includes("className=")) ||
          line.includes("text=")
        ) {
          const matches = line.match(/[^&]'[^;]/g)
          if (matches) {
            errors.push(
              `Line ${index + 1}: Unescaped apostrophe found: ${line.trim()}`
            )
          }
        }
      })

      return errors
    }

    const tsxFiles = execSync('find src -name "*.tsx"', { encoding: "utf8" })
      .split("\n")
      .filter((file) => file.trim() !== "")

    let allErrors = []
    tsxFiles.forEach((file) => {
      const errors = checkFile(file.trim())
      if (errors.length > 0) {
        allErrors.push(`${file}:\n${errors.join("\n")}`)
      }
    })

    if (allErrors.length > 0) {
      throw new Error(`Unescaped entities found:\n${allErrors.join("\n\n")}`)
    }
  })

  test("No explicit any types in TypeScript files", () => {
    const checkFile = (filePath) => {
      const content = fs.readFileSync(filePath, "utf8")
      const lines = content.split("\n")
      const errors = []

      lines.forEach((line, index) => {
        // Check for explicit any usage (but allow comments and specific patterns)
        if (
          line.includes(": any") &&
          !line.trim().startsWith("//") &&
          !line.trim().startsWith("*")
        ) {
          errors.push(
            `Line ${index + 1}: Explicit 'any' type found: ${line.trim()}`
          )
        }
        if (
          line.includes("as any") &&
          !line.trim().startsWith("//") &&
          !line.trim().startsWith("*")
        ) {
          errors.push(
            `Line ${index + 1}: 'as any' assertion found: ${line.trim()}`
          )
        }
      })

      return errors
    }

    const tsFiles = execSync('find src -name "*.ts" -o -name "*.tsx"', {
      encoding: "utf8",
    })
      .split("\n")
      .filter((file) => file.trim() !== "")

    let allErrors = []
    tsFiles.forEach((file) => {
      const errors = checkFile(file.trim())
      if (errors.length > 0) {
        allErrors.push(`${file}:\n${errors.join("\n")}`)
      }
    })

    if (allErrors.length > 0) {
      throw new Error(`Explicit 'any' types found:\n${allErrors.join("\n\n")}`)
    }
  })

  test("All imports are used", () => {
    try {
      const result = execSync("npm run lint -- --quiet", {
        stdio: "pipe",
        encoding: "utf8",
      })
      // If we get here without error, linting passed
    } catch (error) {
      const output = error.stdout || error.stderr
      if (output.includes("is defined but never used")) {
        throw new Error(`Unused imports found:\n${output}`)
      }
      // Re-throw other errors
      throw error
    }
  })

  test("Next.js Html component not imported outside _document", () => {
    const checkFile = (filePath) => {
      // Skip _document files
      if (filePath.includes("_document")) return []

      const content = fs.readFileSync(filePath, "utf8")
      const lines = content.split("\n")
      const errors = []

      lines.forEach((line, index) => {
        // Check for Next.js Html import (not React Three Fiber Html)
        if (
          line.includes("import") &&
          line.includes("Html") &&
          line.includes("next/")
        ) {
          errors.push(
            `Line ${index + 1}: Next.js Html imported outside _document: ${line.trim()}`
          )
        }
      })

      return errors
    }

    const files = execSync('find src -name "*.ts" -o -name "*.tsx"', {
      encoding: "utf8",
    })
      .split("\n")
      .filter((file) => file.trim() !== "")

    let allErrors = []
    files.forEach((file) => {
      const errors = checkFile(file.trim())
      if (errors.length > 0) {
        allErrors.push(`${file}:\n${errors.join("\n")}`)
      }
    })

    if (allErrors.length > 0) {
      throw new Error(`Invalid Html imports found:\n${allErrors.join("\n\n")}`)
    }
  })
})

describe("Vercel-specific Build Tests", () => {
  test("Production build with NODE_ENV=production", () => {
    try {
      execSync("NODE_ENV=production npm run build", { stdio: "pipe" })
    } catch (error) {
      throw new Error(
        `Production build failed: ${error.stdout || error.stderr}`
      )
    }
  })

  test("ESLint with strict mode (Vercel equivalent)", () => {
    try {
      execSync("npx next lint --strict", { stdio: "pipe" })
    } catch (error) {
      throw new Error(`Strict linting failed: ${error.stdout || error.stderr}`)
    }
  })

  test("Build output size is reasonable", () => {
    try {
      const buildOutput = execSync("npm run build", { encoding: "utf8" })

      // Check for any warnings about large bundle sizes
      if (buildOutput.includes("Warning: ") && buildOutput.includes("large")) {
        console.warn("Large bundle size detected:", buildOutput)
      }

      // Check that static pages were generated
      if (!buildOutput.includes("Generating static pages")) {
        throw new Error("Static page generation may have failed")
      }
    } catch (error) {
      throw new Error(`Build output analysis failed: ${error.message}`)
    }
  })
})
