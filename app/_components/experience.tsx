'use client'

import Link from 'next/link'
import { useEffect, useState, useRef, useId } from 'react'

interface ExperienceProps {
  subtitle: string
  buttonText: string
  disclaimer: string
  lang: string
}

export function Experience({ subtitle, buttonText, disclaimer, lang }: ExperienceProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement>(null)
  const sectionId = useId()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const section = sectionRef.current
      if (section) {
        const rect = section.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const section = sectionRef.current
    section?.addEventListener('mousemove', handleMouseMove)
    return () => section?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const [particles, setParticles] = useState<Array<{
    left: string
    top: string
    duration: string
    delay: string
    tx: string
    ty: string
    scale: number
  }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: `${5 + Math.random() * 10}s`,
        delay: `${Math.random() * 5}s`,
        tx: `${Math.random() * 100 - 50}px`,
        ty: `${Math.random() * 100 - 50}px`,
        scale: 1 + Math.random(),
      }))
    )
  }, [])

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="group relative overflow-hidden rounded-3xl bg-black px-8 py-20 md:px-16 md:py-32 lg:px-24"
      style={{
        boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.05), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Animated gradient mesh background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-[120px]"
          style={{
            background: 'radial-gradient(circle, rgba(254, 48, 112, 0.4) 0%, transparent 70%)',
            animationDuration: '8s',
          }}
        />
        <div
          className="absolute right-1/4 top-1/3 h-[400px] w-[400px] animate-pulse rounded-full blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            animationDuration: '6s',
            animationDelay: '1s',
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-[450px] w-[450px] animate-pulse rounded-full blur-[110px]"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            animationDuration: '7s',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Mouse follower glow */}
      <div
        className="pointer-events-none absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: '600px',
          height: '600px',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(254, 48, 112, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Top decorative line */}
      <div className="absolute left-0 top-0 h-px w-full overflow-hidden">
        <div
          className="h-full w-1/3 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(254, 48, 112, 0.8), transparent)',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Overline text */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            New Experience
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Title with gradient */}
        <h2 className="mb-4 text-center text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
          <span
            className="inline-block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent"
            style={{
              textShadow: '0 0 80px rgba(254, 48, 112, 0.3)',
            }}
          >
            Neovate
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-white/60 md:text-xl lg:text-2xl">
          {subtitle}
        </p>

        {/* CTA Button with premium styling */}
        <div className="flex justify-center">
          <Link
            href={`/${lang}/docs/overview`}
            className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-2xl px-10 py-5 text-base font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 md:px-12 md:py-6 md:text-lg"
            style={{ backgroundColor: '#fe3070' }}
          >
            {/* Button glow effect */}
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
              style={{
                background: 'radial-gradient(circle at center, rgba(254, 48, 112, 0.4), transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Button shimmer effect */}
            <div
              className="absolute inset-0 translate-x-[-100%] opacity-0 transition-all duration-700 group-hover/btn:translate-x-[100%] group-hover/btn:opacity-100"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
              }}
            />

            {/* Button text */}
            <span className="relative z-10 flex items-center gap-3">
              {buttonText}
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            {/* Button border glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"
              style={{
                boxShadow: '0 0 20px rgba(254, 48, 112, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.1)',
              }}
            />
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {['Open Source', 'Multi-Platform', 'AI-Powered'].map((feature, i) => (
            <div
              key={feature}
              className="group/pill relative overflow-hidden rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              style={{
                animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
              }}
            >
              <div className="relative z-10 flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: '#fe3070' }}
                />
                <span className="text-sm font-medium text-white/70">{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer with fade effect */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center md:bottom-8">
        <p className="rounded-full border border-white/5 bg-black/40 px-4 py-2 text-xs text-white/30 backdrop-blur-sm md:text-sm">
          {disclaimer}
        </p>
      </div>

      {/* Floating particles */}
      {particles.map((p, i) => {
        const particleId = `particle-${sectionId}-${i}`
        return (
          <div
            key={particleId}
            className="pointer-events-none absolute h-1 w-1 rounded-full bg-white/20"
            style={{
              left: p.left,
              top: p.top,
              animation: `float ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
              // @ts-ignore
              '--tx': p.tx,
              '--ty': p.ty,
              '--scale': p.scale,
            }}
          />
        )
      })}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes shimmer {
          0%,
          100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(300%);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(var(--tx), var(--ty)) scale(var(--scale));
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  )
}
