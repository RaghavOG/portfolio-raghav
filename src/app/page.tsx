"use client"

import { motion } from "framer-motion"
import { useState, useCallback } from "react"
import Preloader from "@/components/ui/preloader"
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
import { GitHubSection } from "@/components/sections/github-section";
import { TerminalSection } from "@/components/sections/terminal-section";
import { BlogSection } from "@/components/sections/blog-section";
import { SplashCursor } from "@/components/ui/splash-cursor"
import { BackToTop } from "@/components/ui/back-to-top"
import { SectionIndicators } from "@/components/ui/section-indicators"
import Footer from "@/components/footer";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true)

  const handleComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <>
      {showPreloader && <Preloader onComplete={handleComplete} />}
      <motion.main 
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: showPreloader ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <SplashCursor />
        <SectionIndicators />
        <BackToTop />
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
        {/* <section id="testimonials">
          <TestimonialsSection />
        </section> */}
        <section id="education">
          <EducationSection />
        </section>
        {/* <section id="github">
          <GitHubSection />
        </section> */}
        <section id="terminal">
          <TerminalSection />
        </section>
        <section id="blog">
          <BlogSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
        <Footer />
      </motion.main>
    </>
  );
}
