"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Wallet, ArrowRightLeft, TrendingUp, ChevronDown } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

export function StakingSection() {
  const [amount, setAmount] = useState("1000")
  const [lockDays, setLockDays] = useState([90])
  const [timePeriod, setTimePeriod] = useState<"30D" | "90D" | "1Y">("90D")
  const [swapFrom, setSwapFrom] = useState("USDT")
  const [swapAmount, setSwapAmount] = useState("100")
  const [aprPercent, setAprPercent] = useState<number | null>(null)
  const [aprLoading, setAprLoading] = useState(false)

  const validatorId = 14

  const numericAmount = Number.parseFloat(amount) || 0
  const rewardForDays = (days: number, apr: number) => numericAmount * (apr / 100) * (days / 365)
  const estimatedReward = rewardForDays(lockDays[0], aprPercent ?? 0)

  async function fetchAprPercent(validator: number, amountU2U: number) {
    if (!validator || amountU2U <= 0) return null
    const GRAPHQL_URL = "https://staking-graphql.uniultra.xyz/graphql"
    const stakingAmountWei = (BigInt(Math.round(amountU2U * 1e6)) * 10n ** 12n).toString()

    const query = `
      query stakingApr($validatorId:Int!,$stakingAmount:String!){
        apr0: calculateApr(validatorId:$validatorId, amount:$stakingAmount, duration:0)
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
      const apr = await fetchAprPercent(validatorId, amt)
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

  const displayApr = aprLoading ? "…" : aprPercent !== null ? `${aprPercent.toFixed(2)}%` : "—"

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
              <div className="mb-4 sm:mb-6">
                <Button
                  variant="outline"
                  className="w-full justify-between rounded-lg sm:rounded-xl h-10 sm:h-12 border-dashed bg-transparent text-sm btn-hover"
                >
                  <span className="text-muted-foreground">Connect Wallet</span>
                  <Wallet className="w-4 h-4" />
                </Button>
              </div>

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
                  <span className="text-xs sm:text-sm text-muted-foreground">Estimated APR</span>
                  <span className="text-primary font-medium text-sm sm:text-base">{displayApr}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Est. Reward</span>
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {estimatedReward.toFixed(2)} U2U
                  </span>
                </div>
              </div>

              <Button className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground btn-hover">
                Delegate
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-3 sm:mt-4">
                Estimate only. Actual rewards depend on network conditions.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Rewards Simulator */}
          <AnimateOnScroll animation="fade-up" delay={200}>
            <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-primary/5 card-hover h-full">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground">Rewards Simulator</h3>
              </div>

              {/* Time Period Toggle */}
              <div className="flex gap-2 mb-4 sm:mb-6">
                {(["30D", "90D", "1Y"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimePeriod(period)}
                    className={`flex-1 py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all duration-300 ${
                      timePeriod === period
                        ? "bg-primary text-primary-foreground scale-105"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:scale-102"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>

              {/* Chart - Added animated path */}
              <div className="relative h-36 sm:h-48 mb-4">
                <svg className="w-full h-full" viewBox="0 0 300 150" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      y1={30 * i}
                      x2="300"
                      y2={30 * i}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-border"
                    />
                  ))}
                  {/* Reward curve - animated */}
                  <path
                    d="M 0 120 Q 75 100, 150 70 T 300 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-primary"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    style={{
                      animation: "draw-line 2s ease-out forwards",
                    }}
                  />
                  {/* Fill area */}
                  <path
                    d="M 0 120 Q 75 100, 150 70 T 300 20 L 300 150 L 0 150 Z"
                    fill="currentColor"
                    className="text-primary/10"
                    style={{
                      animation: "fade-in 1s ease-out 1s forwards",
                      opacity: 0,
                    }}
                  />
                </svg>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center p-2 sm:p-3 bg-secondary/50 rounded-lg sm:rounded-xl hover:bg-secondary/70 transition-colors">
                  <div className="text-xl sm:text-2xl font-light text-foreground">
                    {rewardForDays(timePeriod === "30D" ? 30 : timePeriod === "90D" ? 90 : 365, aprPercent ?? 0).toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">U2U Earned</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-secondary/50 rounded-lg sm:rounded-xl hover:bg-secondary/70 transition-colors">
                  <div className="text-xl sm:text-2xl font-light text-primary">{displayApr}</div>
                  <div className="text-xs text-muted-foreground">APR</div>
                </div>
              </div>
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
                variant="outline"
                className="w-full h-10 sm:h-12 rounded-lg sm:rounded-xl border-primary text-primary hover:bg-primary/10 bg-transparent text-sm sm:text-base btn-hover"
              >
                Swap & Stake This Amount
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
