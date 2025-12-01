"use client"

import { Wallet, Network, Server, ArrowRight, ArrowDown } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

export function NetworkSection() {
  return (
    <section id="network" className="relative py-16 sm:py-24 lg:py-32 bg-tinted-bg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Marker - Added scroll animation */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <span className="text-xs font-mono text-muted-foreground bg-background px-3 py-1 rounded-full">03</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              U2U Network Layer
            </span>
          </div>
        </AnimateOnScroll>

        {/* Intro Text - Added scroll animation */}
        <AnimateOnScroll animation="fade-up" delay={100}>
          <div className="max-w-2xl mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-3 sm:mb-4 text-balance">
              U2U Network & Validator Architecture
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              U2U Network leverages DAG + Helios consensus for blazing-fast, EVM-compatible transactions. Our validator
              node participates directly in securing DePIN subnets and processing network consensus.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Architecture Diagram - Added staggered animations and hover effects */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-stretch">
            {/* Users Column */}
            <AnimateOnScroll animation="fade-left" delay={200} className="flex-1">
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full card-hover">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center">
                    <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Users</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    Wallets & Delegators
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    DApps & Interfaces
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                    DePIN Applications
                  </li>
                </ul>
              </div>
            </AnimateOnScroll>

            {/* Arrow 1 - Added pulse animation to arrows */}
            <AnimateOnScroll
              animation="fade-scale"
              delay={300}
              className="flex items-center justify-center py-2 lg:py-0 lg:px-4"
            >
              <div className="flex items-center gap-2">
                <div className="lg:hidden flex flex-col items-center gap-1">
                  <div className="w-px h-4 bg-spine spine-pulse" />
                  <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
                  <div className="w-px h-4 bg-spine spine-pulse" />
                </div>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-8 h-px bg-spine spine-pulse" />
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <div className="w-8 h-px bg-spine spine-pulse" />
                </div>
              </div>
            </AnimateOnScroll>

            {/* U2U Network Column */}
            <AnimateOnScroll animation="fade-scale" delay={400} className="flex-1">
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full border-primary/30 card-hover">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                    <Network className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">U2U Network</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="bg-secondary/50 rounded-lg px-3 sm:px-4 py-2 text-sm hover:bg-secondary/70 transition-colors">
                    <span className="text-primary font-medium">Helios</span>
                    <span className="text-muted-foreground"> + DAG Consensus</span>
                  </div>
                  <div className="bg-secondary/50 rounded-lg px-3 sm:px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/70 transition-colors">
                    EVM Compatible
                  </div>
                  <div className="bg-secondary/50 rounded-lg px-3 sm:px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/70 transition-colors">
                    Fast Finality (~500ms)
                  </div>
                  <div className="bg-secondary/50 rounded-lg px-3 sm:px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/70 transition-colors">
                    DePIN Subnets
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Arrow 2 */}
            <AnimateOnScroll
              animation="fade-scale"
              delay={500}
              className="flex items-center justify-center py-2 lg:py-0 lg:px-4"
            >
              <div className="flex items-center gap-2">
                <div className="lg:hidden flex flex-col items-center gap-1">
                  <div className="w-px h-4 bg-spine spine-pulse" />
                  <ArrowDown className="w-4 h-4 text-primary animate-bounce" />
                  <div className="w-px h-4 bg-spine spine-pulse" />
                </div>
                <div className="hidden lg:flex items-center gap-2">
                  <div className="w-8 h-px bg-spine spine-pulse" />
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <div className="w-8 h-px bg-spine spine-pulse" />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Our Validator Column */}
            <AnimateOnScroll animation="fade-right" delay={600} className="flex-1">
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 h-full border-primary/20 card-hover">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary flex items-center justify-center">
                    <Server className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-foreground">Our Validator</h3>
                </div>
                <div className="space-y-2 sm:space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Validator ID</span>
                    <span className="font-mono text-foreground text-xs sm:text-sm">14</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">The Highest APR</span>
                    <span className="text-primary font-medium">18.07%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Bonus Rewards</span>
                    <span className="text-primary font-medium">15%</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/50">
                    <span className="text-muted-foreground">Region</span>
                    <span className="text-foreground">Asia</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Monitoring</span>
                    <span className="flex items-center gap-1.5 text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      24/7
                    </span>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Caption */}
          <AnimateOnScroll animation="fade-up" delay={700}>
            <p className="text-center text-xs text-muted-foreground mt-6 sm:mt-8">
              Simplified view of how your delegation participates in securing U2U.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  )
}
