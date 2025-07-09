"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SplashCursor } from "@/components/ui/splash-cursor"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

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
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto w-24 h-24 bg-white/10 rounded-full flex items-center justify-center border border-white/20 mb-12"
            >
              <AlertTriangle className="w-12 h-12 text-white" />
            </motion.div>

            {/* Error Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk mb-8">
                Something went wrong!
              </h1>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter max-w-3xl mx-auto">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
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
                onClick={reset}
                size="lg" 
                className="bg-white text-black hover:bg-white/90 border-0 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline" 
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-8 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Button>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-t border-white/20 pt-8"
            >
              <p className="text-lg text-white/70 mb-6 font-inter">Need help? Here are some options:</p>
              <div className="flex flex-wrap justify-center gap-8">
                <button 
                  onClick={() => window.location.reload()}
                  className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg"
                >
                  Refresh Page
                </button>
                <a 
                  href="/#contact" 
                  className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg"
                >
                  Contact Support
                </a>
                <button 
                  onClick={() => {
                    if (typeof window !== 'undefined' && window.history.length > 1) {
                      window.history.back()
                    } else {
                      window.location.href = '/'
                    }
                  }}
                  className="text-white/70 hover:text-white transition-colors duration-300 border-l-2 border-white/20 pl-6 hover:border-white/40 font-inter text-lg"
                >
                  Go Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
