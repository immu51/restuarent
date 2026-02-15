/**
 * SEO - Updates document title, meta description, OG, Twitter and canonical when route changes
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
  '/menu': 'Explore our premium menu - Starters, Main Course, Desserts, Indian veg. Order online.',
  '/book-table': 'Reserve a table at Luxury Restaurant. Choose date, time slot, and dining preference.',
  '/cart': 'Review your order and proceed to checkout.',
  '/checkout': 'Complete your order with delivery and payment details.',
  '/tracking': 'Track your order status - confirmed, preparing, out for delivery, delivered.',
  '/auth': 'Login or sign up to Luxury Restaurant.',
}

function setMeta(nameOrProp, value, isProperty = false) {
  const attr = isProperty ? 'property' : 'name'
  let el = document.querySelector(`meta[${attr}="${nameOrProp}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, nameOrProp)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value || '')
}

export default function SEO() {
  const { pathname } = useLocation()
  const basePath = pathname.split('?')[0]
  const title = ROUTE_TITLES[basePath] || ROUTE_TITLES['/']
  const description = ROUTE_DESCRIPTIONS[basePath] || ROUTE_DESCRIPTIONS['/']

  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, true)
    setMeta('og:description', description, true)
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${window.location.origin}${basePath}`)
  }, [title, description, basePath])

  return null
}
