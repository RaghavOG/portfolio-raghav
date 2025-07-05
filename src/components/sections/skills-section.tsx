import React from "react";

const skills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
  "Tailwind CSS", "Shadcn/ui", "SQL", "NoSQL", "Git", "Docker", "AWS", "AI/ML Basics"
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">
          My Skills
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-darkBorder text-darkForeground px-6 py-3 rounded-full text-lg font-medium font-inter shadow-lg hover:bg-accentGreen hover:text-darkBackground transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
