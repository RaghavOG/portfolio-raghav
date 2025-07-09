"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SplashCursor } from "@/components/ui/splash-cursor"
import { Home, Mail } from "lucide-react"

export default function NotFound() {
  return (
    <>
      <SplashCursor />
      <section className="py-20 px-4 md:px-12 bg-black text-white min-h-screen flex items-center">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* 404 Number */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
                404
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-8">
                Page Not Found
              </h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter max-w-3xl mx-auto">
                The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link href="/">
                <Button 
                  size="lg" 
                  className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </Link>
              <Link href="/#contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Me
                </Button>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-t border-white/20 pt-8"
            >
              <p className="text-lg text-white/70 mb-6 font-inter">Or explore these sections:</p>
              <div className="flex flex-wrap justify-center gap-8">
                <Link href="/#about" className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg">
                  About
                </Link>
                <Link href="/#projects" className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg">
                  Projects
                </Link>
                <Link href="/#experience" className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg">
                  Experience
                </Link>
                <Link href="/#skills" className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg">
                  Skills
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
