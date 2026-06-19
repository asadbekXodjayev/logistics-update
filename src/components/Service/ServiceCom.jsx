// ServiceCom.jsx — /services page. Content is driven by the shared
// trailer list so it stays in sync with the home page & quote form.
import React from 'react';
import { Link } from 'react-router-dom';
import './ServiceCom.css';
import { TRAILERS } from '../../lib/trailers';
import PageHero from '../PageHero/PageHero';
import PageTransition from '../Motion/PageTransition';
import { Reveal } from '../Motion/Reveal';
import { slideInLeft, slideInRight } from '../../lib/motion';

const ServiceCom = () => {
    return (
        <PageTransition>
            <div className="svc-page">
                <PageHero
                    eyebrow="What We Haul"
                    title={<>Trailers We <em>Work With</em></>}
                    subtitle="Six equipment types, one dependable team — matched to your freight, your timeline, and your lane."
                />

                <section className="svc-list">
                    {TRAILERS.map((trailer, index) => {
                        const reversed = index % 2 === 1;
                        return (
                            <Reveal
                                as="article"
                                key={trailer.id}
                                className={`svc-row ${reversed ? 'svc-row--reverse' : ''}`}
                                variants={reversed ? slideInRight : slideInLeft}
                            >
                                <div className="svc-row__media">
                                    <div className="svc-row__image" />
                                    <span className="svc-row__corner svc-row__corner--h" />
                                    <span className="svc-row__corner svc-row__corner--v" />
                                </div>
                                <div className="svc-row__body">
                                    <div className="svc-row__label">
                                        <span className="svc-row__line" />
                                        <span>Equipment {String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <h2 className="svc-row__title">{trailer.name}</h2>
                                    <span className="svc-row__bar" />
                                    <p className="svc-row__desc">{trailer.description}</p>
                                    <Link to="/quote" className="btn btn-secondary">
                                        Request a Quote
                                        <span className="svc-btn__arrow">→</span>
                                    </Link>
                                </div>
                            </Reveal>
                        );
                    })}
                </section>

                <section className="svc-cta">
                    <h2 className="svc-cta__title">
                        Ready to Move Your <em>Freight</em>?
                    </h2>
                    <p className="svc-cta__text">
                        Talk to our dispatch team and get a tailored solution for your lane.
                    </p>
                    <Link to="/quote" className="btn btn-primary">
                        Request a Quote
                        <span className="svc-btn__arrow">→</span>
                    </Link>
                </section>
            </div>
        </PageTransition>
    );
};

export default ServiceCom;
