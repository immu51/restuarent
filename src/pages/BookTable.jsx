/**
 * BOOK TABLE PAGE - Table booking form and confirmation modal
 * ROUTE: /book-table
 * Uses: BookingForm, ConfirmationModal, Footer
 */
import { useState } from 'react'
import BookingForm from '../components/BookingForm'
import ConfirmationModal from '../components/ConfirmationModal'
import Footer from '../components/Footer'

export default function BookTable() {
  const [modalOpen, setModalOpen] = useState(false)
  const [booking, setBooking] = useState(null)

  const handleSuccess = (data) => {
    setBooking(data)
    setModalOpen(true)
  }

  return (
    <>
      <div className="w-full min-h-screen bg-[#111111] pb-16 flex justify-center" style={{ paddingTop: 'calc(5rem + 2rem)' }}>
        <div className="w-full max-w-2xl flex-shrink-0 px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3 text-center animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_both]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Book a Table
          </h1>
          <p className="text-white/70 text-center mb-10 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.1s_both]">
            Reserve your experience with us. We&apos;ll confirm your booking shortly.
          </p>

          <div
            className="w-full rounded-[16px] bg-[#1c1c1c] border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(201,162,39,0.08)] transition-all duration-500 animate-[fadeInUp_0.6s_cubic-bezier(0.22,1,0.36,1)_0.15s_both]"
          >
            <BookingForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        booking={booking}
      />

      <Footer />
    </>
  )
}
