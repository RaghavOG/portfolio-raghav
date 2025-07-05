import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const projects = [
  {
    title: "LogoGenix",
    duration: "Nov 2024 - Dec 2024",
    description:
      "Built an AI-powered logo generation platform integrating Hugging Face's Flux-Midjourney-Mix2-LoRA model and Gemini API. Implemented user authentication using Clerk and real-time data management with Convex database.",
    link: "#", // Replace with actual link
  },
  {
    title: "Social Media Analytics - Neural Nitwits",
    duration: "Jan 2025",
    description:
      "Developed a full-stack application using Langflow and DataStax Astra DB for content engagement analysis with an intuitive interface. Implemented an AI-powered chatbot interface for natural language data querying and insights extraction.",
    link: "#", // Replace with actual link
  },
  {
    title: "HackWithHer Website",
    duration: "Oct 2024 - Dec 2024",
    description:
      "Developed a responsive and interactive website for a national-level hackathon with 3000+ participants, using Next.js and Material-UI to deliver a 99.9% uptime and ensure smooth user navigation across 10+ pages. Integrated MongoDB for efficient data management, handling 1000+ database transactions seamlessly to securely store participant information, event schedules, and project submissions. Implemented Cloudinary for media management, optimizing 500+ document and presentation uploads, reducing load times by 40%, and enhancing overall website performance.",
    link: "#", // Replace with actual link
  },
  {
    title: "Skillzy | A Platform for Freelancers",
    duration: "Jan 2025 - Mar 2025",
    description:
      "Developed a full-stack freelance marketplace using Next.js, TailwindCSS, and MongoDB, enabling seamless employer and freelancer interactions and ensure smooth user navigation across 10+ pages. Implemented secure authentication with email verification, role-based access control, optimized backend performance ensuring 99.9% uptime for a smooth user experience. Integrated Gemini AI for dynamic skill verification, generating new medium and hard-level questions based on a freelancer’s skill set to ensure continuous assessment and improvement.",
    link: "#", // Replace with actual link
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-darkBackground border-darkBorder text-darkForeground hover:border-accentGreen transition-colors duration-300"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-space-grotesk text-accentGreen">{project.title}</CardTitle>
                <CardDescription className="text-darkForeground/80 font-inter">{project.duration}</CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <p className="mb-4 font-inter">{project.description}</p>
                <Link href={project.link} className="text-accentGreen hover:underline font-inter">
                  View Project &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
