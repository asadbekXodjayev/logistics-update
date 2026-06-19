import React, { useState } from 'react';
import './JobCom.css';
import { Link } from 'react-router-dom';
import { sendTelegramMessage, sendTelegramDocument } from '../../lib/telegram';

const JobCom = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userType, setUserType] = useState('Company Driver');
    const [additionalContact, setAdditionalContact] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [consent, setConsent] = useState(false);
    const [status, setStatus] = useState(''); // 'success' | 'error' | ''
    const [statusMsg, setStatusMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const caption = `🧑‍✈️ Driver Application\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nJob Type: ${userType}${additionalContact ? `\nAdditional Contact: ${additionalContact}` : ''}\nMessage: ${message}`;

        try {
            if (file) {
                await sendTelegramDocument(file, caption);
            } else {
                await sendTelegramMessage(caption);
            }
            setStatus('success');
            setStatusMsg('Application submitted! We\'ll be in touch shortly.');
            setName(''); setEmail(''); setPhoneNumber('');
            setAdditionalContact(''); setMessage(''); setFile(null); setConsent(false);
        } catch {
            setStatus('error');
            setStatusMsg('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-page">

            {/* ── Hero banner ─────────────────────────── */}
            <div className="job-hero">
                <div className="job-hero__overlay" />
                <div className="job-hero__content">
                    <span className="job-hero__label">
                        <span className="job-hero__label-line" />
                        Join Our Team
                    </span>
                    <h1 className="job-hero__title">
                        Drive With <span className="job-hero__accent">Purpose.</span>
                    </h1>
                    <p className="job-hero__sub">
                        Apply today and become part of a team that moves America forward.
                    </p>
                </div>
                <div className="job-hero__diagonal" />
            </div>

            {/* ── Body: side info + form ───────────────── */}
            <div className="job-body">

                {/* Side panel */}
                <aside className="job-side">
                    <span className="job-side__label">
                        <span className="job-side__label-line" />
                        Why Drive With Us
                    </span>
                    <h2 className="job-side__title">
                        Great Pay.<br />
                        <span className="job-side__accent">Better Miles.</span>
                    </h2>
                    <div className="job-side__bar" />
                    <p className="job-side__desc">
                        Whether you're a Company Driver or Owner Operator, MO Globe Trucking
                        offers competitive pay, steady miles, and a team that has your back.
                    </p>
                    <ul className="job-side__perks">
                        {[
                            { icon: '💰', text: 'Competitive pay & bonuses' },
                            { icon: '🛣️', text: 'Consistent, long-haul miles' },
                            { icon: '🏥', text: 'Health benefits available' },
                            { icon: '📡', text: '24/7 dispatch support' },
                            { icon: '🔧', text: 'Fleet maintenance covered' },
                            { icon: '📋', text: 'CDL not required to apply' },
                        ].map((p, i) => (
                            <li key={i} className="job-side__perk">
                                <span className="job-side__perk-icon">{p.icon}</span>
                                {p.text}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Application form */}
                <form className="job-form" onSubmit={handleSubmit} noValidate>
                    <h3 className="job-form__heading">Application Form</h3>
                    <div className="job-form__bar" />

                    <div className="job-form__grid">

                        {/* Full name */}
                        <div className="job-form__field">
                            <label className="job-form__label" htmlFor="jf-name">
                                Full Name <span className="job-form__required">*</span>
                            </label>
                            <input id="jf-name" type="text" placeholder="John Smith"
                                value={name} onChange={e => setName(e.target.value)} required />
                        </div>

                        {/* Email */}
                        <div className="job-form__field">
                            <label className="job-form__label" htmlFor="jf-email">Email</label>
                            <input id="jf-email" type="email" placeholder="john@email.com"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        {/* Phone */}
                        <div className="job-form__field">
                            <label className="job-form__label" htmlFor="jf-phone">
                                Phone Number <span className="job-form__required">*</span>
                            </label>
                            <input id="jf-phone" type="tel" placeholder="(000) 000-0000"
                                value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required />
                        </div>

                        {/* Job type */}
                        <div className="job-form__field">
                            <label className="job-form__label" htmlFor="jf-type">Position</label>
                            <select id="jf-type" value={userType} onChange={e => setUserType(e.target.value)}>
                                <option value="Company Driver">Company Driver</option>
                                <option value="Owner Operator">Owner Operator</option>
                            </select>
                        </div>

                        {/* Additional contact */}
                        <div className="job-form__field job-form__field--full">
                            <label className="job-form__label" htmlFor="jf-extra">
                                Additional Contact <span className="job-form__optional">(Optional)</span>
                            </label>
                            <input id="jf-extra" type="text" placeholder="LinkedIn, Telegram, etc."
                                value={additionalContact} onChange={e => setAdditionalContact(e.target.value)} />
                        </div>

                        {/* CDL upload */}
                        <div className="job-form__field job-form__field--full">
                            <label className="job-form__label" htmlFor="jf-file">
                                Upload CDL <span className="job-form__optional">(Optional — PDF, DOC, TXT)</span>
                            </label>
                            <div className="job-form__file-wrap">
                                <label htmlFor="jf-file" className="job-form__file-label">
                                    {file ? `📎 ${file.name}` : '+ Choose File'}
                                </label>
                                <input id="jf-file" type="file" accept=".pdf,.doc,.docx,.txt"
                                    onChange={e => setFile(e.target.files[0])} />
                            </div>
                        </div>

                        {/* Message */}
                        <div className="job-form__field job-form__field--full">
                            <label className="job-form__label" htmlFor="jf-msg">Message</label>
                            <textarea id="jf-msg" rows={4} placeholder="Tell us about your experience..."
                                value={message} onChange={e => setMessage(e.target.value)} />
                        </div>

                        {/* Consent */}
                        <div className="job-form__field job-form__field--full job-form__consent">
                            <input type="checkbox" id="jf-consent"
                                checked={consent} onChange={e => setConsent(e.target.checked)} required />
                            <label htmlFor="jf-consent">
                                By providing my phone number to "MO GLOBE TRUCKING CORP," I agree that MO
                                GLOBE TRUCKING may send text messages to my wireless phone number. Message &amp;
                                data rates may apply. Reply "STOP" to opt out.{' '}
                                <Link to="/privacy" className="job-form__privacy-link">Privacy Policy ↗</Link>
                            </label>
                        </div>

                        {/* Status */}
                        {status && (
                            <div className={`job-form__field job-form__field--full job-status job-status--${status}`}>
                                {status === 'success' ? '✓ ' : '✕ '}{statusMsg}
                            </div>
                        )}

                        {/* Submit */}
                        <div className="job-form__field job-form__field--full">
                            <button type="submit" className="job-form__submit" disabled={loading}>
                                {loading ? (
                                    <span className="job-form__spinner" />
                                ) : (
                                    <>
                                        Submit Application
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

export default JobCom;