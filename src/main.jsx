/**
 * ENTRY POINT - App starts here
 * 1. Renders React app into index.html's <div id="root">
 * 2. StrictMode helps catch bugs (runs checks in dev)
 * 3. App.jsx is the root component (routes, navbar, pages)
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
