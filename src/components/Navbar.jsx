/**
 * Navbar - Fixed top bar: logo, Home, Menu, Book Table, Contact, Login, Cart
 * USED BY: App.jsx (always visible)
 * Uses CartContext for cart count badge
 */
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/book-table', label: 'Book Table' },
  { to: '/', label: 'Contact', hash: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { cartCount } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  // Close mobile menu when route changes (e.g. Cart → Checkout) so it doesn’t overlay the new page
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const handleHashNav = (to, hash) => {
    setOpen(false)
    navigate(`${to}${hash}`)
    // ScrollToHash in App will scroll after route renders
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out animate-[fadeIn_0.6s_ease-out] border-b border-white/5"
      style={{
        background: location.pathname === '/' ? 'transparent' : '#1c1c1c',
        backdropFilter: location.pathname === '/' ? 'none' : 'blur(12px)',
        WebkitBackdropFilter: location.pathname === '/' ? 'none' : 'blur(12px)',
      }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="font-heading text-xl md:text-2xl font-semibold text-white hover:text-[#C9A227] transition-colors duration-300 shrink-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Luxury
          </Link>

          {/* Desktop nav - Center (viewport center) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:gap-8">
            {navLinks.map(({ to, label, hash }) =>
              hash ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleHashNav(to, hash)}
                  className="text-white/90 hover:text-[#C9A227] transition-colors duration-300 text-sm font-medium bg-transparent border-none cursor-pointer p-0"
                >
                  {label}
                </button>
              ) : (
                <Link
                  key={label}
                  to={to}
                  onClick={() => {
                    if (label === 'Home' && location.pathname === '/') {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                  }}
                  className="text-white/90 hover:text-[#C9A227] transition-colors duration-300 text-sm font-medium"
                >
                  {label}
                </Link>
              )
            )}
          </div>

         
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto mr-20 sm:mr-28 lg:mr-36">
            <Link
              to="/auth"
              className="hidden sm:inline-flex items-center px-5 py-3 rounded-2xl border border-[#C9A227] text-[#C9A227] hover:bg-[#C9A227]/10 transition-all duration-300 text-sm font-medium leading-normal"
            >
              Login
            </Link>
            <Link
              to="/cart"
              className="relative p-2.0 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 overflow-visible"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full bg-[#C9A227] text-[#111] text-xs font-bold z-10 ring-2 ring-[#111111]">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navLinks.map(({ to, label, hash }) =>
                hash ? (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleHashNav(to, hash)}
                    className="px-5 py-3.5 rounded-xl text-left text-white/90 hover:bg-white/10 hover:text-[#C9A227] bg-transparent border-none w-full cursor-pointer leading-normal"
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    key={label}
                    to={to}
                    className="px-5 py-3.5 rounded-xl text-white/90 hover:bg-white/10 hover:text-[#C9A227] leading-normal"
                    onClick={() => {
                      setOpen(false)
                      if (label === 'Home' && location.pathname === '/') {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                  >
                    {label}
                  </Link>
                )
              )}
              <Link
                to="/auth"
                className="px-5 py-3.5 rounded-xl text-[#C9A227] hover:bg-[#C9A227]/10 leading-normal"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
