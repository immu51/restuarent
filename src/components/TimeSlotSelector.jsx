/**
 * TimeSlotSelector - Fixed time slots for Book Table form
 * USED BY: BookingForm
 * PROPS: value, onChange, error (string), disabled
 */
const TIME_SLOTS = [
  { id: '12-2', label: '12:00 PM – 2:00 PM', value: '12:00 PM – 2:00 PM' },
  { id: '2-4', label: '2:00 PM – 4:00 PM', value: '2:00 PM – 4:00 PM' },
  { id: '6-8', label: '6:00 PM – 8:00 PM', value: '6:00 PM – 8:00 PM' },
  { id: '8-10', label: '8:00 PM – 10:00 PM', value: '8:00 PM – 10:00 PM' },
]

export default function TimeSlotSelector({ value, onChange, error, disabled }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/90">
        Time Slot <span className="text-[#C9A227]">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIME_SLOTS.map((slot) => (
          <button
            key={slot.id}
            type="button"
            disabled={disabled}
            onClick={() => onChange(slot.value)}
            className={`
              px-4 py-3 rounded-[16px] text-left text-sm font-medium transition-all duration-300
              border-2
              ${value === slot.value
                ? 'border-[#C9A227] bg-[#C9A227]/15 text-[#C9A227] shadow-[0_0_20px_rgba(201,162,39,0.2)]'
                : 'border-white/10 bg-[#1c1c1c] text-white/90 hover:border-white/25 hover:bg-white/5'
              }
              ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {slot.label}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-400 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
