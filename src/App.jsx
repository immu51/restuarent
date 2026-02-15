/**
 * APP ROOT - Main layout and routing
 *
 * FLOW:
 * 1. CartProvider wraps entire app → cart state available everywhere (Navbar, Cart, Checkout, FoodCard)
 * 2. BrowserRouter enables client-side routing (no full page reload on link click)
 * 3. ScrollToHash → scrolls to #contact when URL has hash; scrolls to top when going to Home
 * 4. SEO → updates document title and meta description per route
 * 5. Navbar → fixed top bar (Home, Menu, Book Table, Contact, Login, Cart)
 * 6. Routes → only one page renders at a time (lazy-loaded for better initial load)
 */
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import SEO from './components/SEO'
import ScrollToHash from './components/ScrollToHash'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// Lazy load other pages – only current route JS loads (better performance)
const Menu = lazy(() => import('./pages/Menu'))
const BookTable = lazy(() => import('./pages/BookTable'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Tracking = lazy(() => import('./pages/Tracking'))
const Auth = lazy(() => import('./pages/Auth'))

function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#111111]">
      <div className="text-white/60 text-sm">Loading…</div>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToHash />
        <SEO />
        <Navbar />
        <main className="relative z-0">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/book-table" element={<BookTable />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}
