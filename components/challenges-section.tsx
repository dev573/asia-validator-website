"use client"

import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

export function ChallengesSection() {
  return (
    <section id="challenges" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Marker - Added scroll animation */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">02</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              Challenges Met / Solutions Built
            </span>
          </div>
        </AnimateOnScroll>

        {/* Two-column cards - Added staggered scroll animations and hover effects */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Challenges Card */}
          <AnimateOnScroll animation="fade-left" delay={100}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-primary/5 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-destructive" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Typical Staking Pain Points</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {[
                  "Hard to judge validator reliability and track record.",
                  "Poor transparency about uptime & slashing risk.",
                  "Confusing UX for new users entering Web3.",
                  "Hidden fees and unclear commission structures.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive/60 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateOnScroll>

          {/* Solutions Card */}
          <AnimateOnScroll animation="fade-right" delay={200}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl shadow-primary/5 border-primary/20 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Our Validator Approach</h3>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {[
                  "Public uptime & performance dashboard.",
                  "Transparent commission and reward history.",
                  "Simple step-by-step staking guide for beginners.",
                  "Enterprise-grade infrastructure with 24/7 monitoring.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#validator-performance"
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
              >
                See Our Validator Stats
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
