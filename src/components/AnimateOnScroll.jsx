/**
 * AnimateOnScroll - Wraps children and runs animation when they scroll into view
 * USED BY: Home (sections, dish grid), Menu (heading, search, category, dish grid)
 * PROPS: animation (fadeInUp|fadeIn|scaleIn|slideUp|...), delay (1-10), className, as (wrapper tag)
 */
import { useInView } from '../hooks/useInView'

const ANIMATION_CLASSES = {
  fadeInUp: 'animate-fade-in-up',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  slideUp: 'animate-slide-up',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
}

/**
 * Wraps children and applies a premium animation when they scroll into view.
 * @param {string} animation - One of: fadeInUp, fadeIn, scaleIn, slideUp, slideInLeft, slideInRight
 * @param {number} delay - Optional stagger delay index (1-10) for grid items
 */
export default function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay,
  className = '',
  as: Component = 'div',
}) {
  const [ref, isInView] = useInView({ rootMargin: '0px 0px -80px 0px', threshold: 0.05 })
  const animClass = ANIMATION_CLASSES[animation] || ANIMATION_CLASSES.fadeInUp
  const delayClass = delay && delay >= 1 && delay <= 10 ? `animate-delay-${delay}` : ''

  return (
    <Component
      ref={ref}
      className={`${isInView ? animClass : 'opacity-0'} ${delayClass} ${className}`.trim()}
    >
      {children}
    </Component>
  )
}
