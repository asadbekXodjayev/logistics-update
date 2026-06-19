// ============================================================
// Track Your Shipment — accessible modal that POSTs a status
// request to Telegram. Triggered from the navbar / footer via
// the useTrackModal() context.
// ============================================================
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { sendTelegramMessage } from '../../lib/telegram';
import { LuCheck, LuX } from 'react-icons/lu';
import './TrackModal.css';

const EMPTY = { load: '', company: '', phone: '', email: '' };

export default function TrackModal({ open, onClose }) {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState(''); // '' | 'success' | 'error'
    const [statusMsg, setStatusMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const reduce = useReducedMotion();
    const firstFieldRef = useRef(null);
    const panelRef = useRef(null);

    // Lock body scroll, focus first field, close on Escape
    useEffect(() => {
        if (!open) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const t = setTimeout(() => firstFieldRef.current?.focus(), 60);

        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);

        return () => {
            document.body.style.overflow = prevOverflow;
            window.removeEventListener('keydown', onKey);
            clearTimeout(t);
        };
    }, [open, onClose]);

    // Reset form shortly after closing
    useEffect(() => {
        if (open) {
            setStatus('');
            setStatusMsg('');
        }
    }, [open]);

    const update = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const text =
            `🚚 New Status Request\n` +
            `Load #: ${form.load}\n` +
            `Company: ${form.company}\n` +
            `Phone: ${form.phone}\n` +
            `Email: ${form.email}`;

        try {
            await sendTelegramMessage(text);
            setStatus('success');
            setStatusMsg('Request received — our team will contact you shortly.');
            setForm(EMPTY);
        } catch {
            setStatus('error');
            setStatusMsg('Something went wrong. Please try again, or call us directly.');
        } finally {
            setLoading(false);
        }
    };

    const overlayMotion = reduce
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
        : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

    const panelMotion = reduce
        ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
        : {
            initial: { opacity: 0, y: 28, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 20, scale: 0.98 },
        };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="track-modal__overlay"
                    {...overlayMotion}
                    transition={{ duration: 0.22 }}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        ref={panelRef}
                        className="track-modal__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="track-modal-title"
                        {...panelMotion}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <button
                            type="button"
                            className="track-modal__close"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        </button>

                        <span className="track-modal__label">
                            <span className="track-modal__line" />
                            Track Your Shipment
                        </span>
                        <h2 id="track-modal-title" className="track-modal__title">
                            Request a <em>Status</em> Update
                        </h2>
                        <p className="track-modal__sub">
                            Send us your load details and our dispatch team will get back
                            to you with the latest on your freight.
                        </p>

                        <form className="track-modal__form" onSubmit={handleSubmit} noValidate>
                            <div className="track-modal__field">
                                <label htmlFor="tm-load">Load / Cargo Number *</label>
                                <input
                                    id="tm-load" ref={firstFieldRef} type="text" required
                                    placeholder="e.g. MG-238104"
                                    value={form.load} onChange={update('load')}
                                />
                            </div>
                            <div className="track-modal__field">
                                <label htmlFor="tm-company">Company Name *</label>
                                <input
                                    id="tm-company" type="text" required
                                    placeholder="Your company"
                                    value={form.company} onChange={update('company')}
                                />
                            </div>
                            <div className="track-modal__row">
                                <div className="track-modal__field">
                                    <label htmlFor="tm-phone">Contact Phone *</label>
                                    <input
                                        id="tm-phone" type="tel" required
                                        placeholder="(000) 000-0000"
                                        value={form.phone} onChange={update('phone')}
                                    />
                                </div>
                                <div className="track-modal__field">
                                    <label htmlFor="tm-email">Contact Email *</label>
                                    <input
                                        id="tm-email" type="email" required
                                        placeholder="you@company.com"
                                        value={form.email} onChange={update('email')}
                                    />
                                </div>
                            </div>

                            {status && (
                                <div className={`track-modal__status track-modal__status--${status}`} role="status">
                                    {status === 'success'
                                        ? <LuCheck size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />
                                        : <LuX size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />}
                                    {statusMsg}
                                </div>
                            )}

                            <button type="submit" className="track-modal__submit" disabled={loading}>
                                {loading ? (
                                    <span className="track-modal__spinner" />
                                ) : (
                                    <>
                                        Request Status
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
