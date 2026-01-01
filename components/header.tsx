"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glassmorphic border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-foreground/20 flex items-center justify-center font-bold text-lg">
            C
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline">CareerHub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors smooth-fade">
            Browse
          </a>
          <Link href="/assessments" className="text-muted-foreground hover:text-foreground transition-colors smooth-fade">
            Assessments
          </Link>
          <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors smooth-fade">
            Success Stories
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors smooth-fade">
            Plans
          </a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:bg-foreground/10">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="glassmorphic-button-primary text-black">Sign Up</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 glassmorphic border-b p-4 md:hidden slide-up">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-foreground hover:text-muted-foreground transition-colors">
                Browse
              </a>
              <Link href="/assessments" className="text-foreground hover:text-muted-foreground transition-colors">
                Assessments
              </Link>
              <a href="#testimonials" className="text-foreground hover:text-muted-foreground transition-colors">
                Success Stories
              </a>
              <a href="#pricing" className="text-foreground hover:text-muted-foreground transition-colors">
                Plans
              </a>
              <div className="flex gap-2 pt-4">
                <ThemeToggle />
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full glassmorphic-button-primary text-black">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
