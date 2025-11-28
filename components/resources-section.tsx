"use client"

import { BookOpen, Shield, Settings, MessageCircle, ChevronRight, Play } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const guides = [
  {
    icon: BookOpen,
    title: "How to Stake U2U",
    description: "Step-by-step guide for beginners",
    tag: "Guide",
  },
  {
    icon: Shield,
    title: "Understanding Rewards",
    description: "Learn how staking rewards work",
    tag: "Education",
  },
  {
    icon: Settings,
    title: "Our Infrastructure",
    description: "Monitoring & security setup",
    tag: "Technical",
  },
  {
    icon: MessageCircle,
    title: "Join Our Community",
    description: "Telegram, X, and Discord",
    tag: "Social",
  },
]

const news = [
  {
    title: "APR Update: Q4 2025 Rewards",
    date: "Nov 2025",
    type: "Announcement",
  },
  {
    title: "New Monitoring Dashboard Live",
    date: "Oct 2025",
    type: "Update",
  },
  {
    title: "U2U Staking Tutorial",
    date: "Sep 2025",
    type: "Video",
    hasVideo: true,
  },
]

export function ResourcesSection() {
  return (
    <section id="resources" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Marker - Added scroll animation */}
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">06</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              Building Together, Everywhere
            </span>
          </div>
        </AnimateOnScroll>

        {/* Guides Grid - Added staggered animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16">
          {guides.map((guide, index) => {
            const Icon = guide.icon
            return (
              <AnimateOnScroll key={index} animation="fade-up" delay={index * 100}>
                <a
                  href="#"
                  className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 group hover:border-primary/30 transition-all duration-300 card-hover block h-full"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {guide.tag}
                    </span>
                  </div>
                  <h4 className="text-base sm:text-lg font-medium text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                    {guide.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{guide.description}</p>
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                    Read more
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </span>
                </a>
              </AnimateOnScroll>
            )
          })}
        </div>

        {/* Featured News - Added staggered animations */}
        <AnimateOnScroll animation="fade-up">
          <h3 className="text-xs sm:text-sm uppercase tracking-[0.15em] text-muted-foreground mb-4 sm:mb-6">
            Featured Updates
          </h3>
        </AnimateOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {news.map((item, index) => (
            <AnimateOnScroll key={index} animation="slide-up" delay={index * 100 + 200}>
              <a
                href="#"
                className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 hover:translate-x-2"
              >
                {item.hasVideo ? (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-muted-foreground/30 group-hover:border-primary/50 transition-colors" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
