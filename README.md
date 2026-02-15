# Luxury Restaurant Website

A premium, modern restaurant website built with **React.js** and **Tailwind CSS**. Dark luxury theme with gold accents, fully responsive, smooth animations, and SEO optimized.

## Tech Stack

- **React 19** + Vite 7
- **Tailwind CSS v4** (with @tailwindcss/vite)
- **React Router v7**
- Context API for cart state

## Design

- **Background:** `#111111`
- **Accent:** Gold `#C9A227`
- **Secondary:** `#1c1c1c`
- **Fonts:** Playfair Display (headings), Poppins (body)
- **Style:** 16px rounded corners, soft shadows, glassmorphism navbar

## Pages

1. **Home** – Hero, Popular Dishes, Why Choose Us, Reviews, Footer  
2. **Menu** – Category filters (Veg / Non-Veg / Starters / Main Course / Desserts), search, food cards, add to cart  
3. **Cart** – Items, quantity controls, subtotal, delivery charge, coupon (SAVE20, LUXURY50, WELCOME10), checkout  
4. **Checkout** – Delivery type (Home / Pickup), address form, payment options (UPI, Card, COD), place order  
5. **Order Tracking** – Animated progress: Order Confirmed → Preparing → Out for Delivery → Delivered  
6. **Auth** – Login / Signup card, email + password, remember me, social login UI

## Features

- Add to cart with navbar counter  
- Delivery charge auto calculation (₹49)  
- Coupon discount logic (min order rules)  
- Responsive (mobile, tablet, desktop)  
- Smooth hover and transition animations  
- SEO: per-route title and meta description

## Project Structure

```
src/
  components/   Navbar, Hero, FoodCard, Footer, ReviewSlider, CartItem, OrderTracker, SEO
  context/      CartContext
  data/         dishes.js, reviews.js
  pages/        Home, Menu, Cart, Checkout, Tracking, Auth
  App.jsx, main.jsx, index.css
```

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Coupons (demo)

- **SAVE20** – ₹20 off, min order ₹500  
- **LUXURY50** – ₹50 off, min order ₹1000  
- **WELCOME10** – ₹10 off, min order ₹200  
