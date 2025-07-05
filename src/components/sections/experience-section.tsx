import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experiences = [
  {
    title: "Fullstack Developer Intern",
    company: "The Brain Burners Media",
    duration: "Sept 2024 - Present",
    description:
      "Led teams on multiple full-stack projects, collaborated with cross-functional teams, and contributed to scalable web applications by ensuring code quality, efficient development and deployment.",
  },
  {
    title: "Technical Team Member",
    company: "IEEE-CIET",
    duration: "Sept 2024 - Present",
    description:
      "Leading development of IEEE-CIET's official website using Next.js and modern web technologies and Collaborating with team members to organize technical workshops and events.",
  },
  {
    title: "Web Team Member",
    company: "Open Source Chandigarh",
    duration: "Jan 2025 - Present",
    description:
      "Collaborating with team members on various web development initiatives and Participating in community events.",
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">Experience</h2>
        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="bg-darkBackground border-darkBorder text-darkForeground text-left hover:border-accentGreen transition-colors duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-space-grotesk text-accentGreen">{exp.title}</CardTitle>
                <CardDescription className="text-darkForeground/80 font-inter">
                  {exp.company} | {exp.duration}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-inter">
                <p>{exp.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
