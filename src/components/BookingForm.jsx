/**
 * BookingForm - Full table booking form with validation (name, phone, email, guests, date, time, dining, occasion, terms)
 * USED BY: BookTable page
 * PROPS: onSuccess(data) - called after successful submit with booking details
 */
import { useState, useCallback } from 'react'
import TimeSlotSelector from './TimeSlotSelector'

const GUEST_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1)
const OCCASIONS = ['Birthday', 'Anniversary', 'Corporate Meeting', 'Casual Dining']
const DINING_OPTIONS = [
  { id: 'indoor', label: 'Indoor', value: 'Indoor' },
  { id: 'outdoor', label: 'Outdoor', value: 'Outdoor' },
  { id: 'rooftop', label: 'Rooftop', value: 'Rooftop' },
  { id: 'private', label: 'Private Cabin', value: 'Private Cabin' },
]

function getTodayStr() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
}

function validatePhone(phone) {
  return /^[\d\s\-+()]{10,}$/.test((phone || '').replace(/\s/g, ''))
}

function generateBookingId() {
  return 'BK-' + Math.random().toString(36).slice(2, 10).toUpperCase()
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

export default function BookingForm({ onSuccess }) {
  const [loading, setLoading] = useState(false)
  const [touched, setTouched] = useState({})
  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    guests: '',
    date: '',
    timeSlot: '',
    diningPreference: '',
    occasion: '',
    specialRequest: '',
    terms: false,
  })

  const errors = {
    fullName: !values.fullName?.trim() ? 'Full name is required' : null,
    phone: !values.phone?.trim() ? 'Phone number is required' : !validatePhone(values.phone) ? 'Enter a valid phone number' : null,
    email: !values.email?.trim() ? 'Email is required' : !validateEmail(values.email) ? 'Enter a valid email' : null,
    guests: !values.guests ? 'Please select number of guests' : null,
    date: !values.date ? 'Please select a date' : null,
    timeSlot: !values.timeSlot ? 'Please select a time slot' : null,
    diningPreference: !values.diningPreference ? 'Please select dining preference' : null,
    occasion: !values.occasion ? 'Please select an occasion' : null,
    terms: !values.terms ? 'You must accept the terms and conditions' : null,
  }

  const invalid = Object.values(errors).some(Boolean)
  const showError = (field) => touched[field] && errors[field]

  const setValue = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      guests: true,
      date: true,
      timeSlot: true,
      diningPreference: true,
      occasion: true,
      terms: true,
    })
    if (invalid) return

    setLoading(true)
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1200))
    const bookingId = generateBookingId()
    onSuccess({
      bookingId,
      name: values.fullName.trim(),
      date: formatDisplayDate(values.date),
      timeSlot: values.timeSlot,
      guests: values.guests,
      diningPreference: values.diningPreference,
    })
    setValues({
      fullName: '',
      phone: '',
      email: '',
      guests: '',
      date: '',
      timeSlot: '',
      diningPreference: '',
      occasion: '',
      specialRequest: '',
      terms: false,
    })
    setTouched({})
    setLoading(false)
  }

  const today = getTodayStr()
  const inputClass =
    'w-full px-4 py-3 rounded-[16px] bg-[#1c1c1c] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227] focus:ring-1 focus:ring-[#C9A227]/50 transition-all duration-300'
  const inputErrorClass = 'border-red-400/50 focus:border-red-400 focus:ring-red-400/30'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-white/90 mb-2">
          Full Name <span className="text-[#C9A227]">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={values.fullName}
          onChange={(e) => setValue('fullName', e.target.value)}
          onBlur={handleBlur('fullName')}
          placeholder="Enter your full name"
          className={`${inputClass} ${showError('fullName') ? inputErrorClass : ''}`}
          disabled={loading}
        />
        {showError('fullName') && (
          <p className="text-sm text-red-400 mt-1" role="alert">{errors.fullName}</p>
        )}
      </div>

      {/* Phone & Email row on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
            Phone Number <span className="text-[#C9A227]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setValue('phone', e.target.value)}
            onBlur={handleBlur('phone')}
            placeholder="Enter phone number"
            className={`${inputClass} ${showError('phone') ? inputErrorClass : ''}`}
            disabled={loading}
          />
          {showError('phone') && (
            <p className="text-sm text-red-400 mt-1" role="alert">{errors.phone}</p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
            Email <span className="text-[#C9A227]">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValue('email', e.target.value)}
            onBlur={handleBlur('email')}
            placeholder="you@example.com"
            className={`${inputClass} ${showError('email') ? inputErrorClass : ''}`}
            disabled={loading}
          />
          {showError('email') && (
            <p className="text-sm text-red-400 mt-1" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Guests & Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="guests" className="block text-sm font-medium text-white/90 mb-2">
            Number of Guests <span className="text-[#C9A227]">*</span>
          </label>
          <select
            id="guests"
            value={values.guests}
            onChange={(e) => setValue('guests', e.target.value)}
            onBlur={handleBlur('guests')}
            className={`${inputClass} ${showError('guests') ? inputErrorClass : ''}`}
            disabled={loading}
          >
            <option value="">Select guests</option>
            {GUEST_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {showError('guests') && (
            <p className="text-sm text-red-400 mt-1" role="alert">{errors.guests}</p>
          )}
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-white/90 mb-2">
            Date <span className="text-[#C9A227]">*</span>
          </label>
          <input
            id="date"
            type="date"
            min={today}
            value={values.date}
            onChange={(e) => setValue('date', e.target.value)}
            onBlur={handleBlur('date')}
            className={`${inputClass} ${showError('date') ? inputErrorClass : ''}`}
            disabled={loading}
          />
          {showError('date') && (
            <p className="text-sm text-red-400 mt-1" role="alert">{errors.date}</p>
          )}
        </div>
      </div>

      {/* Time Slot */}
      <TimeSlotSelector
        value={values.timeSlot}
        onChange={(v) => setValue('timeSlot', v)}
        error={showError('timeSlot') ? errors.timeSlot : null}
        disabled={loading}
      />

      {/* Dining Preference */}
      <div>
        <label className="block text-sm font-medium text-white/90 mb-3">
          Dining Preference <span className="text-[#C9A227]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DINING_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-300 border-2
                ${values.diningPreference === opt.value
                  ? 'border-[#C9A227] bg-[#C9A227]/10'
                  : 'border-white/10 bg-[#1c1c1c] hover:border-white/20'
                }
              `}
            >
              <input
                type="radio"
                name="diningPreference"
                value={opt.value}
                checked={values.diningPreference === opt.value}
                onChange={(e) => setValue('diningPreference', e.target.value)}
                disabled={loading}
                className="w-4 h-4 text-[#C9A227] focus:ring-[#C9A227]"
              />
              <span className="text-white/90 font-medium">{opt.label}</span>
            </label>
          ))}
        </div>
        {showError('diningPreference') && (
          <p className="text-sm text-red-400 mt-1" role="alert">{errors.diningPreference}</p>
        )}
      </div>

      {/* Occasion */}
      <div>
        <label htmlFor="occasion" className="block text-sm font-medium text-white/90 mb-2">
          Occasion <span className="text-[#C9A227]">*</span>
        </label>
        <select
          id="occasion"
          value={values.occasion}
          onChange={(e) => setValue('occasion', e.target.value)}
          onBlur={handleBlur('occasion')}
          className={`${inputClass} ${showError('occasion') ? inputErrorClass : ''}`}
          disabled={loading}
        >
          <option value="">Select occasion</option>
          {OCCASIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {showError('occasion') && (
          <p className="text-sm text-red-400 mt-1" role="alert">{errors.occasion}</p>
        )}
      </div>

      {/* Special Request */}
      <div>
        <label htmlFor="specialRequest" className="block text-sm font-medium text-white/90 mb-2">
          Special Request
        </label>
        <textarea
          id="specialRequest"
          value={values.specialRequest}
          onChange={(e) => setValue('specialRequest', e.target.value)}
          placeholder="Dietary requirements, allergies, celebrations..."
          rows={3}
          className={`${inputClass} resize-none ${showError('specialRequest') ? inputErrorClass : ''}`}
          disabled={loading}
        />
      </div>

      {/* Terms */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={values.terms}
            onChange={(e) => setValue('terms', e.target.checked)}
            onBlur={handleBlur('terms')}
            disabled={loading}
            className="mt-1 w-4 h-4 rounded text-[#C9A227] focus:ring-[#C9A227]"
          />
          <span className="text-sm text-white/80">
            I agree to the terms and conditions and privacy policy. <span className="text-[#C9A227]">*</span>
          </span>
        </label>
        {showError('terms') && (
          <p className="text-sm text-red-400 mt-1" role="alert">{errors.terms}</p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={invalid || loading}
          className="w-full py-4 rounded-[16px] bg-[#C9A227] text-[#111] font-semibold text-base hover:bg-[#d4af37] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 shadow-[0_4px_20px_rgba(201,162,39,0.3)]"
        >
          {loading ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Reserving...
            </span>
          ) : (
            'Reserve Table'
          )}
        </button>
      </div>
    </form>
  )
}
