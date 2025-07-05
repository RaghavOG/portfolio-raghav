import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Linkedin, Github, Mail, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            get in touch
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-inter max-w-2xl leading-relaxed">
            let's discuss your next project or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 font-space-grotesk">
                contact information
              </h3>
              
              <div className="space-y-6">
                <Link
                  href="https://www.linkedin.com/in/singlaraghav"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Linkedin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium font-inter">LinkedIn</p>
                    <p className="text-white/60 text-sm font-inter">singlaraghav</p>
                  </div>
                </Link>

                <Link
                  href="https://github.com/RaghavOG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Github className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium font-inter">GitHub</p>
                    <p className="text-white/60 text-sm font-inter">RaghavOG</p>
                  </div>
                </Link>

                <a
                  href="mailto:04raghavsingla28@gmail.com"
                  className="group flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium font-inter">Email</p>
                    <p className="text-white/60 text-sm font-inter">04raghavsingla28@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+9194XXXXXX33"
                  className="group flex items-center gap-4 p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                >
                  <div className="bg-white/10 p-3 rounded-lg group-hover:bg-white/20 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium font-inter">Phone</p>
                    <p className="text-white/60 text-sm font-inter">+91 94XXXXX133</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white font-space-grotesk">
              send a message
            </h3>
            
            <form className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-white/80 font-inter text-lg mb-2 block">
                  name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="your name"
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 h-12 font-inter"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80 font-inter text-lg mb-2 block">
                  email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 h-12 font-inter"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white/80 font-inter text-lg mb-2 block">
                  message
                </Label>
                <Textarea
                  id="message"
                  placeholder="your message..."
                  rows={6}
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none font-inter"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-white/90 h-12 text-lg font-medium transition-all duration-300 font-inter rounded-lg"
              >
                send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
