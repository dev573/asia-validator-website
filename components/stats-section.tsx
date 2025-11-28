"use client"

import { Users, Activity, Globe, Boxes, Server, Clock, UserCheck, Percent } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"
import { useEffect, useRef, useState } from "react"

const networkStats = [
  { icon: Users, value: "1M+", label: "Network Users", source: "U2U Network" },
  { icon: Activity, value: "900K+", label: "Monthly Active", source: "U2U Network" },
  { icon: Globe, value: "59M+", label: "Sessions via U2DPN", source: "U2U Network" },
  { icon: Boxes, value: "40+", label: "DePIN Projects", source: "U2U Network" },
]

const validatorStats = [
  { icon: Server, value: "2.4M", label: "Total U2U Staked", highlight: true },
  { icon: Clock, value: "99.9%", label: "Uptime (30D)", highlight: false },
  { icon: UserCheck, value: "847", label: "Delegators", highlight: false },
  { icon: Percent, value: "5%", label: "Commission", highlight: true },
]

function AnimatedNumber({ value, isVisible }: { value: string; isVisible: boolean }) {
  const [displayValue, setDisplayValue] = useState("0")
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    hasAnimated.current = true

    const numericMatch = value.match(/[\d.]+/)
    if (!numericMatch) {
      setDisplayValue(value)
      return
    }

    const targetNum = Number.parseFloat(numericMatch[0])
    const suffix = value.replace(/[\d.]+/, "")
    const duration = 2000
    const steps = 60
    const increment = targetNum / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= targetNum) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        const formatted = targetNum >= 100 ? Math.floor(current).toString() : current.toFixed(1)
        setDisplayValue(formatted + suffix)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return <span>{displayValue}</span>
}

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="stats" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Marker */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">04</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              The Numbers Speak
            </span>
          </div>
        </AnimateOnScroll>

        {/* Network Stats - Added staggered animations and hover effects */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-6">
              Network-wide Statistics
            </h3>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {networkStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={index} animation="fade-scale" delay={index * 100}>
                  <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center group hover:border-primary/30 transition-all duration-300 card-hover">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-foreground mb-1">
                      <AnimatedNumber value={stat.value} isVisible={isVisible} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
          <AnimateOnScroll animation="fade-up" delay={500}>
            <p className="text-xs text-muted-foreground mt-3 sm:mt-4 text-center">Source: U2U Network</p>
          </AnimateOnScroll>
        </div>

        {/* Validator Stats */}
        <div>
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-6">
              Our Validator Performance
            </h3>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {validatorStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={index} animation="fade-scale" delay={index * 100 + 200}>
                  <div
                    className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center card-hover ${
                      stat.highlight ? "border-primary/30" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                        stat.highlight ? "bg-primary" : "bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.highlight ? "text-primary-foreground" : "text-primary"}`}
                      />
                    </div>
                    <div
                      className={`text-2xl sm:text-3xl lg:text-4xl font-light mb-1 ${
                        stat.highlight ? "text-primary" : "text-foreground"
                      }`}
                    >
                      <AnimatedNumber value={stat.value} isVisible={isVisible} />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </AnimateOnScroll>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
