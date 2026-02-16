/**
 * CHECKOUT PAGE - Order summary, delivery form, coupon, place order → redirect to tracking
 * ROUTE: /checkout
 * Uses: CartContext, Footer
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import Footer from '../components/Footer'

const PAYMENT_OPTIONS = [
  { id: 'upi', label: 'UPI', icon: '📱' },
  { id: 'card', label: 'Card', icon: '💳' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, subtotal, discount, deliveryCharge, total, clearCart } = useCart()
  const [deliveryType, setDeliveryType] = useState('home')
  const [payment, setPayment] = useState('cod')
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  })
  const [placing, setPlacing] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    setPlacing(true)
    // Simulate API call
    setTimeout(() => {
      clearCart()
      setPlacing(false)
      navigate('/tracking?step=0')
    }, 800)
  }

  if (cart.length === 0 && !placing) {
    return (
      <>
        <div className="min-h-screen bg-[#111111] flex items-center justify-center" style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}>
          <div className="text-center">
            <p className="text-white/80 mb-4">Your cart is empty.</p>
            <Link to="/menu" className="text-[#C9A227] hover:underline">Go to Menu</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-[#111111] pb-16" style={{ paddingTop: 'calc(var(--navbar-height) + 2rem)' }}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Checkout
          </h1>

          <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Delivery type */}
              <div className="p-6 rounded-2xl bg-[#1c1c1c]" style={{ borderRadius: '16px' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Delivery Type</h3>
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="home"
                      checked={deliveryType === 'home'}
                      onChange={() => setDeliveryType('home')}
                      className="sr-only peer"
                    />
                    <span className="block p-4 rounded-xl border-2 border-white/20 peer-checked:border-[#C9A227] peer-checked:bg-[#C9A227]/10 text-center text-white">
                      Home Delivery
                    </span>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                      className="sr-only peer"
                    />
                    <span className="block p-4 rounded-xl border-2 border-white/20 peer-checked:border-[#C9A227] peer-checked:bg-[#C9A227]/10 text-center text-white">
                      Pickup
                    </span>
                  </label>
                </div>
              </div>

              {/* Address form */}
              <div className="p-6 rounded-2xl bg-[#1c1c1c]" style={{ borderRadius: '16px' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Delivery Address</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    className="sm:col-span-2 px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                  />
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="p-6 rounded-2xl bg-[#1c1c1c]" style={{ borderRadius: '16px' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Payment Option</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label key={opt.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={payment === opt.id}
                        onChange={() => setPayment(opt.id)}
                        className="sr-only peer"
                      />
                      <span className="flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-white/20 peer-checked:border-[#C9A227] peer-checked:bg-[#C9A227]/10 text-white">
                        <span>{opt.icon}</span>
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="sticky p-6 rounded-2xl bg-[#1c1c1c] shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ borderRadius: '16px', top: 'calc(var(--navbar-height) + 1rem)' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                <ul className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {cart.map((item) => (
                    <li key={`${item.id}-${item.variant}`} className="flex justify-between text-sm text-white/80">
                      <span className="truncate">{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="space-y-1 text-sm text-white/80">
                  <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryCharge}</span></div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#C9A227]"><span>Discount</span><span>-₹{discount}</span></div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-[#C9A227]">₹{total}</span>
                </div>
                <button
                  type="submit"
                  disabled={placing}
                  className="mt-6 w-full py-[1rem] rounded-2xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] disabled:opacity-70 transition-all duration-300 leading-normal min-h-[3.25rem]"
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
