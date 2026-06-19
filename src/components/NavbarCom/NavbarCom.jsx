import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { faAlignJustify, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavbarCom.css';
import Logo from '/public/logo-white.svg';
import { useTrackModal } from '../TrackModal/TrackModalContext.jsx';

const NavbarCom = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { openTrack } = useTrackModal();

    // Detect scroll to add solid background when scrolled
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const isActive = (path) =>
        path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

    return (
        <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileMenuOpen ? ' navbar--open' : ''}`}>
            <div className="navbar__inner">
                {/* Logo */}
                <Link className="navbar__logo" to="/" aria-label="Home">
                    <img src={Logo} alt="Company Logo" />
                </Link>

                {/* Desktop nav links */}
                <nav className="navbar__nav" aria-label="Main navigation">
                    <ul className="navbar__list">
                        {[
                            { to: '/', label: 'Home' },
                            { to: '/about', label: 'About' },
                            { to: '/trucks', label: 'Trucks' },
                            { to: '/services', label: 'Services' },
                            { to: '/contact', label: 'Contact' },
                        ].map(({ to, label }) => (
                            <li key={to} className="navbar__item">
                                <Link
                                    to={to}
                                    className={`navbar__link${isActive(to) ? ' navbar__link--active' : ''}`}
                                >
                                    {label}
                                    <span className="navbar__link-bar" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* CTA + Burger */}
                <div className="navbar__right">
                    <button type="button" className="navbar__track" onClick={openTrack}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.2"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 7v5l3 2" />
                        </svg>
                        Track
                    </button>

                    <Link to="/apply" className="navbar__cta">
                        Apply Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>

                    <button
                        className="navbar__burger"
                        onClick={() => setMobileMenuOpen(o => !o)}
                        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={mobileMenuOpen}
                    >
                        <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faAlignJustify} />
                    </button>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`navbar__drawer${mobileMenuOpen ? ' navbar__drawer--open' : ''}`}>
                <ul className="navbar__drawer-list">
                    {[
                        { to: '/', label: 'Home' },
                        { to: '/about', label: 'About' },
                        { to: '/trucks', label: 'Trucks' },
                        { to: '/services', label: 'Services' },
                        { to: '/contact', label: 'Contact' },
                    ].map(({ to, label }, i) => (
                        <li key={to} className="navbar__drawer-item"
                            style={{ animationDelay: `${i * 0.06}s` }}>
                            <Link
                                to={to}
                                className={`navbar__drawer-link${isActive(to) ? ' navbar__drawer-link--active' : ''}`}
                            >
                                <span className="navbar__drawer-num">0{i + 1}</span>
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li className="navbar__drawer-item" style={{ animationDelay: '0.3s' }}>
                        <button
                            type="button"
                            className="navbar__drawer-cta navbar__drawer-cta--ghost"
                            onClick={openTrack}
                        >
                            Track Shipment →
                        </button>
                    </li>
                    <li className="navbar__drawer-item" style={{ animationDelay: '0.36s' }}>
                        <Link to="/quote" className="navbar__drawer-cta navbar__drawer-cta--ghost">
                            Request a Quote →
                        </Link>
                    </li>
                    <li className="navbar__drawer-item" style={{ animationDelay: '0.42s' }}>
                        <Link to="/apply" className="navbar__drawer-cta">
                            Apply Now →
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default NavbarCom;