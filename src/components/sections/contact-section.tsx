import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-darkForeground mb-12 font-space-grotesk">
          Get In Touch
        </h2>
        <form className="space-y-6 text-left">
          <div>
            <Label htmlFor="name" className="text-darkForeground font-inter">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Name"
              className="bg-darkBackground border-darkBorder text-darkForeground focus:ring-accentGreen focus:border-accentGreen mt-1 font-inter"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-darkForeground font-inter">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              className="bg-darkBackground border-darkBorder text-darkForeground focus:ring-accentGreen focus:border-accentGreen mt-1 font-inter"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-darkForeground font-inter">Message</Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              rows={5}
              className="bg-darkBackground border-darkBorder text-darkForeground focus:ring-accentGreen focus:border-accentGreen mt-1 font-inter"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-accentGreen text-darkBackground hover:bg-accentGreen/80 rounded-full px-8 py-3 text-lg font-bold transition-colors duration-300 font-inter"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
}
