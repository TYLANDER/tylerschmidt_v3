import { Container } from '@/components/ui/Container'
import { PageWrapper } from '@/components/layout/page-transition'

export default function ContentExamplePage() {
  return (
    <PageWrapper>
      <Container>
        <div className="py-20 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Content Formatting Example
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
            This page shows how properly formatted content from Sanity will appear on your site.
          </p>

          {/* Example of properly formatted content */}
          <article className="prose-lg max-w-none">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-6">
              Project Overview
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <strong className="font-semibold text-gray-900 dark:text-white">Destiny</strong> is a comprehensive design system 
              and component library built for a major e-commerce platform. The project aimed to unify the design language 
              across multiple products and teams while improving development efficiency.
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-6">
              Design Process
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-10 mb-4">
              Research & Discovery
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              We began with extensive <strong className="font-semibold text-gray-900 dark:text-white">user research</strong> and 
              <strong className="font-semibold text-gray-900 dark:text-white"> stakeholder interviews</strong> to understand:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-blue-500">
              <li className="leading-relaxed pl-2">Current pain points in the design workflow</li>
              <li className="leading-relaxed pl-2">Inconsistencies across products</li>
              <li className="leading-relaxed pl-2">Developer needs and constraints</li>
            </ul>

            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-10 mb-4">
              Design System Architecture
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              The system was built on three core principles:
            </p>
            <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-blue-500">
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Modularity:</strong> Components that work independently
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Scalability:</strong> Easy to extend and maintain
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Accessibility:</strong> WCAG AAA compliance
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-6">
              Technical Implementation
            </h2>
            
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-10 mb-4">
              Key Features
            </h3>
            <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-blue-500">
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">40+ Components</strong> covering all UI needs
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Design Tokens</strong> for consistent spacing, colors, and typography
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Dark Mode Support</strong> with automatic theme switching
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">Full Accessibility</strong> with keyboard navigation and screen reader support
              </li>
            </ul>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mt-12 mb-6">
              Results & Impact
            </h2>
            <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-blue-500">
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">50% reduction</strong> in design-to-development time
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">90% component reuse</strong> across projects
              </li>
              <li className="leading-relaxed pl-2">
                <strong className="font-semibold text-gray-900 dark:text-white">100% accessibility</strong> compliance achieved
              </li>
              <li className="leading-relaxed pl-2">
                Adopted by <strong className="font-semibold text-gray-900 dark:text-white">12 product teams</strong> within 6 months
              </li>
            </ul>

            <div className="mt-16 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                How to Format Your Content in Sanity
              </h3>
              <ol className="list-decimal ml-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Use the style dropdown to select H2, H3, or H4 for headers</li>
                <li>Select text and press Cmd/Ctrl + B to make it bold</li>
                <li>Use the list buttons for bullet points or numbered lists</li>
                <li>Check SANITY_CONTENT_FORMATTING.md for detailed guidelines</li>
              </ol>
            </div>
          </article>
        </div>
      </Container>
    </PageWrapper>
  )
}
