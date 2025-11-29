"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Hexagon } from "lucide-react"

const navItems = [
  { label: "About", href: "#hero" },
  { label: "Network", href: "#network" },
  { label: "Validator", href: "#stats" },
  { label: "Rewards", href: "#staking" },
  { label: "How to Stake", href: "#staking" },
  { label: "Resources", href: "#resources" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2 group">
            <div className="relative">
              <Hexagon className="w-7 h-7 sm:w-8 sm:h-8 text-primary fill-primary/10 transition-all group-hover:fill-primary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
              </div>
            </div>
            <span className="font-semibold text-foreground text-sm sm:text-base">
              GlobalValidator <span className="hidden xs:inline text-muted-foreground font-normal">• U2U Validator</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 xl:px-6">
              Launch Staking dApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground -mr-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors py-3 px-2 rounded-lg text-sm sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full mt-4">
                Launch Staking dApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
