export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            about me
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-inter">
              i am a passionate full stack engineer with a strong focus on building scalable and user-friendly applications.
            </p>
            <p className="text-lg text-white/70 leading-relaxed font-inter">
              my expertise spans across frontend frameworks like react, backend technologies such as node.js and python, and
              database management. i thrive on solving complex problems and continuously learning new technologies to
              deliver innovative solutions.
            </p>
            <p className="text-lg text-white/70 leading-relaxed font-inter">
              beyond coding, i enjoy exploring the intersection of ai and web development, always looking for ways to
              integrate intelligent systems into everyday applications.
            </p>
          </div>

          {/* Right Column - Achievements */}
          <div className="space-y-8">
            <h3 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk">
              achievements
            </h3>
            <div className="space-y-6">
              <div className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors duration-300">
                <p className="text-lg text-white/70 leading-relaxed font-inter">
                  created and published 4 developer-focused npm packages (complete-auth-system, mern-vite-shadcn-template,
                  vite-tailwind-starter, and vite-shadcn-starter) that have garnered over 1000+ combined downloads.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors duration-300">
                <p className="text-lg text-white/70 leading-relaxed font-inter">
                  sih college level round qualifiers 2023.
                </p>
              </div>
              <div className="border-l-2 border-white/20 pl-6 hover:border-white/40 transition-colors duration-300">
                <p className="text-lg text-white/70 leading-relaxed font-inter">
                  finalists hackindia web3 hackathon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
