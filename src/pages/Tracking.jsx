/**
 * TRACKING PAGE - Order status tracker (by orderId from URL)
 * ROUTE: /tracking
 * Uses: OrderTracker, Footer
 */
import { useState, useEffect, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import OrderTracker from '../components/OrderTracker'
import Footer from '../components/Footer'

const STEPS = ['confirmed', 'preparing', 'delivery', 'delivered']

export default function Tracking() {
  const [searchParams] = useSearchParams()
  const stepParam = searchParams.get('step')
  const [stepIndex, setStepIndex] = useState(() => {
    const n = parseInt(stepParam, 10)
    if (!Number.isNaN(n) && n >= 0 && n < STEPS.length) return n
    return 0
  })

  // Keep order number stable across re-renders
  const orderId = useMemo(
    () => 'LX-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
    []
  )

  // Sync stepIndex when URL ?step= changes (e.g. back/forward)
  useEffect(() => {
    const n = parseInt(stepParam, 10)
    if (!Number.isNaN(n) && n >= 0 && n < STEPS.length) setStepIndex(n)
  }, [stepParam])

  // Optional: auto-advance for demo
  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) return
    const t = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
    }, 4000)
    return () => clearInterval(t)
  }, [stepIndex])

  return (
    <>
      <div className="min-h-screen bg-[#111111] pt-28 md:pt-32 pb-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Order Tracking
          </h1>
          <OrderTracker currentStep={stepIndex} />
          <div className="mt-12 text-center">
            <p className="text-white/70 mb-4">
              Order #{orderId}
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-[0.875rem] rounded-2xl border-2 border-[#C9A227] text-[#C9A227] font-semibold hover:bg-[#C9A227]/10 transition-all duration-300 leading-normal min-h-[3rem]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
