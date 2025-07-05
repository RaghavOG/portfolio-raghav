"use client"

import { useEffect, useRef, useState } from "react"
import Typed from "typed.js"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowDown, Code, Brain, Download, Eye, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const el = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    const typed = new Typed(el.current, {
      strings: [
        "Full Stack Developer", 
        "AI Engineer", 
        "Problem Solver", 
        "Tech Enthusiast"
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      cursorChar: "|",
      backDelay: 2000,
      startDelay: 500,
    })

    return () => {
      typed.destroy()
    }
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-accentGreen/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-accentGreen/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-6xl mx-auto">
        {/* Greeting */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-accentGreen/10 border border-accentGreen/30 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-accentGreen rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accentGreen">Available for opportunities</span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className={`text-4xl md:text-6xl lg:text-8xl font-bold mb-6 font-space-grotesk leading-tight transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="text-white">Hi, I'm </span>
          <span className="text-accentGreen">
            Raghav Singla
          </span>
        </h1>

        {/* Subtitle with Typed.js */}
        <div className={`text-2xl md:text-4xl lg:text-5xl text-darkForeground/90 mb-8 font-inter min-h-[80px] flex items-center justify-center transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <span className="mr-4 text-white">I'm a</span>
          <span ref={el} className="text-accentGreen font-bold"></span>
        </div>

        {/* Description */}
        <p className={`text-lg md:text-xl text-darkForeground/70 mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          Passionate about creating innovative solutions that bridge the gap between 
          cutting-edge technology and real-world applications. I specialize in building 
          scalable web applications and AI-powered systems.
        </p>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-16 justify-center transform transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <Button
            className="group relative overflow-hidden bg-accentGreen text-darkBackground hover:bg-accentGreen/90 rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 shadow-lg shadow-accentGreen/25 hover:shadow-accentGreen/40 hover:shadow-xl hover:scale-105"
            onClick={scrollToProjects}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              View My Work
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] transition-transform duration-700 group-hover:translate-x-[100%]"></div>
          </Button>
          
          <Button
            variant="outline"
            className="group border-2 border-darkBorder text-darkForeground hover:bg-accentGreen hover:text-darkBackground hover:border-accentGreen rounded-full px-8 py-4 text-lg font-bold transition-all duration-300 bg-transparent hover:scale-105"
            asChild
          >
            <a href="/Raghav_Resume.pdf" download className="flex items-center gap-2">
              <Download className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className={`flex justify-center gap-6 mb-12 transform transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <a 
            href="https://github.com/raghavsingla" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-3 rounded-full border border-darkBorder hover:border-accentGreen transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accentGreen/25"
          >
            <Github className="h-6 w-6 text-darkForeground group-hover:text-accentGreen transition-colors duration-300" />
          </a>
          <a 
            href="https://linkedin.com/in/raghavsingla" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-3 rounded-full border border-darkBorder hover:border-accentGreen transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accentGreen/25"
          >
            <Linkedin className="h-6 w-6 text-darkForeground group-hover:text-accentGreen transition-colors duration-300" />
          </a>
          <a 
            href="mailto:raghav@example.com"
            className="group p-3 rounded-full border border-darkBorder hover:border-accentGreen transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-accentGreen/25"
          >
            <Mail className="h-6 w-6 text-darkForeground group-hover:text-accentGreen transition-colors duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 cursor-pointer group" onClick={scrollToProjects}>
          <span className="text-sm text-darkForeground/60 group-hover:text-accentGreen transition-colors duration-300">
            Scroll to explore
          </span>
          <ArrowDown className="h-5 w-5 text-darkForeground/60 group-hover:text-accentGreen transition-all duration-300 animate-bounce" />
        </div>
      </div>

      {/* Tech Stack Indicators */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accentGreen/30 to-transparent">
        <div className="h-full bg-gradient-to-r from-accentGreen to-cyan-400 animate-pulse"></div>
      </div> */}

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 3s ease-in-out infinite;
        }
        
        /* Custom typed.js cursor styling */
        .typed-cursor {
          font-weight: bold;
          color: #10b981;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}