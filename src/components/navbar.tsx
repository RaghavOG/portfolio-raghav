"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "SKILLS", href: "#skills" },
  { name: "PROJECTS", href: "#projects" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "EDUCATION", href: "#education" },
  { name: "CONTACT", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        const navbarHeight = 80 // Account for navbar height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-in-out",
        scrolled 
          ? "bg-black/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20" 
          : "bg-black/90 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-1">
            <Link 
              href="/" 
              className="relative group inline-block"
            >
              <span className="text-2xl font-bold text-darkForeground font-space-grotesk tracking-tight">
                Raghav Singla
              </span>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-accentGreen transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>

          {/* Centered Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSmoothScroll(link.href)
                  }}
                  className={cn(
                    "relative px-4 py-3 text-sm font-medium text-darkForeground/90 transition-all duration-300 hover:text-accentGreen font-inter group cursor-pointer"
                  )}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-accentGreen transition-all duration-300 ease-out group-hover:w-full"></div>
                </Link>
              ))}
            </div>
          </div>

          {/* Resume Button */}
          <div className="flex-1 flex justify-end">
            <div className="hidden md:block">
              <Button
                className={cn(
                  "group relative overflow-hidden bg-accentGreen text-black hover:bg-accentGreen/90",
                  "rounded-full px-6 py-2.5 font-semibold transition-all duration-300 font-inter",
                  "shadow-lg shadow-accentGreen/25 hover:shadow-accentGreen/40 hover:shadow-xl hover:scale-105",
                  "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
                  "before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
                )}
                asChild
              >
                <a href="/Raghav_Resume.pdf" download className="flex items-center gap-2">
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  <span>Resume</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)} 
              className={cn(
                "relative text-darkForeground hover:text-accentGreen hover:bg-accentGreen/10 rounded-full",
                "transition-all duration-300 overflow-hidden",
                isOpen && "bg-accentGreen/10 text-accentGreen"
              )}
            >
              <div className="relative">
                <Menu className={cn("h-6 w-6 transition-all duration-300", isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100")} />
                <X className={cn("h-6 w-6 absolute top-0 left-0 transition-all duration-300", isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0")} />
              </div>
              <span className="sr-only">Toggle navigation</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-black/98 backdrop-blur-xl transition-all duration-500 ease-in-out md:hidden",
          "border-b border-white/10",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <span className="text-xl font-bold text-darkForeground font-space-grotesk">
            Raghav Singla
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)} 
            className="text-darkForeground hover:text-accentGreen hover:bg-accentGreen/10 rounded-full"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close navigation</span>
          </Button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="flex flex-col py-6 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleSmoothScroll(link.href)
              }}
              className={cn(
                "group flex items-center justify-between py-4 text-lg text-darkForeground hover:text-accentGreen",
                "transition-all duration-300 font-inter border-b border-white/10 last:border-b-0",
                "hover:bg-accentGreen/5 hover:px-4 rounded-lg cursor-pointer"
              )}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <span>{link.name}</span>
              <div className="w-0 h-0.5 bg-accentGreen transition-all duration-300 group-hover:w-8"></div>
            </Link>
          ))}
          
          {/* Mobile Resume Button */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <Button
              className={cn(
                "w-full group relative overflow-hidden bg-accentGreen text-black hover:bg-accentGreen/90",
                "rounded-full py-4 text-lg font-semibold transition-all duration-300 font-inter",
                "shadow-lg shadow-accentGreen/25 hover:shadow-accentGreen/40 hover:shadow-xl",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent",
                "before:translate-x-[-100%] before:transition-transform before:duration-700 hover:before:translate-x-[100%]"
              )}
              asChild
              onClick={() => setIsOpen(false)}
            >
              <a href="/Raghav_Resume.pdf" download className="flex items-center justify-center gap-3">
                <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                <span>Download Resume</span>
              </a>
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  )
}