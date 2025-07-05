"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Full Stack Developer", "AI Engineer"],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      cursorChar: "|",
    })

    return () => {
      // Destroy Typed instance during cleanup to prevent memory leaks
      typed.destroy()
    }
  }, [])

  const barColors = [
    "bg-pink-500",
    "bg-teal-500",
    "bg-white",
    "bg-gray-500",
    "bg-purple-500",
    "bg-yellow-500",
    "bg-cyan-500",
    "bg-orange-500",
  ]

  const barHeights = [
    "h-12",
    "h-16",
    "h-8",
    "h-10",
    "h-14",
    "h-18",
    "h-10",
    "h-12",
    "h-10",
    "h-14",
    "h-8",
    "h-16",
    "h-12",
    "h-10",
    "h-14",
    "h-8",
  ]

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-4 py-16 md:py-24">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-darkForeground mb-4 font-space-grotesk leading-tight">
        Hi, I'm Raghav Singla
      </h1>
      <p className="text-2xl md:text-4xl lg:text-5xl text-darkForeground mb-8 font-inter">
         <span ref={el} className="text-accentGreen"></span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <Button
          className="bg-accentGreen text-darkBackground hover:bg-accentGreen/80 rounded-full px-8 py-3 text-lg font-bold transition-colors duration-300"
          asChild
        >
          <Link href="#projects">View My Projects</Link>
        </Button>
        <Button
          variant="outline"
          className="border-darkBorder text-darkForeground hover:bg-darkBorder hover:text-accentGreen rounded-full px-8 py-3 text-lg font-bold transition-colors duration-300 bg-transparent"
          asChild
        >
          <a href="/Raghav_Resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </div>

      {/* Animated bars at the bottom */}
      {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 md:gap-4 px-4 pb-4 overflow-hidden">
        {barHeights.map((heightClass, index) => (
          <div
            key={index}
            className={`w-2 md:w-3 rounded-full ${heightClass} ${barColors[index % barColors.length]} opacity-70`}
            style={{
              animation: `bar-animation ${1 + Math.random() * 2}s infinite alternate ease-in-out ${index * 0.1}s`,
            }}
          ></div>
        ))}
      </div> */}

      <style jsx global>{`
        @keyframes bar-animation {
          0% {
            transform: scaleY(0.5);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
