/**
 * CartItem - Single cart row: image, name, price, quantity controls, remove
 * USED BY: Cart page
 * PROPS: item (cart item with id, name, price, quantity, image, etc.)
 */
import { useCart } from '../context/CartContext'

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()
  const variant = item.variant || ''

  return (
    <div className="flex gap-4 sm:gap-5 p-5 rounded-2xl bg-[#1c1c1c] border border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        decoding="async"
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover flex-shrink-0 border border-white/5"
      />
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="font-semibold text-white truncate text-base" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </h3>
        <p className="text-[#C9A227] font-bold mt-1 text-lg">₹{item.price}</p>
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          <div className="flex items-center rounded-xl overflow-hidden border border-white/15 bg-[#111]/50">
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity - 1, variant)}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg font-medium"
            >
              −
            </button>
            <span className="w-12 text-center text-white font-semibold text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.id, item.quantity + 1, variant)}
              className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 transition-colors text-lg font-medium"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeFromCart(item.id, variant)}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      <p className="text-[#C9A227] font-bold text-lg flex-shrink-0 self-center">₹{item.price * item.quantity}</p>
    </div>
  )
}
