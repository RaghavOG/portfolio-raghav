const skills = {
  Languages: ["Python", "C", "CPP", "Java", "Javascript", "Typescript"],
  Frontend: ["ReactJs", "ViteJs", "NextJs", "TailwindCSS", "SCSS", "Bootstrap", "GSAP", "Framer Motion"],
  Backend: ["NodeJs", "ExpressJs", "FireBase", "PrismaORM", "Cloudinary", "DrizzleORM", "Redis"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"],
  "DevOps/Other": ["Git", "GitHub", "Docker", "Notion", "Nginx"],
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            My Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="space-y-16">
          {Object.entries(skills).map(([category, skillList], categoryIndex) => (
            <div key={category} className="space-y-8">
              {/* Category Header */}
              <div className="flex items-center gap-6">
                <span className="text-lg font-medium text-white/60 font-mono">
                  {String(categoryIndex + 1).padStart(2, '0')}.
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk">
                  {category}
                </h3>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {/* Skills List */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 pl-12">
                {skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="group bg-white/5 border border-white/10 text-white px-4 py-3 rounded-lg text-sm font-medium font-inter hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                  >
                    <span className="block text-center group-hover:scale-105 transition-transform duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
