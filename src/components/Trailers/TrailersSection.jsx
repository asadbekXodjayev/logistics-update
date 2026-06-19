// ============================================================
// "Trailers We Work With" — reusable equipment grid.
// Rendered on the home page and on the /services page.
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Stagger, StaggerItem } from '../Motion/Reveal';
import { TRAILERS } from '../../lib/trailers';
import TrailerIcon from './TrailerIcon';
import './TrailersSection.css';

export default function TrailersSection({
    eyebrow = 'Our Fleet',
    subtitle = 'Six equipment types to match any freight — from dry boxes to heavy-haul lowboys.',
    showCta = true,
    theme = 'light',
}) {
    return (
        <section className={`trailers trailers--${theme}`}>
            <div className="trailers__inner">
                <Reveal className="trailers__header">
                    <span className="trailers__label">
                        <span className="trailers__line" />
                        {eyebrow}
                    </span>
                    <h2 className="trailers__title">
                        Trailers We <em>Work With</em>
                    </h2>
                    <p className="trailers__subtitle">{subtitle}</p>
                </Reveal>

                <Stagger className="trailers__grid" stagger={0.09}>
                    {TRAILERS.map((t, i) => (
                        <StaggerItem as="article" key={t.id} className="trailer-card">
                            <span className="trailer-card__num">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="trailer-card__icon">
                                <TrailerIcon type={t.id} />
                            </div>
                            <h3 className="trailer-card__title">{t.name}</h3>
                            <p className="trailer-card__tagline">{t.tagline}</p>
                            <span className="trailer-card__bar" />
                        </StaggerItem>
                    ))}
                </Stagger>

                {showCta && (
                    <Reveal className="trailers__cta">
                        <Link to="/quote" className="btn btn-primary">
                            Request a Quote
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
