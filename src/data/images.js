/**
 * IMAGE PATHS - All images are local (public/images), no external URLs
 *
 * USED BY: Hero (HERO_IMAGES), dishes.js (DISH_IMAGES), reviews.js (AVATAR_IMAGES)
 */
/* Use .jpg if your public/images files are JPG; use .svg if they are SVG */
const ext = 'svg'

export const HERO_IMAGES = [
  `/images/hero/1.${ext}`,
  `/images/hero/2.${ext}`,
  `/images/hero/3.${ext}`,
  `/images/hero/4.${ext}`,
  `/images/hero/5.${ext}`,
]

export const DISH_IMAGES = {
  1: `/images/dishes/1.${ext}`,
  2: `/images/dishes/2.${ext}`,
  3: `/images/dishes/3.${ext}`,
  4: `/images/dishes/4.${ext}`,
  5: `/images/dishes/5.${ext}`,
  6: `/images/dishes/6.${ext}`,
  7: `/images/dishes/7.${ext}`,
  8: `/images/dishes/8.${ext}`,
  9: `/images/dishes/9.${ext}`,
  10: `/images/dishes/10.${ext}`,
}

export const AVATAR_IMAGES = {
  1: `/images/avatars/1.${ext}`,
  2: `/images/avatars/2.${ext}`,
  3: `/images/avatars/3.${ext}`,
}
