// ============================================================
// Wraps a page so route changes fade/slide in and out via the
// <AnimatePresence> in App.jsx. Collapses to a plain div under
// prefers-reduced-motion.
// ============================================================
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children, className }) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
