// ============================================================
// Shared secondary-page hero. Used by Trucks, Services, About,
// and Contact so every non-home hero is pixel-identical.
// `title` accepts a node so callers can pass an <em> accent.
// ============================================================
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import './PageHero.css';

const EASE = [0.22, 1, 0.36, 1];
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function PageHero({ eyebrow, title, subtitle }) {
    const reduce = useReducedMotion();

    if (reduce) {
        return (
            <section className="ph-hero">
                <div className="ph-hero__overlay" />
                <div className="ph-hero__inner">
                    {eyebrow && (
                        <span className="ph-hero__label">
                            <span className="ph-hero__line" />
                            {eyebrow}
                        </span>
                    )}
                    <h1 className="ph-hero__title">{title}</h1>
                    {subtitle && <p className="ph-hero__sub">{subtitle}</p>}
                </div>
                <div className="ph-hero__cut" />
            </section>
        );
    }

    return (
        <section className="ph-hero">
            <div className="ph-hero__overlay" />
            <motion.div
                className="ph-hero__inner"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {eyebrow && (
                    <motion.span className="ph-hero__label" variants={item}>
                        <span className="ph-hero__line" />
                        {eyebrow}
                    </motion.span>
                )}
                <motion.h1 className="ph-hero__title" variants={item}>
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p className="ph-hero__sub" variants={item}>
                        {subtitle}
                    </motion.p>
                )}
            </motion.div>
            <div className="ph-hero__cut" />
        </section>
    );
}
