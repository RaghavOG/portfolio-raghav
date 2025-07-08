"use client"
import GitHubCalendar from 'react-github-calendar';

export function GitHubSection() {
  return (
    <section id="github" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            GitHub Activity
          </h2>
          <p className="text-2xl text-white/60 font-inter max-w-2xl">
            👨‍💻 "I code daily, not just talk."
          </p>
        </div>

        {/* GitHub Calendar */}
        <div className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
            <GitHubCalendar 
              username="raghavog"
              colorScheme="dark"
              fontSize={14}
              blockMargin={4}
              blockRadius={2}
              theme={{
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-4 font-space-grotesk">500+</div>
            <div className="text-white/60 font-inter text-lg">Commits This Year</div>
          </div>
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-4 font-space-grotesk">50+</div>
            <div className="text-white/60 font-inter text-lg">Repositories</div>
          </div>
          <div className="text-center p-8 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
            <div className="text-5xl font-bold text-white mb-4 font-space-grotesk">365</div>
            <div className="text-white/60 font-inter text-lg">Days Streak</div>
          </div>
        </div>
      </div>
    </section>
  )
}
