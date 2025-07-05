import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const projects = [
  {
    title: "AI Chatbot Platform",
    description: "Developed a full-stack platform for custom AI chatbots with real-time interaction.",
    link: "#",
  },
  {
    title: "E-commerce Storefront",
    description: "Built a responsive e-commerce site with secure payment integration and product management.",
    link: "#",
  },
  {
    title: "Portfolio Website V1",
    description: "Designed and developed a personal portfolio to showcase my work and skills.",
    link: "#",
  },
  {
    title: "Task Management App",
    description: "Created a collaborative task management application with user authentication.",
    link: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">
          My Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="bg-darkBackground border-darkBorder text-darkForeground hover:border-accentGreen transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-space-grotesk text-accentGreen">{project.title}</CardTitle>
                <CardDescription className="text-darkForeground/80 font-inter">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={project.link} className="text-accentGreen hover:underline font-inter">
                  View Project &rarr;
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
