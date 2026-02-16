/**
 * HOME PAGE - Landing: Hero, Popular Dishes, Why Us, Reviews, Contact form
 * ROUTE: /
 */
import { useState } from 'react'
import Hero from '../components/Hero'
import FoodCard from '../components/FoodCard'
import DishDetailModal from '../components/DishDetailModal'
import Footer from '../components/Footer'
import ReviewSlider from '../components/ReviewSlider'
import ContactForm from '../components/ContactForm'
import AnimateOnScroll from '../components/AnimateOnScroll'
import { POPULAR_DISHES } from '../data/dishes'

const WHY_US = [
  {
    icon: '🥬',
    title: 'Fresh Ingredients',
    text: 'We source the finest seasonal produce and premium ingredients for every dish.',
  },
  {
    icon: '🚀',
    title: '30 Min Delivery',
    text: 'Fast, reliable delivery so your food arrives hot and fresh at your doorstep.',
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    text: 'Every plate is crafted with care by our expert chefs for a luxury experience.',
  },
  {
    icon: '🍽️',
    title: 'Hygienic Kitchen',
    text: 'Our kitchen follows the highest hygiene standards for your safety and trust.',
  },
]

export default function Home() {
  const [detailDish, setDetailDish] = useState(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const openDetail = (dish) => {
    setDetailDish(dish)
    setDetailOpen(true)
  }

  return (
    <>
      <Hero />
      {/* Popular Dishes */}
      <section className="py-16 md:py-24 bg-[#111111] flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Popular Dishes
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 w-full items-stretch">
            {POPULAR_DISHES.map((dish, i) => (
              <AnimateOnScroll key={dish.id} animation="scaleIn" delay={Math.min(i + 1, 8)}>
                <FoodCard item={dish} onCardClick={openDetail} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-[#1c1c1c] flex flex-col items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <AnimateOnScroll animation="fadeInUp">
            <h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Why Choose Us
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            {WHY_US.map((item, i) => (
              <AnimateOnScroll key={item.title} animation="slideUp" delay={i + 1}>
                <div
                  className="flex flex-col items-center p-8 rounded-2xl bg-[#111111] border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:border-[#C9A227]/25 hover:shadow-[0_8px_32px_rgba(201,162,39,0.1)] transition-all duration-300 hover:-translate-y-1 text-center min-h-[220px]"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A227]/15 flex items-center justify-center mb-5 text-3xl">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-[#C9A227] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <AnimateOnScroll animation="fadeInUp">
        <ReviewSlider />
      </AnimateOnScroll>
      <div className="py-12 md:py-16" aria-hidden="true" />
      <AnimateOnScroll animation="fadeInUp">
        <ContactForm />
      </AnimateOnScroll>
      <DishDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} dish={detailDish} />
      <Footer />
    </>
  )
}
