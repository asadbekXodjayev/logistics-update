import React from 'react';
import { Link } from 'react-router-dom';
import './FooterCom.css';
import Logo from '/public/logo-white.svg';
import { useTrackModal } from '../TrackModal/TrackModalContext.jsx';
import { TRAILERS } from '../../lib/trailers';
import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';

const pages = [
    { to: '/about', label: 'About Us' },
    { to: '/apply', label: 'Apply Now' },
    { to: '/trucks', label: 'Trucks' },
    { to: '/services', label: 'Services' },
    { to: '/quote', label: 'Request a Quote' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy' },
];

const services = TRAILERS.map((t) => ({ to: '/services', label: t.name }));

const Footer = () => {
    const { openTrack } = useTrackModal();

    return (
        <footer className="footer">
            {/* ── Gold top accent bar ───────────────────── */}
            <div className="footer__top-bar" />

            <div className="footer__inner">

                {/* ── Brand column ─────────────────────── */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo-link">
                        <img src={Logo} alt="MO Globe Trucking" className="footer__logo-img" />
                    </Link>
                    <p className="footer__tagline">
                        Streamlining Your Supply Chain,<br />
                        One Shipment at a Time.
                    </p>

                    {/* Contact details */}
                    <ul className="footer__contact-list">
                        <li className="footer__contact-item">
                            <span className="footer__contact-icon"><LuMail size={16} /></span>
                            <a href="mailto:info@moglobetrucking.com">info@moglobetrucking.com</a>
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__contact-icon"><LuPhone size={16} /></span>
                            <a href="tel:+15127870305">(512) 787-0305</a>
                        </li>
                        <li className="footer__contact-item">
                            <span className="footer__contact-icon"><LuMapPin size={16} /></span>
                            <span>5203 Golden Gate Dr,<br />Killeen, TX 76549</span>
                        </li>
                    </ul>
                </div>

                {/* ── Divider ───────────────────────────── */}
                <div className="footer__col-divider" />

                {/* ── Pages ────────────────────────────── */}
                <div className="footer__col">
                    <h3 className="footer__col-heading">
                        <span className="footer__col-heading-bar" />
                        Pages
                    </h3>
                    <ul className="footer__link-list">
                        {pages.map(({ to, label }) => (
                            <li key={to + label}>
                                <Link to={to} className="footer__link">
                                    <span className="footer__link-arrow">›</span>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── Services ─────────────────────────── */}
                <div className="footer__col">
                    <h3 className="footer__col-heading">
                        <span className="footer__col-heading-bar" />
                        Trailers
                    </h3>
                    <ul className="footer__link-list">
                        {services.map(({ to, label }) => (
                            <li key={label}>
                                <Link to={to} className="footer__link">
                                    <span className="footer__link-arrow">›</span>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ── CTA column ───────────────────────── */}
                <div className="footer__cta-col">
                    <h3 className="footer__col-heading">
                        <span className="footer__col-heading-bar" />
                        Ready to Ship?
                    </h3>
                    <p className="footer__cta-desc">
                        Get a free freight quote today — our team responds within 24 hours.
                    </p>
                    <Link to="/quote" className="footer__cta-btn">
                        Get a Free Quote
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                    <button type="button" onClick={openTrack} className="footer__track-btn">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.2"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                        Track Shipment
                    </button>
                    <Link to="/apply" className="footer__apply-btn">
                        Driver Apply Now
                    </Link>
                </div>
            </div>

            {/* ── Bottom bar ───────────────────────────── */}
            <div className="footer__bottom">
                <p className="footer__copyright">
                    © {new Date().getFullYear()} MO Globe Trucking Corp. All rights reserved.
                </p>
                <div className="footer__bottom-links">
                    <Link to="/privacy" className="footer__bottom-link">Privacy Policy</Link>
                    <span className="footer__bottom-sep">·</span>
                    <Link to="/contact" className="footer__bottom-link">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;