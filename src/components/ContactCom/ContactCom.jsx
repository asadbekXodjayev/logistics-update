import React, { useState } from 'react';
import './ContactsCom.css';
import { sendTelegramMessage } from '../../lib/telegram';
import PageHero from '../PageHero/PageHero.jsx';

import { Link } from 'react-router-dom';

const ContactsCom = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState(''); // 'success' | 'error' | ''
    const [statusMsg, setStatusMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const caption = `📩 Contact Request\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nCity: ${city}\nMessage: ${message}`;

        try {
            await sendTelegramMessage(caption);
            setStatus('success');
            setStatusMsg('Your message was sent! We\'ll be in touch shortly.');
            setName(''); setEmail(''); setPhoneNumber('');
            setCity(''); setMessage(''); setConsent(false);
        } catch {
            setStatus('error');
            setStatusMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const infoItems = [
        {  label: 'Email Us', value: 'info@moglobetrucking.com' },
        {  label: 'Call Us', value: '(512) 787-0305' },
        {  label: 'Working Hours', value: 'Mon – Sat  9:00 – 18:00\nSunday Closed' },
    ];

    return (
        <div className="contact-page">

            {/* ── Hero banner ───────────────────────────────── */}
            <PageHero
                eyebrow="Reach Out"
                title={<>Let's Get <em>Moving</em></>}
                subtitle="Have a shipment in mind? We're ready to help — reach out and our team will get back to you fast."
            />

            {/* ── Info cards ────────────────────────────────── */}
            <div className="contact-info-bar">
                {infoItems.map((item, i) => (
                    <div key={i} className="contact-info-card">
                        <div className="contact-info-card__icon-wrap">
                            <div className="contact-info-card-circle"></div>
                        </div>
                        <div>
                            <span className="contact-info-card__label">{item.label}</span>
                            <p className="contact-info-card__value" style={{ whiteSpace: 'pre-line' }}>
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main content: form + side panel ───────────── */}
            <div className="contact-body">

                {/* Side panel */}
                <aside className="contact-side">
                    <span className="contact-side__label">
                        <span className="contact-side__label-line" />
                        Why Contact Us
                    </span>
                    <h2 className="contact-side__title">
                        Fast Response.<br />
                        <span className="contact-side__accent">Real Results.</span>
                    </h2>
                    <div className="contact-side__bar" />
                    <p className="contact-side__desc">
                        Our team of logistics experts is standing by to answer your
                        questions, provide quotes, and get your freight moving.
                    </p>
                    <ul className="contact-side__list">
                        {[
                            'Free shipping quotes within 24 hours',
                            'Dedicated account manager assigned',
                            'Real-time tracking from day one',
                            'Serving all 48 contiguous states',
                        ].map((item, i) => (
                            <li key={i} className="contact-side__list-item">
                                <span className="contact-side__check">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Form */}
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                    <h3 className="contact-form__heading">Send Us a Message</h3>
                    <div className="contact-form__bar" />

                    <div className="contact-form__grid">
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="cf-name">Full Name *</label>
                            <input
                                id="cf-name" type="text" placeholder="John Smith"
                                value={name} onChange={e => setName(e.target.value)} required
                            />
                        </div>
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="cf-email">Email Address *</label>
                            <input
                                id="cf-email" type="email" placeholder="john@company.com"
                                value={email} onChange={e => setEmail(e.target.value)} required
                            />
                        </div>
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="cf-phone">Phone Number *</label>
                            <input
                                id="cf-phone" type="tel" placeholder="(000) 000-0000"
                                value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required
                            />
                        </div>
                        <div className="contact-form__field">
                            <label className="contact-form__label" htmlFor="cf-city">City *</label>
                            <input
                                id="cf-city" type="text" placeholder="Your city"
                                value={city} onChange={e => setCity(e.target.value)} required
                            />
                        </div>
                        <div className="contact-form__field contact-form__field--full">
                            <label className="contact-form__label" htmlFor="cf-msg">Message</label>
                            <textarea
                                id="cf-msg" rows={5} placeholder="Tell us about your shipment..."
                                value={message} onChange={e => setMessage(e.target.value)}
                            />
                        </div>

                        {/* Consent */}
                        <div className="contact-form__field contact-form__field--full contact-form__consent">
                            <input
                                type="checkbox" id="cf-consent"
                                checked={consent} onChange={e => setConsent(e.target.checked)} required
                            />
                            <label htmlFor="cf-consent">
                                By providing my phone number to "MO GLOBE TRUCKING CORP," I agree that MO
                                GLOBE TRUCKING may send text messages to my wireless phone number for any
                                purpose. Message &amp; data rates may apply. Reply "STOP" to opt out.{' '}
                                <Link to="/privacy" className="contact-form__privacy-link">
                                    Privacy Policy ↗
                                </Link>
                            </label>
                        </div>

                        {/* Status message */}
                        {status && (
                            <div className={`contact-form__field contact-form__field--full contact-status contact-status--${status}`}>
                                {status === 'success' ? '✓ ' : '✕ '}{statusMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <div className="contact-form__field contact-form__field--full">
                            <button type="submit" className="contact-form__submit" disabled={loading}>
                                {loading ? (
                                    <span className="contact-form__spinner" />
                                ) : (
                                    <>
                                        Send Message
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactsCom;