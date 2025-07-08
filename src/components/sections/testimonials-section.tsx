import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "Raghav delivered exceptional work on our web platform. His attention to detail and problem-solving skills made the entire development process smooth and efficient.",
    name: "Priya Sharma",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "Working with Raghav was a game-changer for our startup. He understood our vision and translated it into a robust, scalable application that exceeded our expectations.",
    name: "Alex Chen",
    designation: "Founder & CEO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "Raghav's full-stack expertise helped us launch our platform ahead of schedule. His code quality and documentation made future maintenance a breeze.",
    name: "Sarah Wilson",
    designation: "Tech Lead at CloudScale",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "Impressive technical skills combined with excellent communication. Raghav not only delivered great code but also provided valuable insights for our project architecture.",
    name: "David Kumar",
    designation: "Engineering Manager at DataPro",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "The attention to detail and innovative features Raghav implemented completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Maya Patel",
    designation: "Operations Director at FutureTech",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  }
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Testimonials
          </h2>
        </div>

        {/* Animated Testimonials */}
        <div className="flex justify-center">
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </div>
    </section>
  )
}
