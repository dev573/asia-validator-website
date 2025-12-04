"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Wallet, ArrowRightLeft, TrendingUp, ChevronDown, Lock } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

export function StakingSection() {
  const [amount, setAmount] = useState("1000")
  const [lockDays, setLockDays] = useState([90])
  const [swapFrom] = useState("USDT")
  const [swapAmount, setSwapAmount] = useState("100")
  const [aprPercent, setAprPercent] = useState<number | null>(null)
  const [aprLoading, setAprLoading] = useState(false)

  // Lock Section State
  const [lockAmount, setLockAmount] = useState("1000")
  const [lockDuration, setLockDuration] = useState([365])
  const [lockAprPercent, setLockAprPercent] = useState<number | null>(null)
  const [lockAprLoading, setLockAprLoading] = useState(false)

  const validatorId = 14

  const baseApr = aprPercent ?? 0
  const totalApr = baseApr

  const numericAmount = Number.parseFloat(amount) || 0
  const rewardForDays = (days: number, apr: number, amount: number) => amount * (apr / 100) * (days / 365)
  const estimatedReward = rewardForDays(lockDays[0], totalApr, numericAmount)

  // Lock Section Logic
  const baseLockApr = lockAprPercent ?? 0
  const totalLockApr = baseLockApr
  const numericLockAmount = Number.parseFloat(lockAmount) || 0
  const estimatedLockReward = rewardForDays(lockDuration[0], totalLockApr, numericLockAmount)



  async function fetchAprPercent(validator: number, amountU2U: number, duration: number) {
    if (!validator || amountU2U <= 0) return null
    const GRAPHQL_URL = "https://staking-graphql.uniultra.xyz/graphql"
    const stakingAmountWei = (BigInt(Math.round(amountU2U * 1e6)) * 10n ** 12n).toString()

    const query = `
      query stakingApr($validatorId:Int!,$stakingAmount:String!,$duration:Int!){
        apr0: calculateApr(validatorId:$validatorId, amount:$stakingAmount, duration:$duration)
      }
    `

    const res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({
        query,
        variables: {
          validatorId: validator,
          stakingAmount: stakingAmountWei,
          duration: duration,
        },
      }),
    })

    if (!res.ok) throw new Error(`APR request failed: ${res.status}`)
    const { data, errors } = await res.json()
    if (errors) throw new Error(JSON.stringify(errors))
    return typeof data?.apr0 === "number" ? data.apr0 : Number.parseFloat(data?.apr0 ?? "0")
  }

  const refreshApr = async () => {
    const amt = Number.parseFloat(amount)
    if (!Number.isFinite(amt) || amt <= 0) {
      setAprPercent(null)
      return
    }
    try {
      setAprLoading(true)
      const apr = await fetchAprPercent(validatorId, amt, 0)
      setAprPercent(apr ?? null)
    } catch (error) {
      console.error("Failed to load APR", error)
      setAprPercent(null)
    } finally {
      setAprLoading(false)
    }
  }

  // Refresh APR when amount changes
  useEffect(() => {
    refreshApr()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount])

  const refreshLockApr = async () => {
    const amt = Number.parseFloat(lockAmount)
    if (!Number.isFinite(amt) || amt <= 0) {
      setLockAprPercent(null)
      return
    }
    try {
      setLockAprLoading(true)
      // duration in seconds for the API
      const durationSeconds = lockDuration[0] * 24 * 60 * 60
      const apr = await fetchAprPercent(validatorId, amt, durationSeconds)
      setLockAprPercent(apr ?? null)
    } catch (error) {
      console.error("Failed to load Lock APR", error)
      setLockAprPercent(null)
    } finally {
      setLockAprLoading(false)
    }
  }

  useEffect(() => {
    refreshLockApr()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockAmount, lockDuration])

  const displayTotalApr = aprLoading ? "…" : aprPercent !== null ? `${totalApr.toFixed(2)}%` : "—"
  const displayBaseApr = aprLoading ? "…" : aprPercent !== null ? `${baseApr.toFixed(2)}%` : "—"

  const displayTotalLockApr = lockAprLoading ? "…" : lockAprPercent !== null ? `${totalLockApr.toFixed(2)}%` : "—"

  return (
    <section id="staking" className="relative py-16 sm:py-24 lg:py-32 bg-tinted-bg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Marker - Added scroll animation */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <span className="text-xs font-mono text-muted-foreground bg-background px-3 py-1 rounded-full">05</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              Delegate & Earn
            </span>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Staking Panel */}
          <AnimateOnScroll animation="fade-up" delay={100}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-primary/5 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Stake Your U2U with Us</h3>
              </div>

              {/* Wallet Status */}
              {/* <div className="mb-4 sm:mb-6">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-lg sm:rounded-xl h-10 sm:h-12 border-dashed bg-transparent text-sm btn-hover"
                >
                  <span className="text-muted-foreground">Connect Wallet</span>
                  <Wallet className="w-4 h-4" />
                </Button>
              </div> */}

              {/* Amount Input */}
              <div className="mb-4 sm:mb-6">
                <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Amount to Stake</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="h-10 sm:h-12 rounded-lg sm:rounded-xl pr-14 sm:pr-16 text-base sm:text-lg transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
                    U2U
                  </span>
                </div>
              </div>

              {/* Lock Duration */}
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm mb-2 sm:mb-3">
                  <span className="text-muted-foreground">Lock Duration</span>
                  <span className="text-foreground font-medium">{lockDays[0]} days</span>
                </div>
                <Slider value={lockDays} onValueChange={setLockDays} min={30} max={365} step={30} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>30d</span>
                  <span>365d</span>
                </div>
              </div>

              {/* Estimated Rewards */}
              <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">APR</span>
                  <span className="text-primary font-bold text-lg sm:text-xl">{displayTotalApr}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Est. Reward</span>
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {estimatedReward.toFixed(2)} U2U
                  </span>
                </div>
              </div>

              <Button asChild className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground btn-hover">
                <a href="https://stakingu2delegate.vercel.app" target="_blank" rel="noopener noreferrer">
                  Staking dApp
                </a>
              </Button>

              {/* <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                Estimate only. Actual rewards depend on network conditions.
              </p> */}

            </div>
          </AnimateOnScroll>

          {/* Lock Panel - Replaces Rewards Simulator */}
          <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-primary/5 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Lock Your U2U</h3>
              </div>

              {/* Amount Input */}
              <div className="mb-4 sm:mb-6">
                <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">Amount to Lock</label>
                <div className="relative">
                  <Input
                    type="number"
                    value={lockAmount}
                    onChange={(e) => setLockAmount(e.target.value)}
                    className="h-10 sm:h-12 rounded-lg sm:rounded-xl pr-14 sm:pr-16 text-base sm:text-lg transition-all focus:ring-2 focus:ring-primary/20"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-muted-foreground">
                    U2U
                  </span>
                </div>
              </div>

              {/* Lock Duration */}
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm mb-2 sm:mb-3">
                  <span className="text-muted-foreground">Lock Duration</span>
                  <span className="text-foreground font-medium">{lockDuration[0]} days</span>
                </div>
                <Slider value={lockDuration} onValueChange={setLockDuration} min={14} max={365} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>14d</span>
                  <span>365d</span>
                </div>
              </div>

              {/* Estimated Rewards */}
              <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm text-muted-foreground">APR</span>
                  <span className="text-primary font-bold text-lg sm:text-xl">{displayTotalLockApr}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Est. Reward</span>
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {estimatedLockReward.toFixed(2)} U2U
                  </span>
                </div>
              </div>

              <Button asChild className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground btn-hover">
                <a href="https://stakingu2delegate.vercel.app" target="_blank" rel="noopener noreferrer">
                  Lock U2U
                </a>
              </Button>
            </div>
          </AnimateOnScroll>

          {/* Swap Panel */}
          <AnimateOnScroll animation="fade-up" delay={300}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-primary/5 md:col-span-2 lg:col-span-1 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/20 flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Get U2U Tokens</h3>
              </div>

              {/* From Token */}
              <div className="mb-3 sm:mb-4">
                <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">From</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={swapAmount}
                      onChange={(e) => setSwapAmount(e.target.value)}
                      className="h-10 sm:h-12 rounded-lg sm:rounded-xl pr-16 sm:pr-20 text-base sm:text-lg transition-all focus:ring-2 focus:ring-primary/20"
                      placeholder="0.00"
                    />
                  </div>
                  <button className="h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-secondary flex items-center gap-1 sm:gap-2 hover:bg-secondary/80 transition-all hover:scale-105">
                    <span className="font-medium text-sm sm:text-base">{swapFrom}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Swap Icon - Added rotation animation on hover */}
              <div className="flex justify-center my-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-all hover:rotate-180 duration-500">
                  <ArrowRightLeft className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground rotate-90" />
                </div>
              </div>

              {/* To Token */}
              <div className="mb-4 sm:mb-6">
                <label className="text-xs sm:text-sm text-muted-foreground mb-2 block">To</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      value={(Number.parseFloat(swapAmount) * 25).toFixed(2)}
                      readOnly
                      className="h-10 sm:h-12 rounded-lg sm:rounded-xl pr-16 sm:pr-20 text-base sm:text-lg bg-secondary/30"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-primary/10 flex items-center gap-1 sm:gap-2 border border-primary/30">
                    <span className="font-medium text-primary text-sm sm:text-base">U2U</span>
                  </div>
                </div>
              </div>

              {/* Rate Info */}
              <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="text-foreground">1 {swapFrom} = 25 U2U</span>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border-primary text-primary hover:bg-primary/10 bg-transparent text-sm sm:text-base btn-hover"
              >
                <a href="https://stakingu2delegate.vercel.app/swap" target="_blank" rel="noopener noreferrer">
                  Swap & Stake This Amount
                </a>
              </Button>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <style jsx>{`
        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fade-in {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
