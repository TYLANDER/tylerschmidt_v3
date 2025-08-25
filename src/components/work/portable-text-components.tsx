import { urlFor } from '@/sanity/lib/image'
import { ExpandableImage } from '@/components/ui/expandable-image'
import type { PortableTextReactComponents } from '@portabletext/react'

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }

      return (
        <figure className="my-8 -mx-6 md:mx-0">
          <ExpandableImage
            src={urlFor(value)
              .width(1600)
              .height(900)
              .quality(90)
              .url()}
            alt={value.alt || 'Project image'}
            caption={value.caption}
            className="aspect-video w-full bg-gray-100 dark:bg-gray-900"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  block: {
    // Heading hierarchy with proper semantic structure
    h1: ({ children }) => (
      <h1 className="mb-8 mt-16 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-6 mt-12 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 mt-10 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-8 text-xl font-semibold tracking-tight text-gray-900 dark:text-white md:text-2xl">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-3 mt-6 text-lg font-semibold tracking-tight text-gray-900 dark:text-white md:text-xl">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-2 mt-6 text-base font-semibold tracking-tight text-gray-900 dark:text-white md:text-lg">
        {children}
      </h6>
    ),
    // Body text with optimal line height and contrast
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    // Callout/quote styling
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-900/50 py-4 pl-6 pr-4 rounded-r-lg">
        <p className="text-lg italic leading-relaxed text-gray-700 dark:text-gray-300">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-blue-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:font-semibold marker:text-blue-500">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),
    number: ({ children }) => (
      <li className="leading-relaxed pl-2">{children}</li>
    ),
  },
  marks: {
    // Strong emphasis for important content
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-white">
        {children}
      </strong>
    ),
    // Italic for emphasis
    em: ({ children }) => (
      <em className="italic text-gray-800 dark:text-gray-200">{children}</em>
    ),
    // Code formatting
    code: ({ children }) => (
      <code className="rounded-md bg-gray-100 px-2 py-1 font-mono text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        {children}
      </code>
    ),
    // Links with proper contrast and hover states
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700 hover:decoration-blue-700/50 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:hover:decoration-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        >
          {children}
        </a>
      )
    },
    // Highlight/mark
    highlight: ({ children }) => (
      <mark className="bg-yellow-200 px-1 py-0.5 text-gray-900 dark:bg-yellow-900/50 dark:text-yellow-200">
        {children}
      </mark>
    ),
  },
}