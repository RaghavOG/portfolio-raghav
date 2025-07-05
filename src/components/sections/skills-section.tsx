"use client"
const skills = {
  languages: ["python", "c", "cpp", "java", "javascript", "typescript"],
  frontend: ["reactjs", "vitejs", "nextjs", "tailwindcss", "scss", "bootstrap", "gsap", "framer motion"],
  backend: ["nodejs", "expressjs", "firebase", "prismaorm", "cloudinary", "drizzleorm", "redis"],
  database: ["mysql", "postgresql", "mongodb"],
  "devops/other": ["git", "github", "docker", "notion", "nginx"],
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            skills
          </h2>
        </div>

        {/* Skills Categories */}
        <div className="space-y-0">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <div 
              key={category} 
              className="py-12 border-b border-white/20 last:border-b-0 hover:bg-white/5 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[120px_400px_1fr] gap-8 items-start">
                {/* Number */}
                <div className="text-lg font-medium text-white/60 font-mono">
                  {String(categoryIndex + 1).padStart(2, '0')}.
                </div>
                
                {/* Category & Skills Count */}
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk">
                    {category}
                  </h3>
                  <p className="text-white/60 font-inter">
                    {skillList.length} technologies
                  </p>
                </div>
                
                {/* Skills List */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    {skillList.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-white/5 border border-white/10 text-white/90 px-4 py-2 rounded-md text-sm font-medium font-inter hover:bg-white/10 hover:border-white/30 hover:text-white transition-all duration-300 cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
