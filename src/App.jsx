/**
 * APP ROOT - Main layout and routing
 *
 * FLOW:
 * 1. CartProvider wraps entire app → cart state available everywhere (Navbar, Cart, Checkout, FoodCard)
 * 2. BrowserRouter enables client-side routing (no full page reload on link click)
 * 3. ScrollToHash → scrolls to #contact when URL has hash; scrolls to top when going to Home
 * 4. SEO → updates document title and meta description per route
 * 5. Navbar → fixed top bar (Home, Menu, Book Table, Contact, Login, Cart)
 * 6. Routes → only one page renders at a time based on URL path
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import SEO from './components/SEO'
import ScrollToHash from './components/ScrollToHash'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import BookTable from './pages/BookTable'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Tracking from './pages/Tracking'
import Auth from './pages/Auth'

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToHash />
        <SEO />
        <Navbar />
        <main className="relative z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book-table" element={<BookTable />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
      </BrowserRouter>
    </CartProvider>
  )
}
