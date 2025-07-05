"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const sections = [
  { id: "about", name: "ABOUT" },
  { id: "services", name: "SERVICES" },
  { id: "skills", name: "SKILLS" },
  { id: "projects", name: "PROJECTS" },
  { id: "experience", name: "EXPERIENCE" },
  { id: "education", name: "EDUCATION" },
  { id: "contact", name: "CONTACT" },
]

export function SectionIndicators() {
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="group relative cursor-pointer"
            onClick={() => scrollToSection(section.id)}
          >
            {/* Dot */}
            <div
              className={cn(
                "w-3 h-3 rounded-full border-2 transition-all duration-300",
                activeSection === section.id
                  ? "bg-white border-white scale-125"
                  : "bg-transparent border-white/40 hover:border-white/80 hover:scale-110"
              )}
            />
            
            {/* Tooltip */}
            <div
              className={cn(
                "absolute left-6 top-1/2 -translate-y-1/2 px-3 py-2 bg-black/90 backdrop-blur-sm text-white text-sm font-medium rounded-md border border-white/20",
                "opacity-0 translate-x-2 pointer-events-none transition-all duration-300",
                "group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto",
                "whitespace-nowrap font-inter"
              )}
            >
              {section.name}
              {/* Arrow */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/90 border-l border-b border-white/20 rotate-45" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
