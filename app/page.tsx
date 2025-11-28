import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ChallengesSection } from "@/components/challenges-section"
import { NetworkSection } from "@/components/network-section"
import { StatsSection } from "@/components/stats-section"
import { StakingSection } from "@/components/staking-section"
import { ResourcesSection } from "@/components/resources-section"
import { Footer } from "@/components/footer"
import { CentralSpine } from "@/components/central-spine"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CentralSpine />
      <Navbar />
      <HeroSection />
      <ChallengesSection />
      <NetworkSection />
      <StatsSection />
      <StakingSection />
      <ResourcesSection />
      <Footer />
    </main>
  )
}
