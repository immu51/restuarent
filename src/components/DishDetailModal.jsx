/**
 * DishDetailModal - Opens on dish card click: 3-image slider, name, description, price, rating, Add to Cart
 * USED BY: Home, Menu (when FoodCard has onCardClick)
 * PROPS: open, onClose, dish (item object with images[3] or image)
 */
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

export default function DishDetailModal({ open, onClose, dish }) {
  const { addToCart } = useCart()
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (open) setImgIndex(0)
  }, [open, dish?.id])

  if (!open || !dish) return null

  const images = dish.images && dish.images.length >= 3 ? dish.images : [dish.image, dish.image, dish.image]
  const handleAddAndClose = () => {
    addToCart(dish)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-detail-title"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close"
      />
      <div
        className="relative w-full max-w-lg rounded-[16px] bg-[#1c1c1c] border border-white/10 shadow-2xl overflow-hidden animate-[scaleIn_0.35s_cubic-bezier(0.22,1,0.36,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 bg-[#C9A227]" />
        {/* 3-image slider */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {images.map((src, i) => (
            <img
              key={src + i}
              src={src}
              alt={`${dish.name} ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${i === imgIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0'}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-[2]" />
          <button
            type="button"
            onClick={() => setImgIndex((i) => (i - 1 + 3) % 3)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-[3] p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setImgIndex((i) => (i + 1) % 3)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-[3] p-2 rounded-xl bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-[3]">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => setImgIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === imgIndex ? 'w-5 bg-[#C9A227]' : 'w-1.5 bg-white/50 hover:bg-white/70'}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-[#C9A227] text-sm font-semibold z-[3]">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {dish.rating}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 left-3 p-2 rounded-xl bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors z-[3]"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {dish.category && (
              <span className="px-2.5 py-1 rounded-lg bg-[#C9A227]/20 text-[#C9A227] text-xs font-medium">
                {dish.category}
              </span>
            )}
            {dish.type && (
              <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/90 text-xs font-medium">
                {dish.type}
              </span>
            )}
          </div>
          <h2
            id="dish-detail-title"
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {dish.name}
          </h2>
          <p className="text-white/75 text-sm leading-relaxed mb-6">
            {dish.description}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#C9A227] font-bold text-2xl">₹{dish.price}</span>
            <button
              type="button"
              onClick={handleAddAndClose}
              className="px-6 py-3 rounded-xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
