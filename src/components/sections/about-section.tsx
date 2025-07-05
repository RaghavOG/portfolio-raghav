import React from "react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-8 font-space-grotesk">
          About Me
        </h2>
        <p className="text-lg md:text-xl text-darkForeground leading-relaxed font-inter">
          I am a passionate Full Stack Engineer with a strong focus on building
          scalable and user-friendly applications. My expertise spans across
          frontend frameworks like React, backend technologies such as Node.js
          and Python, and database management. I thrive on solving complex
          problems and continuously learning new technologies to deliver
          innovative solutions.
        </p>
        <p className="text-lg md:text-xl text-darkForeground leading-relaxed mt-4 font-inter">
          Beyond coding, I enjoy exploring the intersection of AI and web
          development, always looking for ways to integrate intelligent systems
          into everyday applications.
        </p>
      </div>
    </section>
  );
}
