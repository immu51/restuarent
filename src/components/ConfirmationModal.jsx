/**
 * ConfirmationModal - Shows booking confirmation (Booking ID, name, date, time, guests, dining, status)
 * USED BY: BookTable page (after form submit)
 * PROPS: open, onClose, booking (object with bookingId, name, date, timeSlot, guests, diningPreference)
 */
import { useEffect } from 'react'

export default function ConfirmationModal({ open, onClose, booking }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  const details = [
    { label: 'Booking ID', value: booking?.bookingId, highlight: true },
    { label: 'Name', value: booking?.name },
    { label: 'Date', value: booking?.date },
    { label: 'Time Slot', value: booking?.timeSlot },
    { label: 'Guests', value: booking?.guests },
    { label: 'Dining', value: booking?.diningPreference },
    { label: 'Status', value: 'Confirmed', status: true },
  ]

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        aria-label="Close"
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-md rounded-[16px] bg-[#1c1c1c] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden animate-[slideUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold accent bar */}
        <div className="h-1 bg-[#C9A227]" />

        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2
              id="confirmation-title"
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Table Reserved
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {details.map(({ label, value, highlight, status }) => (
              <div key={label} className="flex justify-between items-baseline gap-3">
                <span className="text-sm text-white/60">{label}</span>
                <span
                  className={`text-right font-medium ${
                    highlight ? 'text-[#C9A227] text-lg' : status ? 'text-emerald-400' : 'text-white'
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 w-full px-6 py-3.5 rounded-[16px] bg-[#C9A227] text-[#111] font-semibold text-sm hover:bg-[#d4af37] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,39,0.3)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
