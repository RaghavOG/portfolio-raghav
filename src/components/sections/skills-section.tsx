const skills = {
  Languages: ["Python", "C", "CPP", "Java", "Javascript", "Typescript"],
  Frontend: ["ReactJs", "ViteJs", "NextJs", "TailwindCSS", "SCSS", "Bootstrap", "GSAP", "Framer Motion"],
  Backend: ["NodeJs", "ExpressJs", "FireBase", "PrismaORM", "Cloudinary", "DrizzleORM", "Redis"],
  Database: ["MySQL", "PostgreSQL", "MongoDB"],
  "DevOps/Other": ["Git", "GitHub", "Docker", "Notion", "Nginx"],
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">My Skills</h2>
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category} className="mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-accentGreen mb-6 font-space-grotesk">{category}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {skillList.map((skill, index) => (
                <span
                  key={index}
                  className="bg-darkBorder text-darkForeground px-6 py-3 rounded-full text-lg font-medium font-inter shadow-lg hover:bg-accentGreen hover:text-darkBackground transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
