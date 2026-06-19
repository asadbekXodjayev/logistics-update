// ============================================================
// Motion primitives — scroll-reveal + stagger wrappers.
//
// All of them collapse to a plain element (no animation) when the user
// has prefers-reduced-motion enabled, so accessibility is preserved.
//
//   <Reveal>...</Reveal>                  // single fade-up on scroll-in
//   <Reveal variants={slideInLeft}>       // pick any variant
//   <Stagger><StaggerItem/>...</Stagger>  // staggered children on scroll-in
// ============================================================
import { motion, useReducedMotion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

/**
 * Reveal a single element when it scrolls into view.
 * @param {object} props
 * @param {keyof JSX.IntrinsicElements} [props.as='div']
 * @param {object} [props.variants=fadeUp]
 * @param {number} [props.delay=0]
 */
export function Reveal({
    as = 'div',
    variants = fadeUp,
    delay = 0,
    className,
    children,
    ...rest
}) {
    const reduce = useReducedMotion();
    const Tag = as;

    if (reduce) {
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            transition={delay ? { delay } : undefined}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}

/**
 * Container that staggers its <StaggerItem> children as the group scrolls in.
 */
export function Stagger({
    as = 'div',
    stagger = 0.12,
    delayChildren = 0,
    amount = 0.2,
    className,
    children,
    ...rest
}) {
    const reduce = useReducedMotion();
    const Tag = as;

    if (reduce) {
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag
            className={className}
            variants={staggerContainer(stagger, delayChildren)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}

/** A single staggered child. Must live inside <Stagger>. */
export function StaggerItem({
    as = 'div',
    variants = fadeUp,
    className,
    children,
    ...rest
}) {
    const reduce = useReducedMotion();
    const Tag = as;

    if (reduce) {
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    const MotionTag = motion[as] || motion.div;
    return (
        <MotionTag className={className} variants={variants} {...rest}>
            {children}
        </MotionTag>
    );
}

export default Reveal;
