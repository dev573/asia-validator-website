"use client"

import { HelpCircle } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const faqs = [
  {
    question: 'What does "stake" mean?',
    answer:
      "Staking means delegating your U2U to our validator to help secure the U2U Network. In return, you earn staking rewards. Your tokens stay in your wallet inside the official staking contract.",
  },
  {
    question: 'What is a "lock period"?',
    answer:
      "A lock period is the time you agree to keep your stake active in exchange for higher APR. During the lock, you can't withdraw that locked amount.",
  },
  {
    question: "Why is there a 7-day unlock time?",
    answer:
      "After you click Unstake, the U2U protocol enforces a 7-day unlock period before your tokens become transferable again. This is a network-level security rule, not specific to our validator.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="relative py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <AnimateOnScroll animation="fade-up">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16">
            <span className="text-xs font-mono text-muted-foreground bg-muted px-3 py-1 rounded-full">07</span>
            <div className="w-8 sm:w-12 h-px bg-spine" />
            <span className="text-xs uppercase tracking-[0.1em] sm:tracking-[0.15em] text-muted-foreground">
              Quick FAQ
            </span>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {faqs.map((item, index) => (
            <AnimateOnScroll key={item.question} animation="fade-up" delay={index * 100}>
              <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 h-full card-hover">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <h3 className="text-sm sm:text-base font-medium text-foreground">{item.question}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
