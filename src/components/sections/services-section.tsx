const services = [
  {
    number: "01.",
    title: "Web Design",
    description:
      "I design clean, elegant, and user-friendly websites. Interfaces that feel effortless while maintaining strong visual appeal.",
  },
  {
    number: "02.",
    title: "Web Development",
    description:
      "I write clean, maintainable code using TypeScript and ESLint. With Next.js or React and Tailwind, I build reusable components for efficient development.",
  },
  {
    number: "03.",
    title: "Chrome extension Development",
    description:
      "Sometimes, you may need to perform repetitive tasks on certain websites. I'm here to automate your workflow and save you time.",
  },
  {
    number: "04.",
    title: "Hosting & Cloudflare",
    description:
      "I can host your websites on all major hosting providers and set up Cloudflare to enhance speed and security.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Services
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-inter max-w-2xl leading-relaxed">
            I offer a range of services focused on web solutions—whether it's brand building or work automation
          </p>
        </div>

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="py-12 border-b border-white/20 last:border-b-0 hover:bg-white/5 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[120px_400px_1fr] gap-8 items-start">
                {/* Number */}
                <div className="text-lg font-medium text-white/60 font-mono">
                  {service.number}
                </div>
                
                {/* Title */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk leading-tight">
                    {service.title}
                  </h3>
                </div>
                
                {/* Description */}
                <div>
                  <p className="text-lg text-white/70 font-inter leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
