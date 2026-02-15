/**
 * AUTH PAGE - Login/signup form (frontend only, no backend)
 * ROUTE: /auth
 * Uses: Footer
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder - wire to auth context/API later
  }

  return (
    <>
      <div className="min-h-screen bg-[#111111] pt-28 md:pt-32 pb-16 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-[420px] mx-auto animate-[scaleIn_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
          <div className="py-8 sm:py-10 px-6 sm:px-8 rounded-2xl bg-[#1c1c1c] shadow-[0_4px_20px_rgba(0,0,0,0.3)]" style={{ borderRadius: '16px' }}>
            <h1
              className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-4 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors text-base"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-4 rounded-xl bg-[#111] border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-[#C9A227] transition-colors text-base"
                />
              </div>
              {isLogin && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="rounded border-white/20 text-[#C9A227] focus:ring-[#C9A227]"
                  />
                  <span className="text-sm text-white/70">Remember me</span>
                </label>
              )}
              <button
                type="submit"
                className="w-full py-[1rem] rounded-xl bg-[#C9A227] text-[#111] font-semibold hover:bg-[#d4af37] transition-colors text-base leading-normal min-h-[3.25rem]"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>

            {/* Social login - Google only */}
            <div className="mt-8">
              <p className="text-center text-sm text-white/60 mb-3">Or continue with</p>
              <button
                type="button"
                className="w-full py-[1rem] rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 leading-normal min-h-[3.25rem]"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-white/70">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#C9A227] hover:underline font-medium"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>

          <p className="mt-6 text-center">
            <Link to="/" className="text-white/60 hover:text-[#C9A227] text-sm transition-colors">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </>
  )
}
