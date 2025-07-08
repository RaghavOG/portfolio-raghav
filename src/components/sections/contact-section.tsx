'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Linkedin, Github, Mail, Phone } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send message. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-black text-white min-h-screen">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 font-space-grotesk tracking-tight">
            Get in Touch
          </h2>
          <p className="text-xl md:text-2xl text-white/80 font-inter max-w-2xl leading-relaxed">
            Let's discuss your next project or just say hello
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 font-space-grotesk">
                Contact Information
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
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus.type && (
                <div className={`p-4 rounded-lg border ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div>
                <Label htmlFor="name" className="text-white/80 font-inter text-lg mb-2 block">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 h-12 font-inter"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80 font-inter text-lg mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 h-12 font-inter"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-white/80 font-inter text-lg mb-2 block">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Message..."
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none font-inter"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-white/90 h-12 text-lg font-medium transition-all duration-300 font-inter rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
