import React from 'react';
import { Link } from 'react-router-dom';
import { LuCheck } from 'react-icons/lu';
import './JobCom.css';

const offers = [
    {
        to: '/quote',
        role: 'Shipper',
        tag: 'Ship With Us',
        icon: '/icons/noun-shipping-8235379.svg',
        color: 'shipper',
        perks: ['Manage inventory & schedules', 'End-to-end logistics support', 'Real-time shipment tracking'],
        desc: 'Coordinate and oversee the logistics of transporting goods. Handle shipment schedules and ensure freight reaches its destination safely and on time.',
        cta: 'Get a Quote →',
    },
    {
        to: '/apply',
        role: 'Driver',
        tag: 'Apply Now',
        icon: '/icons/noun-truck-driver-7123793.svg',
        color: 'driver',
        perks: ['Competitive pay & bonuses', 'Consistent long-haul miles', '24/7 dispatch support'],
        desc: 'Safely transport freight across various locations. Keep cargo secure, follow all regulations, and deliver excellent service on every run.',
        cta: 'Apply Now →',
    },
];

const JobOfferCom = () => {
    return (
        <div className="job-offers">

            {/* Section header */}
            <div className="job-offers__header">
                <span className="job-offers__label">
                    <span className="job-offers__label-line" />
                    Opportunities
                </span>
                <h2 className="job-offers__title">
                    Two Ways to <span className="job-offers__accent">Work With Us</span>
                </h2>
                <div className="job-offers__bar" />
                <p className="job-offers__sub">
                    Whether you move freight or drive it — we have a place for you.
                </p>
            </div>

            {/* Cards */}
            <div className="job-offers__grid">
                {offers.map((offer) => (
                    <div key={offer.role} className={`job-offer-card job-offer-card--${offer.color}`}>
                        {/* Top gold tag */}
                        <div className="job-offer-card__tag">{offer.tag}</div>

                        {/* Icon */}
                        <div className="job-offer-card__icon-wrap">
                            <div className="job-offer-card-circle">
                                <span
                                    className="job-offer-icon"
                                    aria-hidden="true"
                                    style={{
                                        WebkitMaskImage: `url("${offer.icon}")`,
                                        maskImage: `url("${offer.icon}")`,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Role title */}
                        <h3 className="job-offer-card__role">{offer.role}</h3>
                        <div className="job-offer-card__bar" />

                        {/* Description */}
                        <p className="job-offer-card__desc">{offer.desc}</p>

                        {/* Perks */}
                        <ul className="job-offer-card__perks">
                            {offer.perks.map((p, i) => (
                                <li key={i} className="job-offer-card__perk">
                                    <span className="job-offer-card__check"><LuCheck size={12} /></span>
                                    {p}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <Link to={offer.to} className="btn btn-primary job-offer-card__cta">
                            {offer.cta}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobOfferCom;