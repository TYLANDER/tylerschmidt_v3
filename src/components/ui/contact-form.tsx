"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/animations/animated-text"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
  budget: string
  timeline: string
  projectType: string
}

interface ContactFormProps {
  className?: string
}

const budgetOptions = [
  { value: "5k-10k", label: "$5k - $10k" },
  { value: "10k-25k", label: "$10k - $25k" },
  { value: "25k-50k", label: "$25k - $50k" },
  { value: "50k+", label: "$50k+" },
]

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-2months", label: "1-2 months" },
  { value: "3-6months", label: "3-6 months" },
  { value: "6months+", label: "6+ months" },
]

const projectTypeOptions = [
  { value: "web-app", label: "Web Application" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "design-system", label: "Design System" },
  { value: "branding", label: "Branding" },
  { value: "consultation", label: "Consultation" },
  { value: "other", label: "Other" },
]

export function ContactForm({ className }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    budget: "",
    timeline: "",
    projectType: "",
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={cn("text-center space-y-6", className)}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
          className="w-16 h-16 mx-auto bg-success rounded-full flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        
        <AnimatedText
          text="Thank you for reaching out!"
          as="h3"
          variant="fade"
          className="text-2xl font-semibold"
        />
        
        <AnimatedText
          text="I'll get back to you within 24 hours. Looking forward to discussing your project!"
          as="p"
          variant="fade"
          delay={0.2}
          className="text-muted-foreground"
        />
      </motion.div>
    )
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Name"
          value={formData.name}
          onChange={(value) => handleInputChange("name", value)}
          error={errors.name}
          required
        />
        
        <FormField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleInputChange("email", value)}
          error={errors.email}
          required
        />
      </div>

      <FormField
        label="Subject"
        value={formData.subject}
        onChange={(value) => handleInputChange("subject", value)}
        error={errors.subject}
      />

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Project Type"
          value={formData.projectType}
          onChange={(value) => handleInputChange("projectType", value)}
          options={projectTypeOptions}
        />
        
        <SelectField
          label="Budget Range"
          value={formData.budget}
          onChange={(value) => handleInputChange("budget", value)}
          options={budgetOptions}
        />
        
        <SelectField
          label="Timeline"
          value={formData.timeline}
          onChange={(value) => handleInputChange("timeline", value)}
          options={timelineOptions}
        />
      </div>

      <FormField
        label="Message"
        type="textarea"
        value={formData.message}
        onChange={(value) => handleInputChange("message", value)}
        error={errors.message}
        placeholder="Tell me about your project..."
        required
        rows={6}
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          size="lg"
          variant="magnetic"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </motion.div>
    </motion.form>
  )
}

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: "text" | "email" | "textarea"
  placeholder?: string
  required?: boolean
  rows?: number
}

function FormField({
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  required = false,
  rows = 4,
}: FormFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      
      <div className="relative">
        {type === "textarea" ? (
          <textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-border bg-background",
              "focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none",
              "transition-colors duration-200 resize-none",
              error && "border-destructive focus:border-destructive focus:ring-destructive"
            )}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "w-full px-4 py-3 rounded-lg border border-border bg-background",
              "focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none",
              "transition-colors duration-200",
              error && "border-destructive focus:border-destructive focus:ring-destructive"
            )}
          />
        )}
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

interface SelectFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

function SelectField({ label, value, onChange, options }: SelectFieldProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full px-4 py-3 rounded-lg border border-border bg-background",
          "focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none",
          "transition-colors duration-200"
        )}
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
} 