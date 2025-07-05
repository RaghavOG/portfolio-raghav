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
    <section id="projects" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Projects
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-inter max-w-2xl leading-relaxed">
            I worked on these projects as both a developer and designer, writing code to build them while designing in
            Figma.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-0">
                <p className="text-sm uppercase text-white/60 font-inter mb-4 px-6 pt-6">{project.category}</p>
                <div className="relative w-full h-60 bg-white/10 overflow-hidden mb-4 mx-6" style={{width: 'calc(100% - 3rem)'}}>
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105 rounded-md"
                  />
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors duration-300"
                    aria-label={`View ${project.title} project`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div>
                  <p className="text-4xl font-bold text-white mb-4 font-space-grotesk">
                    {(index + 1).toString().padStart(2, "0")}.
                  </p>
                  <p className="text-lg text-white/70 leading-relaxed font-inter">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
