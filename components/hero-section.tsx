"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, ChevronRight } from "lucide-react"
import { ValidatorOrb } from "./validator-orb"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      // Calculate mouse position relative to section center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      setMousePosition({ x, y })
    }

    const section = sectionRef.current
    if (section) {
      section.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen pt-20 lg:pt-0 flex flex-col justify-center overflow-x-hidden"
    >
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-20 left-[20%] w-80 h-80 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center lg:items-start">
          {/* Left Content - Added staggered fade-in animations + cursor parallax */}
          <div
            className="relative z-10 order-2 lg:order-1"
            style={{
              transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <p
              className={`text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary font-medium mb-3 sm:mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              Leading Validator for the U2U Network
            </p>
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-[1.1] mb-4 sm:mb-6 text-balance transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              Stake with a High-Performance <span className="text-primary font-normal">U2U Validator</span>
            </h1>
            <p
              className={`text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-lg leading-relaxed transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              Earn U2U rewards while helping secure the DePIN-focused U2U Network. Non-custodial, transparent, and
              optimized for maximum uptime.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-16 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 sm:px-8 h-11 sm:h-12 w-full sm:w-auto btn-hover relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  Stake with Us
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 sm:px-8 h-11 sm:h-12 border-border hover:bg-secondary bg-transparent w-full sm:w-auto btn-hover"
              >
                View Network
              </Button>
            </div>

            {/* Section Marker - Added fade-in animation */}
            <div
              className={`flex items-start gap-4 sm:gap-6 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "0.5s" }}
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-muted-foreground">01</span>
                <div className="w-px h-12 sm:h-16 bg-spine mt-2 spine-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-foreground mb-3 sm:mb-4 leading-tight">
                  THE VALIDATOR /<br />
                  <span className="text-primary">FOR THE HELIOS ERA</span>
                </h2>
                <ul className="space-y-2 sm:space-y-3 text-sm text-muted-foreground">
                  {[
                    "Non-custodial staking, you stay in control.",
                    "Optimized uptime & monitoring.",
                    "Backed by professional Web3 / infra team.",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className={`flex items-center gap-2 sm:gap-3 transition-all duration-500 ${
                        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                      style={{ transitionDelay: `${0.6 + i * 0.1}s` }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right - Orb Visual - Enhanced with cursor tracking */}
          <div
            className={`relative order-1 lg:order-2 flex justify-center lg:-mt-8 lg:pt-12 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div
              className="scale-75 sm:scale-90 lg:scale-100"
              style={{
                transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotateY(${mousePosition.x * 10}deg) rotateX(${mousePosition.y * -10}deg)`,
                transition: "transform 0.2s ease-out",
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              <ValidatorOrb mousePosition={mousePosition} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on very small screens */}
      <div
        className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hidden sm:flex transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: "1s" }}
      >
        <span className="text-xs text-muted-foreground">Scroll</span>
        <ArrowDown className="w-4 h-4 text-muted-foreground animate-bounce" />
      </div>
    </section>
  )
}
