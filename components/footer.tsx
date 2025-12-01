"use client"

import { Hexagon } from "lucide-react"
import { AnimateOnScroll } from "./animate-on-scroll"

const footerLinks = {
  resources: [
    { label: "Docs", href: "https://docs.u2u.xyz/" },
    { label: "Staking FAQ", href: "https://docs.u2u.xyz/services/staking/faq" },
  ],
  social: [
    { label: "X / Twitter", href: "https://x.com/u2u_xyz" },
    { label: "Telegram (chat)", href: "https://t.me/u2u_xyzchat" },
    { label: "Telegram (channel)", href: "https://t.me/u2u_xyz" },
    { label: "Discord", href: "https://discord.com/invite/6bPaDU8pk3" },
    { label: "GitHub", href: "https://github.com/unicornultrafoundation" },
    { label: "Medium", href: "https://medium.com/unicorn-ultra/find-u2u-network-here-f0b3b56e4806" },
  ],
}

export function Footer() {
  return (
    <footer className="relative py-12 sm:py-16 lg:py-24 bg-foreground text-background overflow-hidden">
      {/* Background Pattern - Added subtle animation */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="hexPattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M5 0L10 2.5V7.5L5 10L0 7.5V2.5Z" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
          {/* Brand - full width on mobile */}
          <AnimateOnScroll animation="fade-up" className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-3 sm:mb-4 group">
              <div className="relative">
                <Hexagon className="w-7 h-7 sm:w-8 sm:h-8 text-primary fill-primary/20 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                </div>
              </div>
              <span className="font-semibold text-sm sm:text-base">U2Delegate</span>
              <span className="text-background/60 font-normal text-sm sm:text-base">• U2U Validator</span>
            </a>
            <p className="text-background/60 text-xs sm:text-sm max-w-sm leading-relaxed">
              High-performance validator infrastructure for the U2U Network. Secure, transparent, and optimized for
              maximum delegator rewards.
            </p>
          </AnimateOnScroll>

          {/* Resources */}
          <AnimateOnScroll animation="fade-up" delay={100}>
            <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">Resources</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>

          {/* Social */}
          <AnimateOnScroll animation="fade-up" delay={200}>
            <h4 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">Community</h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs sm:text-sm text-background/60 hover:text-background transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </AnimateOnScroll>
        </div>

        {/* Bottom Bar */}
        <AnimateOnScroll animation="fade-up" delay={300}>
          <div className="pt-6 sm:pt-8 border-t border-background/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-xs text-background/40">
                <span>Powered by</span>
                <span className="text-primary font-medium hover:text-primary/80 transition-colors cursor-pointer">
                  U2U Network
                </span>
              </div>
              <p className="text-xs text-background/40 text-center sm:text-right">
                Non-custodial. This site never asks for your seed phrase.
              </p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </footer>
  )
}
