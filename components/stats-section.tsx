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

const initialValidatorStats = [
  { icon: Server, value: "2.4M", label: "Total U2U Staked", highlight: true },
  { icon: Clock, value: "99.9%", label: "Uptime (30D)", highlight: false },
  { icon: UserCheck, value: "847", label: "Delegators", highlight: false },
  { icon: Percent, value: "18.07%", label: "The Best APR", highlight: true },
]

const initialStakingOverview = [
  { icon: Server, value: "0.7M", label: "Total U2U Staked", highlight: true },
  { icon: Boxes, value: "20", label: "Validators", highlight: false },
  { icon: UserCheck, value: "239", label: "Delegators", highlight: false },
  { icon: Percent, value: "5.47-12.75%", label: "APR", highlight: true },
]

function formatCompactNumber(value: number) {
  if (!Number.isFinite(value)) return "0"
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toFixed(value >= 100 ? 0 : 2).replace(/\.00$/, "")
}

function formatTokenAmount(raw?: string) {
  if (!raw) return "0"
  const amount = BigInt(raw)
  const decimals = 18n
  const divisor = 10n ** decimals
  const whole = amount / divisor
  const fraction = amount % divisor
  const fractionalPreview = Number(fraction / 10n ** (decimals - 4n)) / 10_000
  const numericValue = Number(whole) + fractionalPreview
  return formatCompactNumber(numericValue)
}

function formatDelegators(value?: string | number) {
  const num = Number(value ?? 0)
  if (!Number.isFinite(num)) return "0"
  return new Intl.NumberFormat("en-US").format(Math.round(num))
}

function calculateUptime(downTime?: string) {
  const secondsIn30Days = 30 * 24 * 60 * 60
  const downSeconds = Number.parseFloat(downTime ?? "0")
  if (!Number.isFinite(downSeconds) || downSeconds < 0) return "99.9%"

  const uptime = 100 - (downSeconds / secondsIn30Days) * 100
  const clamped = Math.max(0, Math.min(100, uptime))
  const precision = clamped >= 100 || clamped >= 99.95 ? 1 : 2
  return `${clamped.toFixed(precision).replace(/\.0+$/, "")}%`
}

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
  const [stakingOverview, setStakingOverview] = useState(initialStakingOverview)
  const [validatorStats, setValidatorStats] = useState(initialValidatorStats)
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

  useEffect(() => {
    const controller = new AbortController()

    const fetchStakingStats = async () => {
      try {
        const response = await fetch("https://graph.u2u.xyz/subgraphs/name/u2u/sfc-subgraph-v3", {
          method: "POST",
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            operationName: "StakingStats",
            variables: {},
            query: `
              query StakingStats {
                stakings(first: 1, orderBy: id, orderDirection: desc) {
                  totalStaked
                  totalDelegated
                  totalSelfStaked
                  totalValidator
                  totalDelegator
                  totalClaimedRewards
                }
              }
            `,
          }),
          signal: controller.signal,
        })

        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const payload = await response.json()
        const staking = payload?.data?.stakings?.[0]
        if (!staking) return

        setStakingOverview([
          { icon: Server, value: formatTokenAmount(staking.totalStaked), label: "Total U2U Staked", highlight: true },
          { icon: Boxes, value: formatDelegators(staking.totalValidator), label: "Validators", highlight: false },
          { icon: UserCheck, value: formatDelegators(staking.totalDelegator), label: "Delegators", highlight: false },
          { icon: Percent, value: "5.47-12.75%", label: "APR", highlight: true },
        ])
      } catch (error) {
        console.error("Failed to load staking overview", error)
      }
    }

    fetchStakingStats()

    const controllerValidators = new AbortController()

    const fetchValidatorStats = async () => {
      try {
        const response = await fetch("https://graph.u2u.xyz/subgraphs/name/u2u/sfc-subgraph-v3", {
          method: "POST",
          headers: {
            accept: "*/*",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query Validators {
                validators(where: { validatorId: "14" }) {
                  totalStakedAmount
                  totalDelegator
                  downTime
                }
              }
            `,
            variables: {},
          }),
          signal: controllerValidators.signal,
        })

        if (!response.ok) throw new Error(`Request failed: ${response.status}`)
        const payload = await response.json()
        const validator = payload?.data?.validators?.[0]
        if (!validator) return

        const totalStaked = formatTokenAmount(validator.totalStakedAmount)
        const delegators = formatDelegators(validator.totalDelegator)
        const uptime = calculateUptime(validator.downTime)

        setValidatorStats([
          { icon: Server, value: totalStaked, label: "Total U2U Staked", highlight: true },
          { icon: Clock, value: uptime, label: "Uptime (30D)", highlight: false },
          { icon: UserCheck, value: delegators, label: "Delegators", highlight: false },
          { icon: Percent, value: "5.47-12.75%", label: "APR", highlight: true },
        ])
      } catch (error) {
        console.error("Failed to load validator stats", error)
      }
    }

    fetchValidatorStats()

    return () => {
      controller.abort()
      controllerValidators.abort()
    }
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 items-stretch">
            {networkStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={index} animation="fade-scale" delay={index * 100}>
                  <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center group hover:border-primary/30 transition-all duration-300 card-hover h-full flex flex-col items-center justify-center">
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

        {/* Network Staking Overview */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <AnimateOnScroll animation="fade-up">
            <h3 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-6">
              Network Staking Overview
            </h3>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stakingOverview.map((stat, index) => {
              const Icon = stat.icon
              return (
                <AnimateOnScroll key={index} animation="fade-scale" delay={index * 100 + 150}>
                  <div
                    className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center card-hover group ${
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
                    className={`glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center card-hover group ${
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
