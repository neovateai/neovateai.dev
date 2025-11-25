'use client'

import { Experience } from '../_components/experience'
import { GlowBox } from '../_components/glow-box'
import { HeroBackground } from '../_components/hero-background'
import { FooterClient } from '../_components/footer-client'
import type { Dictionary, Locale } from '../_dictionaries/i18n-config'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

type HomePageProps = {
  lang: string
  dictionary: Dictionary
}

export function HomePage({ lang, dictionary: dict }: HomePageProps) {
  const { setTheme } = useTheme()
  const [heroAnimated, setHeroAnimated] = useState(false)

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white selection:bg-[#fa2f71] selection:text-white">
      <HeroBackground />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-8 md:py-32">
        {/* Hero Section */}
        <div 
          className={`mx-auto max-w-4xl text-center ${!heroAnimated ? 'animate-fade-in-up' : ''}`}
          onAnimationEnd={() => setHeroAnimated(true)}
        >
          <h1 className="mb-8 bg-gradient-to-b from-white via-white to-gray-400 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl drop-shadow-sm">
            {dict.hero.title}
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed">
            {dict.hero.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a
              href={`/${lang}/docs/quickstart`}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_#fa2f71]"
              style={{ backgroundColor: '#fa2f71' }}
            >
              <span className="mr-2 text-lg">{dict.hero.getStarted}</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </a>

            <a
              href={`/${lang}/docs/overview`}
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white backdrop-blur-sm"
            >
              {dict.hero.viewDocs}
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-32 grid gap-6 md:grid-cols-3">
          <GlowBox className="p-8 h-full">
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-blue-500/10 p-3 text-blue-400 ring-1 ring-blue-500/20">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{dict.features.open.title}</h3>
            <p className="text-gray-400 leading-relaxed">{dict.features.open.description}</p>
          </GlowBox>

          <GlowBox className="p-8 h-full">
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-purple-500/10 p-3 text-purple-400 ring-1 ring-purple-500/20">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              {dict.features.multiPlatform.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {dict.features.multiPlatform.description}
            </p>
          </GlowBox>

          <GlowBox className="p-8 h-full">
            <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-pink-500/10 p-3 text-pink-400 ring-1 ring-pink-500/20">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">
              {dict.features.bestPractices.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {dict.features.bestPractices.description}
            </p>
          </GlowBox>
        </div>

        {/* Experience Section */}
        <div className="mt-32 mb-32">
          <Experience
            subtitle={dict.hero.experienceSubtitle}
            buttonText={dict.hero.buttonText}
            disclaimer={dict.hero.disclaimer}
            lang={lang}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <FooterClient lang={lang as Locale} dictionary={dict} />
      </div>
    </div>
  )
}
