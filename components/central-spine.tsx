"use client"

export function CentralSpine() {
  return (
    <div className="fixed left-1/2 top-0 h-full w-px -translate-x-1/2 pointer-events-none z-0 hidden lg:block">
      <div className="h-full w-full bg-gradient-to-b from-transparent via-spine to-transparent opacity-40 spine-pulse" />
    </div>
  )
}
