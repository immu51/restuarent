/**
 * SEO - Updates document title and meta description when route changes
 * USED BY: App.jsx
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ROUTE_TITLES = {
  '/': 'Luxury Restaurant | Taste the Luxury at Your Doorstep',
  '/menu': 'Menu | Luxury Restaurant',
  '/book-table': 'Book a Table | Luxury Restaurant',
  '/cart': 'Cart | Luxury Restaurant',
  '/checkout': 'Checkout | Luxury Restaurant',
  '/tracking': 'Order Tracking | Luxury Restaurant',
  '/auth': 'Login | Luxury Restaurant',
}

const ROUTE_DESCRIPTIONS = {
  '/': 'Premium luxury restaurant - Order online, book a table. Fresh ingredients, 30 min delivery.',
  '/menu': 'Explore our premium menu - Starters, Main Course, Desserts. Order online.',
  '/book-table': 'Reserve a table at Luxury Restaurant. Choose date, time slot, and dining preference.',
  '/cart': 'Review your order and proceed to checkout.',
  '/checkout': 'Complete your order with delivery and payment details.',
  '/tracking': 'Track your order status - confirmed, preparing, out for delivery, delivered.',
  '/auth': 'Login or sign up to Luxury Restaurant.',
}

export default function SEO() {
  const { pathname } = useLocation()
  const basePath = pathname.split('?')[0]
  const title = ROUTE_TITLES[basePath] || ROUTE_TITLES['/']
  const description = ROUTE_DESCRIPTIONS[basePath] || ROUTE_DESCRIPTIONS['/']

  useEffect(() => {
    document.title = title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', description)
  }, [title, description])

  return null
}
