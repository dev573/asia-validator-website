"use client"

interface ValidatorOrbProps {
  mousePosition?: { x: number; y: number }
}

export function ValidatorOrb({ mousePosition = { x: 0, y: 0 } }: ValidatorOrbProps) {
  return (
    <div className="relative w-72 h-72 lg:w-96 lg:h-96" style={{ transformStyle: "preserve-3d" }}>
      {/* Outer glow ring - Enhanced glow animation + cursor response */}
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl orb-glow"
        style={{
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      <div
        className="absolute inset-0 rounded-full bg-primary/10 blur-2xl"
        style={{
          transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px) scale(${1 + Math.abs(mousePosition.x * 0.1)})`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Rotating outer ring - responds to cursor */}
      <svg
        className="absolute inset-0 w-full h-full rotate-slow"
        viewBox="0 0 100 100"
        style={{
          transform: `rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          className="text-primary/20"
          strokeDasharray="1 3"
        />
      </svg>

      {/* Counter-rotating middle ring */}
      <svg
        className="absolute inset-0 w-full h-full rotate-slow-reverse"
        viewBox="0 0 100 100"
        style={{
          transform: `rotateX(${mousePosition.y * -20}deg) rotateY(${mousePosition.x * -20}deg)`,
          transition: "transform 0.25s ease-out",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-primary/30"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Main orb - Added subtle cursor response */}
      <div
        className="absolute inset-8 lg:inset-12 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 backdrop-blur-sm border border-primary/20"
        style={{
          transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
          transition: "transform 0.2s ease-out",
          boxShadow: `${mousePosition.x * -10}px ${mousePosition.y * -10}px 40px rgba(var(--primary), 0.15)`,
        }}
      >
        {/* Inner core */}
        <div
          className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/40 to-accent/30 flex items-center justify-center"
          style={{
            transform: `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <div
            className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-primary/60 flex items-center justify-center shadow-lg shadow-primary/30"
            style={{
              transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary shimmer" />
          </div>
        </div>
      </div>

      {/* Orbiting particles - Enhanced with cursor influence */}
      {[...Array(8)].map((_, i) => {
        const baseTop = 50 + 45 * Math.sin((i * Math.PI * 2) / 8)
        const baseLeft = 50 + 45 * Math.cos((i * Math.PI * 2) / 8)
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/60 float-particle"
            style={{
              top: `${baseTop + mousePosition.y * (5 + i)}%`,
              left: `${baseLeft + mousePosition.x * (5 + i)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
              transition: "top 0.3s ease-out, left 0.3s ease-out",
            }}
          />
        )
      })}

      {/* Additional small particles with cursor response */}
      {[...Array(4)].map((_, i) => {
        const baseTop = 50 + 35 * Math.sin((i * Math.PI * 2) / 4 + Math.PI / 4)
        const baseLeft = 50 + 35 * Math.cos((i * Math.PI * 2) / 4 + Math.PI / 4)
        return (
          <div
            key={`small-${i}`}
            className="absolute w-1 h-1 rounded-full bg-accent/80 float-particle"
            style={{
              top: `${baseTop + mousePosition.y * (8 + i * 2)}%`,
              left: `${baseLeft + mousePosition.x * (8 + i * 2)}%`,
              animationDelay: `${i * 0.8 + 0.3}s`,
              animationDuration: `${5 + i * 0.3}s`,
              transition: "top 0.25s ease-out, left 0.25s ease-out",
            }}
          />
        )
      })}

      {/* Connection lines with cursor tilt */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        style={{
          transform: `rotateX(${mousePosition.y * 10}deg) rotateY(${mousePosition.x * 10}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-primary/30"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Vertical line extending down */}
      <div className="absolute left-1/2 -bottom-32 w-px h-32 bg-gradient-to-b from-primary/40 to-transparent hidden lg:block spine-pulse" />
    </div>
  )
}
