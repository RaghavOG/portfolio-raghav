const experiences = [
  {
    title: "fullstack developer intern",
    company: "the brain burners media",
    duration: "sept 2024 - present",
    description:
      "led teams on multiple full-stack projects, collaborated with cross-functional teams, and contributed to scalable web applications by ensuring code quality, efficient development and deployment.",
  },
  {
    title: "technical team member",
    company: "ieee-ciet",
    duration: "sept 2024 - present",
    description:
      "leading development of ieee-ciet's official website using next.js and modern web technologies and collaborating with team members to organize technical workshops and events.",
  },
  {
    title: "web team member",
    company: "open source chandigarh",
    duration: "jan 2025 - present",
    description:
      "collaborating with team members on various web development initiatives and participating in community events.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            experience
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="py-12 border-b border-white/20 last:border-b-0 hover:bg-white/5 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[120px_400px_1fr] gap-8 items-start">
                {/* Number */}
                <div className="text-lg font-medium text-white/60 font-mono">
                  {String(index + 1).padStart(2, '0')}.
                </div>
                
                {/* Company & Duration */}
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-space-grotesk leading-tight">
                    {exp.title}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-lg text-white/80 font-inter font-medium">
                      {exp.company}
                    </p>
                    <p className="text-sm text-white/60 font-inter">
                      {exp.duration}
                    </p>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <p className="text-lg text-white/70 font-inter leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
