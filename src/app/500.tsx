"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SplashCursor } from "@/components/ui/splash-cursor"
import { Server, RefreshCw, Home } from "lucide-react"

export default function ServerError() {
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
            {/* 500 Number */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
                500
              </h1>
            </motion.div>

            {/* Server Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20 mb-12"
            >
              <Server className="w-12 h-12 text-white" />
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-8">
                Internal Server Error
              </h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter max-w-3xl mx-auto">
                Something went wrong on our servers. We're working to fix this issue. Please try again later.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button 
                onClick={() => window.location.reload()}
                size="lg" 
                className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </Link>
            </motion.div>

            {/* Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-t border-white/20 pt-8"
            >
              <div className="flex items-center justify-center gap-3 text-lg text-white/70 mb-4">
                <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse" />
                <span className="font-inter">Server Status: Investigating</span>
              </div>
              <p className="text-lg text-white/70 font-inter">
                If this problem persists, please{" "}
                <Link href="/#contact" className="text-white hover:text-white/80 transition-colors duration-300 border-b border-white/20 hover:border-white/40">
                  contact support
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
