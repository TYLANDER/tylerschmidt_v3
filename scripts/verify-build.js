#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

function log(message, type = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = type === 'error' ? '❌' : type === 'warn' ? '⚠️' : '✅';
  console.log(`${prefix} [${timestamp}] ${message}`);
}

function runTest(name, testFn) {
  try {
    log(`Running: ${name}`);
    testFn();
    log(`✅ ${name} - PASSED`, 'success');
    return true;
  } catch (error) {
    log(`❌ ${name} - FAILED: ${error.message}`, 'error');
    return false;
  }
}

function checkForUnescapedEntities() {
  const tsxFiles = execSync('find src -name "*.tsx"', { encoding: 'utf8', cwd: projectRoot })
    .split('\n')
    .filter(file => file.trim() !== '');

  let foundErrors = [];

  tsxFiles.forEach(file => {
    const filePath = join(projectRoot, file.trim());
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for unescaped apostrophes in text content (not in attributes)
      if (line.includes("text=\"") && line.includes("'") && !line.includes("&apos;")) {
        const textMatch = line.match(/text="([^"]*'[^"]*)"/);
        if (textMatch && !textMatch[1].includes('&apos;')) {
          foundErrors.push(`${file}:${index + 1} - Unescaped apostrophe in text: ${line.trim()}`);
        }
      }
    });
  });

  if (foundErrors.length > 0) {
    throw new Error(`Unescaped entities found:\n${foundErrors.join('\n')}`);
  }
}

function checkForExplicitAny() {
  const tsFiles = execSync('find src -name "*.ts" -o -name "*.tsx"', { encoding: 'utf8', cwd: projectRoot })
    .split('\n')
    .filter(file => file.trim() !== '');

  let foundErrors = [];

  tsFiles.forEach(file => {
    const filePath = join(projectRoot, file.trim());
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (!line.trim().startsWith('//') && !line.trim().startsWith('*')) {
        if (line.includes(': any') || line.includes('as any')) {
          foundErrors.push(`${file}:${index + 1} - Explicit 'any' type: ${line.trim()}`);
        }
      }
    });
  });

  if (foundErrors.length > 0) {
    throw new Error(`Explicit 'any' types found:\n${foundErrors.join('\n')}`);
  }
}

function runCommand(command, errorMessage) {
  try {
    execSync(command, { stdio: 'pipe', cwd: projectRoot });
  } catch (error) {
    throw new Error(`${errorMessage}: ${error.stdout || error.stderr}`);
  }
}

async function main() {
  log('🚀 Starting comprehensive build verification...');
  
  const tests = [
    ['TypeScript Type Check', () => runCommand('npm run type-check', 'TypeScript type checking failed')],
    ['ESLint Check', () => runCommand('npm run lint', 'ESLint failed')],
    ['Check for Unescaped Entities', checkForUnescapedEntities],
    ['Check for Explicit Any Types', checkForExplicitAny],
    ['Next.js Build', () => runCommand('npm run build', 'Next.js build failed')],
    ['Strict ESLint (Vercel-style)', () => runCommand('npx next lint --strict', 'Strict linting failed')],
    ['Production Build', () => runCommand('NODE_ENV=production npm run build', 'Production build failed')]
  ];

  const results = tests.map(([name, testFn]) => runTest(name, testFn));
  const passed = results.filter(Boolean).length;
  const total = results.length;

  log(`\n📊 Test Results: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    log('🎉 All tests passed! Ready for deployment.', 'success');
    process.exit(0);
  } else {
    log(`💥 ${total - passed} tests failed. Please fix the issues above.`, 'error');
    process.exit(1);
  }
}

main().catch(error => {
  log(`Fatal error: ${error.message}`, 'error');
  process.exit(1);
}); 