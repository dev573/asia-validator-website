"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimateOnScrollProps {
  children: ReactNode
  animation?: "fade-up" | "fade-left" | "fade-right" | "fade-scale" | "slide-up"
  delay?: number
  duration?: number
  threshold?: number
  className?: string
}

export function AnimateOnScroll({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className = "",
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  const getAnimationClasses = () => {
    const base = "transition-all"
    const hidden = {
      "fade-up": "opacity-0 translate-y-10",
      "fade-left": "opacity-0 -translate-x-10",
      "fade-right": "opacity-0 translate-x-10",
      "fade-scale": "opacity-0 scale-95",
      "slide-up": "opacity-0 translate-y-16",
    }
    const visible = "opacity-100 translate-y-0 translate-x-0 scale-100"

    return `${base} ${isVisible ? visible : hidden[animation]}`
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClasses()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
