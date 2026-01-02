"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Helper: generate correct href for hash links
  const getHref = (hash: string) => (pathname === "/" ? `#${hash}` : `/#${hash}`)

  // Smooth scroll when already on homepage
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 glassmorphic border-b shadow-md backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-foreground/20 flex items-center justify-center font-bold text-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            C
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:inline tracking-wide group-hover:opacity-90 transition-opacity duration-300">
            CareerHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: "Browse", hash: "features" },
            { name: "Assessments", href: "/assessments" },
            { name: "Success Stories", hash: "testimonials" },
            { name: "Plans", hash: "pricing" },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href || getHref(link.hash!)}
              className={`relative text-muted-foreground hover:text-foreground transition-colors duration-300
                ${pathname.includes(link.href || "") ? "font-semibold text-foreground underline underline-offset-4" : ""}
                hover:bg-gradient-to-r hover:from-primary/20 hover:to-secondary/20 px-2 py-1 rounded-md`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="text-foreground hover:bg-foreground/10 transition duration-300">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="glassmorphic-button-primary text-black shadow-lg hover:scale-105 transition-transform duration-300">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {isOpen ? (
            <X size={24} className="transition-transform duration-300 group-hover:-rotate-12" />
          ) : (
            <Menu size={24} className="transition-transform duration-300 group-hover:rotate-12" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 glassmorphic border-b p-4 md:hidden slide-up rounded-b-xl shadow-lg backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {[
                { name: "Browse", hash: "features" },
                { name: "Assessments", href: "/assessments" },
                { name: "Success Stories", hash: "testimonials" },
                { name: "Plans", hash: "pricing" },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href || getHref(link.hash!)}
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 transform hover:translate-x-1"
                  onClick={() => setIsOpen(false)} // close menu on click
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-2 pt-4">
                <ThemeToggle />
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent hover:opacity-80 transition duration-300">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full glassmorphic-button-primary text-black shadow-lg hover:scale-105 transition-transform duration-300">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
