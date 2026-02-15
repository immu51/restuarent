/**
 * CART CONTEXT - Global cart state for the whole app
 *
 * USED BY: Navbar (cart count), FoodCard (add to cart), Cart page, CartItem, Checkout
 *
 * PROVIDES: cart array, cartCount, addToCart, removeFromCart, updateQuantity,
 * clearCart, subtotal, discount, deliveryCharge, total, coupon helpers
 */
import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CartContext = createContext(null)

const DELIVERY_CHARGE = 49
const COUPONS = {
  SAVE20: { discount: 20, minOrder: 500 },
  LUXURY50: { discount: 50, minOrder: 1000 },
  WELCOME10: { discount: 10, minOrder: 200 },
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponInput, setCouponInput] = useState('')

  const addToCart = useCallback((item, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.variant === (item.variant || ''))
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.variant === (item.variant || '')
            ? { ...i, quantity: i.quantity + quantity }
            : i
        )
      }
      return [...prev, { ...item, quantity, variant: item.variant || '' }]
    })
  }, [])

  const removeFromCart = useCallback((id, variant = '') => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.variant === variant)))
  }, [])

  const updateQuantity = useCallback((id, quantity, variant = '') => {
    if (quantity < 1) {
      removeFromCart(id, variant)
      return
    }
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.variant === variant ? { ...i, quantity } : i
      )
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setCart([])
    setAppliedCoupon(null)
    setCouponInput('')
  }, [])

  const applyCoupon = useCallback((code) => {
    const upper = (code || couponInput).toUpperCase().trim()
    const coupon = COUPONS[upper]
    if (!coupon) return { success: false, message: 'Invalid coupon' }
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    if (subtotal < coupon.minOrder)
      return { success: false, message: `Minimum order ₹${coupon.minOrder} required` }
    setAppliedCoupon({ code: upper, ...coupon })
    return { success: true, message: `₹${coupon.discount} off applied!` }
  }, [cart, couponInput])

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null)
  }, [])

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const validCoupon =
    appliedCoupon && subtotal >= appliedCoupon.minOrder ? appliedCoupon : null
  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minOrder) setAppliedCoupon(null)
  }, [subtotal, appliedCoupon])
  const discount = validCoupon ? Math.min(validCoupon.discount, subtotal) : 0
  const deliveryCharge = subtotal > 0 ? DELIVERY_CHARGE : 0
  const total = Math.max(0, subtotal - discount + deliveryCharge)
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        discount,
        deliveryCharge,
        total,
        appliedCoupon,
        couponInput,
        setCouponInput,
        applyCoupon,
        removeCoupon,
        DELIVERY_CHARGE,
        COUPONS,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
