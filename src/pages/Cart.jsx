/**
 * CART PAGE - Cart items list, quantity update, remove, subtotal, link to checkout
 * ROUTE: /cart
 * Uses: CartContext, CartItem, Footer
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import Footer from '../components/Footer'

export default function Cart() {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    deliveryCharge,
    total,
    appliedCoupon,
    couponInput,
    setCouponInput,
    applyCoupon,
    removeCoupon,
  } = useCart()
  const [couponMessage, setCouponMessage] = useState('')

  const handleApplyCoupon = () => {
    const result = applyCoupon()
    setCouponMessage(result.message)
  }

  if (cartCount === 0) {
    return (
      <>
        <div className="min-h-screen bg-[#111111] pt-28 md:pt-32 pb-16 flex items-center justify-center">
          <div className="text-center px-4 animate-[fadeInUp_0.7s_cubic-bezier(0.22,1,0.36,1)_both]">
            <h1 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Your cart is empty
            </h1>
            <p className="text-white/70 mb-6">Add delicious items from our menu to get started.</p>
            <Link
              to="/menu"
              className="inline-flex items-center justify-center px-8 py-[1rem] rounded-2xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] transition-all duration-300 leading-normal min-h-[3.25rem]"
            >
              View Menu
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#111111] pt-28 md:pt-32 pb-16">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <CartItem key={`${item.id}-${item.variant}`} item={item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky p-6 rounded-2xl bg-[#1c1c1c] shadow-[0_4px_20px_rgba(0,0,0,0.3)] lg:self-start" style={{ borderRadius: '16px', top: '6rem' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Delivery</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-[#C9A227]">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between text-lg font-bold text-white">
                  <span>Total</span>
                  <span className="text-[#C9A227]">₹{total}</span>
                </div>

                {/* Coupon */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-white/80 mb-2">Coupon</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => { setCouponInput(e.target.value); setCouponMessage('') }}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                    />
                    {appliedCoupon ? (
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="px-5 py-2.5 rounded-xl border border-red-500/50 text-red-400 hover:bg-red-500/10 leading-normal"
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-5 py-2.5 rounded-xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] transition-colors leading-normal"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                  {couponMessage && (
                    <p className={`mt-2 text-sm ${appliedCoupon ? 'text-[#C9A227]' : 'text-red-400'}`}>
                      {couponMessage}
                    </p>
                  )}
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 w-full inline-flex items-center justify-center px-8 py-[1rem] rounded-2xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] hover:-translate-y-0.5 transition-all duration-300 leading-normal min-h-[3.25rem]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
