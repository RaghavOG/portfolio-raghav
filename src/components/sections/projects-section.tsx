import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

const projects = [
  {
    title: "LogoGenix",
    category: "AI PLATFORM",
    description:
      "Built an AI-powered logo generation platform integrating Hugging Face's Flux-Midjourney-Mix2-LoRA model and Gemini API. Implemented user authentication using Clerk and real-time data management with Convex database.",
    link: "#", // Replace with actual link
    image: "/hall.webp", // Placeholder image
  },
  {
    title: "Social Media Analytics - Neural Nitwits",
    category: "DATA ANALYTICS",
    description:
      "Developed a full-stack application using Langflow and DataStax Astra DB for content engagement analysis with an intuitive interface. Implemented an AI-powered chatbot interface for natural language data querying and insights extraction.",
    link: "#", // Replace with actual link
    image: "/hall.webp", // Placeholder image
  },
  {
    title: "HackWithHer Website",
    category: "WEB DEVELOPMENT",
    description:
      "Developed a responsive and interactive website for a national-level hackathon with 3000+ participants, using Next.js and Material-UI to deliver a 99.9% uptime and ensure smooth user navigation across 10+ pages. Integrated MongoDB for efficient data management, handling 1000+ database transactions seamlessly to securely store participant information, event schedules, and project submissions. Implemented Cloudinary for media management, optimizing 500+ document and presentation uploads, reducing load times by 40%, and enhancing overall website performance.",
    link: "#", // Replace with actual link
    image: "/hall.webp", // Placeholder image
  },
  {
    title: "Skillzy | A Platform for Freelancers",
    category: "FULLSTACK MARKETPLACE",
    description:
      "Developed a full-stack freelance marketplace using Next.js, TailwindCSS, and MongoDB, enabling seamless employer and freelancer interactions and ensure smooth user navigation across 10+ pages. Implemented secure authentication with email verification, role-based access control, optimized backend performance ensuring 99.9% uptime for a smooth user experience. Integrated Gemini AI for dynamic skill verification, generating new medium and hard-level questions based on a freelancer’s skill set to ensure continuous assessment and improvement.",
    link: "#", // Replace with actual link
    image: "/hall.webp", // Placeholder image
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12 text-left">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl font-bold text-darkForeground mb-4 font-space-grotesk relative inline-block">
          Projects
          <span className="absolute left-0 bottom-0 h-1 w-full bg-accentGreen opacity-50"></span>
        </h2>
        <p className="text-xl md:text-2xl text-darkForeground mb-16 font-inter max-w-2xl">
          I worked on these projects as both a developer and designer, writing code to build them while designing in
          Figma.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-darkBackground border-darkBorder text-darkForeground hover:border-accentGreen transition-colors duration-300 flex flex-col"
            >
              <CardHeader className="pb-0">
                <p className="text-sm uppercase text-darkForeground/70 font-inter mb-2">{project.category}</p>
                <div className="relative w-full h-60 bg-darkBorder rounded-md overflow-hidden mb-4">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-darkBackground/50 p-2 rounded-full text-darkForeground hover:text-accentGreen transition-colors duration-300"
                    aria-label={`View ${project.title} project`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between pt-4">
                <div>
                  <p className="text-4xl font-bold text-darkForeground mb-4 font-space-grotesk">
                    {(index + 1).toString().padStart(2, "0")}.
                  </p>
                  <p className="text-lg text-darkForeground leading-relaxed font-inter">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
