/**
 * ContactForm - Contact section form (name, email, message) on Home page
 * USED BY: Home page (#contact section)
 */
import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder: wire to API or email service later
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#111111] flex flex-col items-center">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-white mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Get in Touch
        </h2>
        <p className="text-center text-white/70 max-w-xl mx-auto mb-12">
          Have a question, feedback, or want to book a private event? Send us a message.
        </p>

        <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-[52rem] mx-auto flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-[#1c1c1c] shadow-[0_4px_20px_rgba(0,0,0,0.3)] w-full"
            style={{ borderRadius: '16px' }}
          >
            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/50 text-[#C9A227] text-center">
                Thank you! We&apos;ll get back to you soon.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-white/80 mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-white/80 mb-2">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-white/80 mb-2">
                  Subject
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white focus:outline-none focus:border-[#C9A227] transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="reservation">Table Reservation</option>
                  <option value="catering">Catering / Events</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="contact-message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-[1rem] rounded-2xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] transition-all duration-300 leading-normal min-h-[3.25rem]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
