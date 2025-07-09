"use client"

import { motion } from "framer-motion"
import { SplashCursor } from "@/components/ui/splash-cursor"
import { Loader2 } from "lucide-react"

export default function Loading() {
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
            {/* Loading Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20 mb-12"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 className="w-12 h-12 text-white" />
              </motion.div>
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-8">
                Loading...
              </h1>
              <motion.p 
                className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter max-w-3xl mx-auto"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Please wait while we prepare your experience
              </motion.p>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="border-t border-white/20 pt-8"
            >
              <div className="flex items-center justify-center gap-3 text-lg text-white/70 mb-4">
                <motion.div 
                  className="w-3 h-3 bg-white/60 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="font-inter">Preparing content</span>
              </div>
              <div className="w-64 mx-auto bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-white/60 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: ["0%", "70%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
