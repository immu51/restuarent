/**
 * ReviewSlider - Auto-rotating customer reviews section on Home page
 * USED BY: Home page
 */
import { useState, useEffect } from 'react'
import { REVIEWS } from '../data/reviews'

export default function ReviewSlider() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setActive((i) => (i + 1) % REVIEWS.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="py-16 md:py-24 bg-[#111111] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          What Our Guests Say
        </h2>
        <div className="relative overflow-hidden rounded-2xl bg-[#1c1c1c] border border-white/5 p-8 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_rgba(201,162,39,0.08)] w-full max-w-4xl mx-auto transition-shadow duration-300">
          {REVIEWS.map((review, i) => (
            <div
              key={review.id}
              className={`transition-all duration-500 ${i === active ? 'opacity-100' : 'opacity-0 absolute inset-0 pointer-events-none'}`}
              style={{ transitionProperty: 'opacity' }}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#C9A227]/50 shadow-lg mb-5"
                />
                <h4 className="text-lg font-semibold text-white mb-2">{review.name}</h4>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <svg
                      key={k}
                      className={`w-5 h-5 ${k < review.rating ? 'text-[#C9A227]' : 'text-white/30'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/80 italic">&ldquo;{review.text}&rdquo;</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center gap-2 mt-6">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? 'bg-[#C9A227] w-8' : 'bg-white/40 hover:bg-white/60'}`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
