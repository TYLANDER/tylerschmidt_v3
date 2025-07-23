import { ReactNode } from "react"

export interface Project {
  _id: string
  title: string
  slug: string
  description: string
  longDescription?: string
  category: ProjectCategory
  featured: boolean
  year: number
  status: ProjectStatus
  images: ImageAsset[]
  videos?: VideoAsset[]
  techStack: string[]
  links: ProjectLink[]
  order: number
  createdAt: string
  updatedAt: string
}

export interface ProjectCategory {
  _id: string
  title: string
  slug: string
  description?: string
  color?: string
}

export type ProjectStatus = "completed" | "in-progress" | "concept" | "archived"

export interface ProjectLink {
  title: string
  url: string
  type: "website" | "github" | "app-store" | "play-store" | "figma" | "behance" | "dribbble" | "other"
}

export interface ImageAsset {
  _id: string
  url: string
  alt: string
  width: number
  height: number
  blurDataURL?: string
  metadata?: {
    dimensions: {
      width: number
      height: number
    }
    format: string
    size: number
  }
}

export interface VideoAsset {
  _id: string
  url: string
  title?: string
  poster?: ImageAsset
  duration?: number
  format?: string
}

export interface AboutContent {
  _id: string
  title: string
  description: string
  content: unknown[] // Portable Text
  image?: ImageAsset
  resumeUrl?: string
  skills: Skill[]
  experience: Experience[]
  education: Education[]
}

export interface Skill {
  name: string
  category: SkillCategory
  level: SkillLevel
  years?: number
}

export type SkillCategory = 
  | "design" 
  | "frontend" 
  | "backend" 
  | "mobile" 
  | "tools" 
  | "other"

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert"

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  location?: string
  companyUrl?: string
}

export interface Education {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  description?: string
  location?: string
}

export interface ContactInfo {
  _id: string
  email: string
  phone?: string
  location: string
  availability: AvailabilityStatus
  preferredContact: ContactMethod[]
  socialLinks: SocialLink[]
}

export type AvailabilityStatus = 
  | "available" 
  | "busy" 
  | "unavailable"

export type ContactMethod = "email" | "phone" | "social"

export interface SocialLink {
  platform: SocialPlatform
  url: string
  username: string
}

export type SocialPlatform = 
  | "twitter"
  | "linkedin" 
  | "github"
  | "dribbble"
  | "behance"
  | "instagram"
  | "youtube"
  | "figma"
  | "other"

export interface SiteSettings {
  _id: string
  title: string
  description: string
  keywords: string[]
  author: string
  url: string
  ogImage?: ImageAsset
  favicon?: ImageAsset
  analytics?: {
    googleAnalyticsId?: string
    plausibleDomain?: string
  }
  social: SocialLink[]
}

export interface NavigationItem {
  title: string
  href: string
  description?: string
  external?: boolean
  children?: NavigationItem[]
}

export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noindex?: boolean
}

export interface AnimationProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  viewTrigger?: boolean
  once?: boolean
}

export interface ThreeSceneProps {
  className?: string
  interactive?: boolean
  autoRotate?: boolean
  cameraPosition?: [number, number, number]
  backgroundColor?: string
  fog?: boolean
}

export interface CursorProps {
  className?: string
  variant?: CursorVariant
  hideNativeCursor?: boolean
}

export type CursorVariant = 
  | "default"
  | "pointer" 
  | "text"
  | "grab"
  | "grabbing"
  | "zoom-in"
  | "zoom-out"

export interface LoadingProps {
  show: boolean
  progress?: number
  message?: string
  variant?: "minimal" | "detailed" | "artistic"
}

export interface NotificationProps {
  id: string
  title: string
  description?: string
  type: NotificationType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export type NotificationType = "success" | "error" | "warning" | "info"

export interface FormSubmissionData {
  name: string
  email: string
  subject?: string
  message: string
  budget?: string
  timeline?: string
  projectType?: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  maxVisible?: number
}

export interface FilterProps {
  categories: ProjectCategory[]
  selectedCategory?: string
  onCategoryChange: (category: string | undefined) => void
  technologies?: string[]
  selectedTech?: string[]
  onTechChange?: (tech: string[]) => void
} 