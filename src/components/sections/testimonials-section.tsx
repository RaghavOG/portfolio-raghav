import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote: "raghav delivered exceptional work on our web platform. his attention to detail and problem-solving skills made the entire development process smooth and efficient.",
    name: "priya sharma",
    designation: "product manager at techflow",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "working with raghav was a game-changer for our startup. he understood our vision and translated it into a robust, scalable application that exceeded our expectations.",
    name: "alex chen",
    designation: "founder & ceo at innovatesphere",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "raghav's full-stack expertise helped us launch our platform ahead of schedule. his code quality and documentation made future maintenance a breeze.",
    name: "sarah wilson",
    designation: "tech lead at cloudscale",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "impressive technical skills combined with excellent communication. raghav not only delivered great code but also provided valuable insights for our project architecture.",
    name: "david kumar",
    designation: "engineering manager at datapro",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote: "the attention to detail and innovative features raghav implemented completely transformed our workflow. this is exactly what we've been looking for.",
    name: "maya patel",
    designation: "operations director at futuretech",
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
            testimonials
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
