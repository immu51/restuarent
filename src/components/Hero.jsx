/**
 * Hero - Top banner with rotating images and CTA buttons (View Menu, Book Table)
 * USED BY: Home page only
 */
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HERO_IMAGES } from '../data/images'

const SLIDE_DURATION = 5000

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, SLIDE_DURATION)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image slider - smooth crossfade */}
      <div className="absolute inset-0">
        {HERO_IMAGES.map((url, i) => (
          <div
            key={url}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              backgroundImage: `url('${url}')`,
              opacity: i === currentIndex ? 1 : 0,
              zIndex: i === currentIndex ? 1 : 0,
            }}
          />
        ))}
      </div>
      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(rgba(17, 17, 17, 0.75), rgba(17, 17, 17, 0.6))',
        }}
      />
      <div className="absolute inset-0 bg-[#111111]/40 z-[2]" />

      {/* Slider dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'w-8 bg-[#C9A227]' : 'w-1.5 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 animate-[fadeInUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Taste the Luxury at Your Doorstep
        </h1>
        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 md:mb-10 animate-[fadeInUp_0.9s_cubic-bezier(0.22,1,0.36,1)_0.15s_both]">
          Experience premium dining with fresh ingredients, 30-minute delivery, and dishes crafted for the finest palates.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_0.9s_cubic-bezier(0.22,1,0.36,1)_0.35s_both]">
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-[1rem] rounded-2xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,39,0.3)] leading-normal min-h-[3.25rem]"
          >
            Order Now
          </Link>
          <Link
            to="/menu"
            className="inline-flex items-center justify-center px-8 py-[1rem] rounded-2xl border-2 border-[#C9A227] text-[#C9A227] font-semibold hover:bg-[#C9A227]/10 transition-all duration-300 leading-normal min-h-[3.25rem]"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
