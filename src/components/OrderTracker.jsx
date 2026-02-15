/**
 * OrderTracker - Shows order status steps (confirmed, preparing, out for delivery, delivered)
 * USED BY: Tracking page
 * PROPS: currentStep (number 0-3 or string: 'confirmed'|'preparing'|'delivery'|'delivered')
 */
const STEPS = [
  { id: 'confirmed', label: 'Order Confirmed' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' },
]

export default function OrderTracker({ currentStep = 0 }) {
  const stepIndex = typeof currentStep === 'string'
    ? STEPS.findIndex((s) => s.id === currentStep)
    : Math.min(Math.max(0, currentStep), STEPS.length - 1)

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="flex justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-white/20 rounded-full" style={{ marginLeft: '12px', marginRight: '12px' }} />
        <div
          className="absolute top-5 left-0 h-0.5 bg-[#C9A227] rounded-full transition-all duration-700 ease-out"
          style={{
            marginLeft: '12px',
            width: stepIndex > 0 ? `${(stepIndex / (STEPS.length - 1)) * 100}%` : '0%',
          }}
        />
        {STEPS.map((step, i) => {
          const isActive = i <= stepIndex
          const isCurrent = i === stepIndex
          return (
            <div key={step.id} className="relative flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-500 ${
                  isActive ? 'bg-[#C9A227] text-[#111] scale-110' : 'bg-[#1c1c1c] text-white/50 border-2 border-white/20'
                } ${isCurrent ? 'ring-4 ring-[#C9A227]/40' : ''}`}
              >
                {isActive ? (
                  i < stepIndex ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    i + 1
                  )
                ) : (
                  i + 1
                )}
              </div>
              <span className={`mt-2 text-sm font-medium text-center transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/50'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
