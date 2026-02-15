/**
 * MENU PAGE - Full menu: search, category filter (All/Veg/Non-Veg/Indian/...), dish grid
 * ROUTE: /menu
 * Uses: DISHES, DISH_CATEGORIES from data/dishes
 */
import { useState, useMemo } from 'react'
import FoodCard from '../components/FoodCard'
import Footer from '../components/Footer'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { DISHES, DISH_CATEGORIES } from '../data/dishes'

export default function Menu() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return DISHES.filter((d) => {
      const matchCategory =
        category === 'All' ||
        d.category === category ||
        d.type === category
      const matchSearch =
        !search.trim() ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [category, search])

  return (
    <>
      <div className="w-full min-h-screen bg-[#111111] pb-40 md:pb-52 flex justify-center" style={{ paddingTop: 'calc(5rem + 2rem)' }}>
        <div className="w-full max-w-6xl flex-shrink-0 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Decorative SVG - fork & knife above title */}
          <div className="mb-6 animate-[fadeInUp_0.7s_cubic-bezier(0.22,1,0.36,1)_both]" aria-hidden="true">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto text-[#C9A227]"
            >
              <path
                d="M12 4v20c0 5.5 4.5 10 10 10s10-4.5 10-10V4M16 4v4M20 4v4M24 4v4M12 4h16"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M40 4v44M36 12l8 10-8 10M44 12l-8 10 8 10"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-8 text-center animate-[fadeInUp_0.7s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Menu
          </h1>

          {/* Search */}
          <div
            className="max-w-xl mx-auto animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]"
            style={{ marginBottom: '48px' }}
          >
            <div className="relative">
              <input
                type="search"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-2xl bg-[#1c1c1c] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors"
                style={{ borderRadius: '16px' }}
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category filter - gap above (from search) and below (from cards) */}
          <div
            className="flex flex-wrap justify-center gap-3 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.2s_both]"
            style={{ marginTop: '32px', marginBottom: '48px' }}
          >
            {DISH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-6 py-3.5 font-semibold transition-all duration-300 leading-normal border-2 ${
                  category === cat
                    ? 'bg-[#C9A227] text-[#111] border-[#C9A227]'
                    : 'bg-[#1c1c1c] text-white/90 border-white/20 hover:border-white/30 hover:bg-white/5'
                }`}
                style={{ borderRadius: '14px', fontSize: '1rem' }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div id="order" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full items-stretch" style={{ marginBottom: '32px' }}>
            {filtered.length ? (
              filtered.map((dish, i) => (
                <AnimateOnScroll key={dish.id} animation="scaleIn" delay={Math.min((i % 8) + 1, 8)}>
                  <FoodCard item={dish} />
                </AnimateOnScroll>
              ))
            ) : (
              <p className="col-span-full text-center text-white/60 py-12 animate-[fadeIn_0.5s_ease-out]">No dishes match your search.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
