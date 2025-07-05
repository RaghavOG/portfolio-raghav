export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-8 font-space-grotesk">About Me</h2>
        <p className="text-lg md:text-xl text-darkForeground leading-relaxed font-inter">
          I am a passionate Full Stack Engineer with a strong focus on building scalable and user-friendly applications.
          My expertise spans across frontend frameworks like React, backend technologies such as Node.js and Python, and
          database management. I thrive on solving complex problems and continuously learning new technologies to
          deliver innovative solutions.
        </p>
        <p className="text-lg md:text-xl text-darkForeground leading-relaxed mt-4 font-inter">
          Beyond coding, I enjoy exploring the intersection of AI and web development, always looking for ways to
          integrate intelligent systems into everyday applications.
        </p>

        <h3 className="text-3xl md:text-4xl font-bold text-darkForeground mt-16 mb-8 font-space-grotesk">
          Achievements
        </h3>
        <ul className="list-disc list-inside text-lg md:text-xl text-darkForeground leading-relaxed font-inter space-y-2 text-left mx-auto max-w-2xl">
          <li>
            Created and published 4 developer-focused NPM packages (complete-auth-system, mern-vite-shadcn-template,
            vite-tailwind-starter, and vite-shadcn-starter) that have garnered over 1000+ combined downloads.
          </li>
          <li>SIH College Level Round Qualifiers 2023.</li>
          <li>Finalists HackIndia Web3 Hackathon.</li>
        </ul>
      </div>
    </section>
  )
}
