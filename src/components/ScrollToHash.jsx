/**
 * ScrollToHash - On route change: scroll to element #id if URL has hash; else scroll to top
 * USED BY: App.jsx
 */
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to #contact (or other hash) when navigating to /#contact from any page.
// When navigating to Home (/) with no hash, scrolls to top so home page is visible.
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      const scrollToEl = () => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      const timer = setTimeout(scrollToEl, 400)
      return () => clearTimeout(timer)
    }
    // No hash: scroll to top (e.g. when clicking Home from Menu/Cart)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname, hash])

  return null
}
