"use client"
import React from 'react'
import Link from 'next/link'
import { Github, Linkedin, Mail, Phone, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black text-white py-16 px-4 md:px-12 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Name & Description */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk">
              Raghav Singla
            </h3>
            <p className="text-lg text-white/70 font-inter leading-relaxed">
              Full Stack Engineer passionate about building scalable applications and exploring the intersection of AI and web development.
            </p>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white font-space-grotesk">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link href="#about" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                About
              </Link>
              <Link href="#services" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                Services
              </Link>
              <Link href="#skills" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                Skills
              </Link>
              <Link href="#experience" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                Experience
              </Link>
              <Link href="#projects" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                Projects
              </Link>
              <Link href="#contact" className="text-white/70 hover:text-white transition-colors duration-300 font-inter">
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-bold text-white font-space-grotesk">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <Link
                href="mailto:04raghavsingla28@gmail.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 font-inter"
              >
                <Mail className="h-5 w-5" />
                04raghavsingla28@gmail.com
              </Link>
              <Link
                href="tel:+919466214133"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 font-inter"
              >
                <Phone className="h-5 w-5" />
                +91 9466214133
              </Link>
              <Link
                href="https://www.linkedin.com/in/singlaraghav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 font-inter"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn
              </Link>
              <Link
                href="https://github.com/RaghavOG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-colors duration-300 font-inter"
              >
                <Github className="h-5 w-5" />
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
          <div className="text-white/60 text-sm font-inter mb-4 md:mb-0">
            © {new Date().getFullYear()} Raghav Singla. All rights reserved.
          </div>
          
          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
          >
            <span className="text-white font-inter text-sm">Back to Top</span>
            <ArrowUp className="h-4 w-4 text-white group-hover:translate-y-[-2px] transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer