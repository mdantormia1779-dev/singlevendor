import gsap from "gsap";

/**
 * Animate elements with staggered fade-in and slide-up effect
 */
export const animateStaggerCards = (target, options = {}) => {
  if (!target) return null;
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 35,
      scale: 0.98,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: options.duration || 0.6,
      stagger: options.stagger !== undefined ? options.stagger : 0.08,
      ease: options.ease || "power3.out",
      delay: options.delay || 0,
    }
  );
};

/**
 * Animate section headers / text with smooth power3 reveal
 */
export const animateFadeInUp = (target, options = {}) => {
  if (!target) return null;
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: options.y || 25,
    },
    {
      opacity: 1,
      y: 0,
      duration: options.duration || 0.7,
      ease: "power3.out",
      delay: options.delay || 0,
    }
  );
};

/**
 * Smooth card hover micro-interaction
 */
export const animateCardHover = (element, isHovered) => {
  if (!element) return;
  if (isHovered) {
    gsap.to(element, {
      y: -5,
      duration: 0.28,
      ease: "power2.out",
    });
  } else {
    gsap.to(element, {
      y: 0,
      duration: 0.32,
      ease: "power2.out",
    });
  }
};

/**
 * Smooth entrance for badges and floating elements
 */
export const animateFloatingPill = (target) => {
  if (!target) return null;
  return gsap.fromTo(
    target,
    { scale: 0.88, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  );
};
