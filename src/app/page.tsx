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
import { ServicesSection } from "@/components/sections/services-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { SplashCursor } from "@/components/ui/splash-cursor"
import Footer from "@/components/footer";



export default function Home() {
  return (
    <main className="relative">
      <SplashCursor />
      <Navbar />
      <DotBackground className="min-h-screen">
        <HeroSection />
      </DotBackground>
      <section id="about">
        <AboutSection />
      </section>
      <section id="services">
        <ServicesSection />
      </section>
      <section id="skills">
        <SkillsSection />
      </section>
      <section id="projects">
        <ProjectsSection />
      </section>
      <section id="experience">
        <ExperienceSection />
      </section>
      <section id="testimonials">
        <TestimonialsSection />
      </section>
      <section id="education">
        <EducationSection />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </main>
  );
}
