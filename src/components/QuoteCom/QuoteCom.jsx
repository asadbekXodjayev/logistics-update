// ============================================================
// Request a Quote — sectioned rate-quote form (Averitt-style),
// POSTs to Telegram via the shared util.
// ============================================================
import React, { useState } from 'react';
import { Reveal } from '../Motion/Reveal';
import { sendTelegramMessage } from '../../lib/telegram';
import { TRAILER_NAMES } from '../../lib/trailers';
import './QuoteCom.css';

const EMPTY = {
    origin: '',
    destination: '',
    trailer: '',
    commodity: '',
    weight: '',
    weightUnit: 'lbs',
    date: '',
    name: '',
    email: '',
    phone: '',
};

export default function QuoteCom() {
    const [form, setForm] = useState(EMPTY);
    const [status, setStatus] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const update = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const text =
            `💬 Quote Request\n` +
            `From: ${form.origin}\n` +
            `To: ${form.destination}\n` +
            `Trailer: ${form.trailer || '—'}\n` +
            `Commodity: ${form.commodity || '—'}\n` +
            `Weight: ${form.weight ? `${form.weight} ${form.weightUnit}` : '—'}\n` +
            `Est. Date: ${form.date || '—'}\n` +
            `— Contact —\n` +
            `Name: ${form.name}\n` +
            `Email: ${form.email}\n` +
            `Phone: ${form.phone}`;

        try {
            await sendTelegramMessage(text);
            setStatus('success');
            setStatusMsg('Thanks — our team will reach out shortly.');
            setForm(EMPTY);
        } catch {
            setStatus('error');
            setStatusMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="quote-page">
            {/* Hero */}
            <section className="quote-hero page-hero">
                <div className="quote-hero__overlay" />
                <div className="quote-hero__inner">
                    <span className="quote-hero__label">
                        <span className="quote-hero__line" />
                        Get a Rate
                    </span>
                    <h1 className="quote-hero__title">
                        Request a <span className="quote-hero__accent">Quote</span>
                    </h1>
                    <p className="quote-hero__sub">
                        Tell us about your lane and freight — we'll come back with a
                        competitive rate, fast.
                    </p>
                </div>
                <div className="quote-hero__cut" />
            </section>

            {/* Body */}
            <section className="quote-body">
                <Reveal as="aside" className="quote-side">
                    <span className="quote-side__label">
                        <span className="quote-side__line" />
                        How It Works
                    </span>
                    <h2 className="quote-side__title">
                        Three Steps to a<br />
                        <span className="quote-side__accent">Booked Load.</span>
                    </h2>
                    <div className="quote-side__bar" />
                    <ol className="quote-steps">
                        {[
                            { n: '01', t: 'Send your details', d: 'Origin, destination, equipment, and freight specs.' },
                            { n: '02', t: 'Get a tailored rate', d: 'Our dispatch team reviews and prices your lane.' },
                            { n: '03', t: 'Book & roll', d: 'Approve the rate and we put a truck on it.' },
                        ].map((s) => (
                            <li key={s.n} className="quote-step">
                                <span className="quote-step__num">{s.n}</span>
                                <div>
                                    <h3 className="quote-step__title">{s.t}</h3>
                                    <p className="quote-step__text">{s.d}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </Reveal>

                <Reveal as="form" className="quote-form" onSubmit={handleSubmit} noValidate>
                    {/* Route */}
                    <fieldset className="quote-form__group">
                        <legend className="quote-form__legend">Route</legend>
                        <div className="quote-form__grid">
                            <div className="quote-form__field">
                                <label htmlFor="q-origin">From (City / ZIP) *</label>
                                <input id="q-origin" type="text" required placeholder="Austin, TX / 78701"
                                    value={form.origin} onChange={update('origin')} />
                            </div>
                            <div className="quote-form__field">
                                <label htmlFor="q-dest">To (City / ZIP) *</label>
                                <input id="q-dest" type="text" required placeholder="Dallas, TX / 75201"
                                    value={form.destination} onChange={update('destination')} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Freight */}
                    <fieldset className="quote-form__group">
                        <legend className="quote-form__legend">Freight</legend>
                        <div className="quote-form__grid">
                            <div className="quote-form__field">
                                <label htmlFor="q-trailer">Type of Trailer *</label>
                                <select id="q-trailer" required value={form.trailer} onChange={update('trailer')}>
                                    <option value="" disabled>Select trailer…</option>
                                    {TRAILER_NAMES.map((name) => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="quote-form__field">
                                <label htmlFor="q-commodity">Commodity</label>
                                <input id="q-commodity" type="text" placeholder="e.g. Steel coils"
                                    value={form.commodity} onChange={update('commodity')} />
                            </div>
                            <div className="quote-form__field">
                                <label htmlFor="q-weight">Weight</label>
                                <div className="quote-form__weight">
                                    <input id="q-weight" type="number" min="0" placeholder="0"
                                        value={form.weight} onChange={update('weight')} />
                                    <select aria-label="Weight unit" value={form.weightUnit} onChange={update('weightUnit')}>
                                        <option value="lbs">lbs</option>
                                        <option value="kg">kg</option>
                                    </select>
                                </div>
                            </div>
                            <div className="quote-form__field">
                                <label htmlFor="q-date">Est. Pickup Date</label>
                                <input id="q-date" type="date" value={form.date} onChange={update('date')} />
                            </div>
                        </div>
                    </fieldset>

                    {/* Contact */}
                    <fieldset className="quote-form__group">
                        <legend className="quote-form__legend">Contact</legend>
                        <div className="quote-form__grid">
                            <div className="quote-form__field">
                                <label htmlFor="q-name">Full Name *</label>
                                <input id="q-name" type="text" required placeholder="John Smith"
                                    value={form.name} onChange={update('name')} />
                            </div>
                            <div className="quote-form__field">
                                <label htmlFor="q-email">Email *</label>
                                <input id="q-email" type="email" required placeholder="john@company.com"
                                    value={form.email} onChange={update('email')} />
                            </div>
                            <div className="quote-form__field quote-form__field--full">
                                <label htmlFor="q-phone">Phone *</label>
                                <input id="q-phone" type="tel" required placeholder="(000) 000-0000"
                                    value={form.phone} onChange={update('phone')} />
                            </div>
                        </div>
                    </fieldset>

                    {status && (
                        <div className={`quote-form__status quote-form__status--${status}`} role="status">
                            {status === 'success' ? '✓ ' : '✕ '}{statusMsg}
                        </div>
                    )}

                    <button type="submit" className="quote-form__submit" disabled={loading}>
                        {loading ? (
                            <span className="quote-form__spinner" />
                        ) : (
                            <>
                                Request Quote
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5"
                                    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </>
                        )}
                    </button>
                </Reveal>
            </section>
        </div>
    );
}
