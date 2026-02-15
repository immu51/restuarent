/**
 * FoodCard - Single dish card with image, name, description, price, rating, Add to Cart
 * USED BY: Home (popular dishes), Menu (dish grid)
 * PROPS: item (dish object), showAddToCart (default true)
 */
import { useCart } from '../context/CartContext'

export default function FoodCard({ item, showAddToCart = true }) {
  const { addToCart } = useCart()

  return (
    <article className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#1c1c1c] border border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:border-[#C9A227]/30 hover:shadow-[0_8px_32px_rgba(201,162,39,0.12)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-[#C9A227] text-sm font-semibold">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {item.rating}
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#C9A227] transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </h3>
        <p className="text-sm text-white/65 mb-4 line-clamp-2 leading-relaxed flex-1 min-h-[2.5rem]">
          {item.description}
        </p>
        <div className="flex items-end justify-between gap-3 mt-auto pt-1 border-t border-white/5">
          <span className="text-[#C9A227] font-bold text-xl">₹{item.price}</span>
          {showAddToCart && (
            <button
              type="button"
              onClick={() => addToCart(item)}
              className="px-5 py-2.5 rounded-xl bg-[#C9A227] text-[#111] font-semibold text-sm hover:bg-[#d4af37] hover:-translate-y-0.5 transition-all duration-300 leading-normal shrink-0"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
