"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full bg-darkBackground py-4 px-6 md:px-12 border-b border-darkBorder">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-darkForeground font-space-grotesk">
          [Your Name]
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-darkForeground hover:text-accentGreen transition-colors duration-300 font-inter"
            >
              {link.name}
            </Link>
          ))}
          <Button
            className="bg-accentGreen text-darkBackground hover:bg-accentGreen/80 rounded-full px-6 py-2 font-bold transition-colors duration-300"
            asChild
          >
            <a href="/your-resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className="text-darkForeground"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-40 bg-darkBackground transition-transform duration-300 ease-in-out md:hidden",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex justify-end p-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-darkForeground"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close navigation</span>
          </Button>
        </div>
        <nav className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-darkForeground text-xl hover:text-accentGreen transition-colors duration-300 font-inter"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button
            className="bg-accentGreen text-darkBackground hover:bg-accentGreen/80 rounded-full px-8 py-3 text-lg font-bold transition-colors duration-300"
            asChild
            onClick={() => setIsOpen(false)}
          >
            <a href="/your-resume.pdf" download>
              Download Resume
            </a>
          </Button>
        </nav>
      </div>
    </nav>
  );
}