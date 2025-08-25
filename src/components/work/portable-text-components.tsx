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
    h1: ({ children }) => (
      <h1 className="mb-6 mt-12 text-4xl font-bold md:text-5xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-semibold md:text-4xl">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 text-2xl font-semibold md:text-3xl">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-6 text-xl font-semibold md:text-2xl">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-blue-500 pl-6 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-gray-700 dark:text-gray-300">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-gray-700 dark:text-gray-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900 dark:text-gray-100">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm dark:bg-gray-800">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined
      
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-blue-600 underline underline-offset-2 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {children}
        </a>
      )
    },
  },
}
