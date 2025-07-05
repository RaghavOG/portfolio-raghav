import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    duration: "Jan 2022 - Present",
    description: "Developed and maintained web applications, focusing on both frontend and backend development. Implemented new features, optimized performance, and collaborated with cross-functional teams.",
  },
  {
    title: "AI Research Intern",
    company: "Innovate AI Lab",
    duration: "Summer 2021",
    description: "Assisted in research and development of machine learning models for natural language processing. Contributed to data preprocessing and model evaluation.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">
          Experience
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="bg-darkBackground border-darkBorder text-darkForeground text-left hover:border-accentGreen transition-colors duration-300">
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
  );
}
