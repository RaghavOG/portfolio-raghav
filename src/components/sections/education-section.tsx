export function EducationSection() {
  return (
    <section id="education" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Education
          </h2>
        </div>

        {/* Education Content */}
        <div className="py-12 border-b border-white/20 hover:bg-white/5 transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-[120px_400px_1fr] gap-8 items-start">
            {/* Number */}
            <div className="text-lg font-medium text-white/60 font-mono">
              01.
            </div>
            
            {/* University & Duration */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk leading-tight">
                Chitkara University
              </h3>
              <div className="space-y-1">
                <p className="text-lg text-white/80 font-inter font-medium">
                  BE CSE - AI
                </p>
                <p className="text-sm text-white/60 font-inter">
                  Aug 2023 - June 2027
                </p>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <p className="text-lg text-white/70 font-inter leading-relaxed">
                Pursuing a Bachelor of Engineering in Computer Science with a specialization in Artificial Intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
