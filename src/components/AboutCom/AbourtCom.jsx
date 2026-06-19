import React, { useEffect, useRef } from 'react';
import './AboutCom.css';
import PageHero from '../PageHero/PageHero.jsx';
import Image1 from '../../../public/photo_2024-11-11_18-31-04.webp';
import Image2 from '../../../public/IMG_4627.webp';
import Image3 from '../../../public/photo_2024-11-12_11-57-03.webp';
import Image4 from '../../../public/IMG_4610.webp';

const sections = [
    {
        label: 'Who We Are',
        title: 'Welcome to MO GLOBE TRUCKING',
        img: Image1,
        description: `MO GLOBE TRUCKING is a powerful, reliable American carrier built on Reliability, strength, and tradition. We specialize in a diverse range of equipment — from Heavy Haul RGN (Lowboy) transport to dedicated Amazon Logistics fulfillment — and everything in between.\n\nWhether you need open-deck Flatbeds and Stepdecks, secure Dry Vans, temperature-controlled Reefers, or flexible Power Only service, our team delivers the dependable American Logistics solutions your business depends on.`,
        stats: [
            { number: '15+', label: 'Years in Business' },
            { number: '500+', label: 'Trucks in Fleet' },
            { number: '48', label: 'States Covered' },
        ],
    },
    {
        label: 'Our Edge',
        title: 'Why Choose Us?',
        img: Image2,
        description: `MO GLOBE TRUCKING stands out for its unwavering commitment to Reliability, Heavy Haul expertise, and exceptional customer care. From RGN Lowboys to Amazon Logistics, we run a diverse fleet that handles every freight challenge.`,
        features: [
            { icon: '⚡', title: 'Heavy Haul Ready', text: 'RGN Lowboy capability for oversized machinery, equipment, and high-clearance industrial loads.' },
            { icon: '👷', title: 'Experienced Professionals', text: 'Skilled American drivers and logistics experts trained on every trailer type we operate.' },
            { icon: '📡', title: 'Full-Spectrum Equipment', text: 'Flatbed, Stepdeck, Dry Van, Reefer, and Power Only — one carrier, every solution.' },
            { icon: '🔧', title: 'Amazon Network Approved', text: 'Compliant, on-time fulfillment within dedicated Amazon Logistics lanes.' },
        ],
    },
    {
        label: 'What We Offer',
        title: 'Our Services Include',
        img: Image4,
        services: [
            { title: 'Heavy Haul — RGN (Lowboy)', text: 'Specialized transport for oversized machinery, construction equipment, and high-clearance loads.' },
            { title: 'Open Deck — Stepdeck & Flatbed', text: 'Versatile open-deck hauling for construction materials, steel, and industrial freight.' },
            { title: 'Enclosed — Dry Van & Reefer', text: 'Secure dry van freight and temperature-controlled reefer service for perishables and pharma.' },
            { title: 'Specialized — Power Only & Amazon Logistics', text: 'Flexible Power Only tractor service plus dedicated Amazon network fulfillment lanes.' },
        ],
    },
    {
        label: 'Get Started',
        title: 'Ready to Move Forward?',
        img: Image3,
        description: `At MO GLOBE TRUCKING, we are committed to being your trusted partner in American Logistics. From Heavy Haul RGN moves to Amazon fulfillment, our diverse fleet delivers Reliability on every lane.\n\nContact us today for a free quote and put a powerful, full-service American carrier behind your freight.`,
        cta: true,
    },
];

const AboutCom = () => {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('about-section--visible');
                    }
                });
            },
            { threshold: 0.12 }
        );
        sectionRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            {/* Page Hero Banner */}
            <PageHero
                eyebrow="Our Story"
                title={<>Built on <em>Trust</em>, Driven by Results.</>}
                subtitle="A powerful American carrier moving freight across all 48 states — with the equipment, people, and reliability your business runs on."
            />

            {/* Content Sections */}
            <div className="about-sections">
                {sections.map((sec, i) => (
                    <div
                        key={i}
                        className={`about-section about-section--${i % 2 === 0 ? 'normal' : 'reverse'}`}
                        ref={(el) => (sectionRefs.current[i] = el)}
                    >
                        {/* Image column */}
                        <div className="about-section__img-wrap">
                            <img src={sec.img} alt={sec.title} className="about-section__img" />
                            <div className="about-section__img-overlay" />
                            {/* Gold corner accent */}
                            <div className="about-section__img-corner" />
                        </div>

                        {/* Text column */}
                        <div className="about-section__body">
                            <span className="about-section__label">
                                <span className="about-section__label-line" />
                                {sec.label}
                            </span>

                            <h2 className="about-section__title">{sec.title}</h2>
                            <div className="about-section__gold-bar" />

                            {sec.description && (
                                <p className="about-section__desc">{sec.description}</p>
                            )}

                            {/* Stats row (section 0) */}
                            {sec.stats && (
                                <div className="about-stats">
                                    {sec.stats.map((s, si) => (
                                        <div key={si} className="about-stat">
                                            <span className="about-stat__number">{s.number}</span>
                                            <span className="about-stat__label">{s.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Feature list (section 1) */}
                            {sec.features && (
                                <ul className="about-features">
                                    {sec.features.map((f, fi) => (
                                        <li key={fi} className="about-feature">
                                            <span className="about-feature__icon">{f.icon}</span>
                                            <div>
                                                <strong className="about-feature__title">{f.title}</strong>
                                                <p className="about-feature__text">{f.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Services list (section 2) */}
                            {sec.services && (
                                <ul className="about-services">
                                    {sec.services.map((sv, si) => (
                                        <li key={si} className="about-service-item">
                                            <span className="about-service-item__num">0{si + 1}</span>
                                            <div>
                                                <strong className="about-service-item__title">{sv.title}</strong>
                                                <p className="about-service-item__text">{sv.text}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* CTA (section 3) */}
                            {sec.cta && (
                                <div className="about-cta-row">
                                    <a href="/contact" className="about-cta-btn about-cta-btn--primary">
                                        Get a Free Quote
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" strokeWidth="2.5"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                    <a href="/services" className="about-cta-btn about-cta-btn--outline">
                                        Our Services
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutCom;