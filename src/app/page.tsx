import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { DotBackground } from "@/components/dot-background";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section" 
import { Component as BgGradient } from "@/components/ui/bg-gradient"

export default function Home() {
  return (
    <main className="relative z-10">
      <Navbar />
      <DotBackground className="min-h-screen">
        <HeroSection />
      </DotBackground>
      <BgGradient
        gradientFrom="#0a0a0a" // Start with dark background color
        gradientTo="#00ff80" // End with accent green
        gradientSize="150% 150%"
        gradientPosition="50% 50%"
        gradientStop="0%"
        className="opacity-10" // Make it subtle
      />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
       <EducationSection /> 
      <ContactSection />
    </main>
  );
}
