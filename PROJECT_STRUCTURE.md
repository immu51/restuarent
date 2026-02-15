# Restaurant App – Code Flow (Beginner Friendly)

## 1. Entry point

```
index.html
  → <div id="root"></div>
  → main.jsx
      → Renders <App /> inside root
```

- **main.jsx** – App ka entry. `App.jsx` ko root pe render karta hai.

---

## 2. App layout (App.jsx)

```
CartProvider (cart state sab jagah use ho sake)
  └── BrowserRouter (routing)
        ├── ScrollToHash   → URL hash / home pe scroll
        ├── SEO           → title & meta description per route
        ├── Navbar        → fixed top (Home, Menu, Book Table, Contact, Login, Cart)
        └── <main>
              └── Routes   → ek path pe ek page
                    /           → Home
                    /menu       → Menu
                    /book-table → BookTable
                    /cart       → Cart
                    /checkout   → Checkout
                    /tracking   → Tracking
                    /auth       → Auth
```

---

## 3. Pages and components (kaun kahan use hota hai)

| Page / File      | Route       | Uses (components / data) |
|------------------|------------|---------------------------|
| **Home**         | `/`        | Hero, FoodCard, Footer, ReviewSlider, ContactForm, AnimateOnScroll, POPULAR_DISHES |
| **Menu**         | `/menu`    | FoodCard, Footer, AnimateOnScroll, DISHES, DISH_CATEGORIES |
| **BookTable**    | `/book-table` | BookingForm, ConfirmationModal, Footer |
| **Cart**         | `/cart`    | CartItem, Footer, useCart |
| **Checkout**     | `/checkout`   | Footer, useCart |
| **Tracking**     | `/tracking`   | OrderTracker, Footer |
| **Auth**         | `/auth`    | Footer |

---

## 4. Components – short description

| Component          | Kya karta hai | Kahan use |
|-------------------|----------------|-----------|
| **Navbar**        | Top bar, links, cart count | App (sab pages pe) |
| **Footer**        | Brand, address, contact, links | Home, Menu, BookTable, Cart, Checkout, Tracking, Auth |
| **SEO**           | Route change pe title & meta update | App |
| **ScrollToHash**  | Hash pe scroll / home pe top scroll | App |
| **Hero**          | Top banner, CTA buttons | Home |
| **FoodCard**      | Ek dish card, Add to Cart | Home, Menu |
| **CartItem**      | Cart ki ek row (quantity, remove) | Cart |
| **ReviewSlider**  | Reviews carousel | Home |
| **ContactForm**    | Contact form (#contact) | Home |
| **AnimateOnScroll** | Scroll pe animation | Home, Menu |
| **BookingForm**   | Table booking form | BookTable |
| **TimeSlotSelector** | Time slot buttons | BookingForm |
| **ConfirmationModal** | Booking confirm dialog | BookTable |
| **OrderTracker**  | Order status steps | Tracking |

---

## 5. Context & data

| File / folder   | Kya hai | Kahan use |
|-----------------|---------|-----------|
| **context/CartContext.jsx** | Cart state (items, count, add/remove, coupon, total) | App (Provider), Navbar, FoodCard, Cart, CartItem, Checkout |
| **data/dishes.js**  | DISHES, DISH_CATEGORIES, POPULAR_DISHES | Menu, Home |
| **data/images.js** | HERO_IMAGES, DISH_IMAGES, AVATAR_IMAGES | Hero, dishes, reviews |
| **data/reviews.js** | REVIEWS | ReviewSlider |

---

## 6. Hooks

| Hook        | Kya karta hai | Kahan use |
|------------|----------------|-----------|
| **useCart** | CartContext se cart state & actions | Navbar, FoodCard, Cart, CartItem, Checkout |
| **useInView** | Element viewport mein hai ya nahi | AnimateOnScroll |

---

## 7. Flow in short

1. **main.jsx** → `App` render karta hai.
2. **App** → `CartProvider` + `BrowserRouter` + Navbar + Routes.
3. **Routes** → URL ke hisaab se ek page (Home, Menu, BookTable, Cart, …) render.
4. **Cart** sab jagah same rehta hai (CartProvider), isliye Navbar, Cart page, Checkout sab same cart use karte hain.
5. **Data** sab local: `dishes.js`, `images.js`, `reviews.js` – koi backend call nahi.

Har important file ke upar comment mein likha hai: **USED BY** (kaun use karta hai) aur **PROPS** (agar component props leta ho). Isse flow follow karna easy rehta hai.
