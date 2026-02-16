import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** SPA fallback: serve index.html for routes like /menu, /checkout so refresh & direct URLs don't 404 */
function spaFallback() {
  return {
    name: 'spa-fallback',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'GET' && req.url && !req.url.includes('.') && !req.url.startsWith('/@')) {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallback()],
})
