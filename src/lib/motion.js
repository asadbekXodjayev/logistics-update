// ============================================================
// Shared framer-motion variants.
//
// These mirror the timing/feel of the site's original CSS keyframes
// (fadeInUp 0.7s, slideInLeft, stagger ~0.15s) so motion stays consistent
// across the redesign. Use with the <Reveal>/<Stagger> components in
// components/Motion/Reveal.jsx, which also honor prefers-reduced-motion.
// ============================================================

// Easing tuned to match the existing cubic-bezier(0.4, 0, 0.2, 1) feel
const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const slideInRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } },
};

/** Container that staggers its direct children (use with <StaggerItem>). */
export const staggerContainer = (stagger = 0.12, delayChildren = 0) => ({
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Default whileInView viewport config: animate once, when 20% visible. */
export const viewportOnce = { once: true, amount: 0.2 };

/** Reusable hover/tap feel for interactive cards & buttons. */
export const hoverLift = {
    rest: { y: 0 },
    hover: { y: -6, transition: { duration: 0.3, ease: EASE } },
    tap: { scale: 0.985 },
};
