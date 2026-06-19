import React, { useEffect, useState } from "react";
import "./HomeCom.css";

const HomeCom = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = "/pexels-lkloeppel-577696-.webp";
        img.onload = () => setLoaded(true);
        // Fallback: show even if image fails
        img.onerror = () => setLoaded(true);
    }, []);

    return (
        <section className={`hero${loaded ? " hero--loaded" : ""}`}>
            {/* Dark overlay */}
            <div className="hero__overlay" />

            {/* Gold diagonal accent bar */}
            <div className="hero__gold-bar" />

            {/* Content */}
            <div className="hero__content">
                <div className="hero__label">
                    <span className="hero__label-line" />
                    Trusted Freight Solutions
                </div>

                <h1 className="hero__title">
                    Moving Your <br />
                    <span className="hero__title-accent">Cargo Forward</span><br />
                    — Every Mile.
                </h1>

                <p className="hero__subtitle">
                    Reliable, safe, and on-time trucking services across the country.
                    Your freight is our mission.
                </p>

                <div className="hero__actions">
                    <a href="/apply" className="btn btn-primary">
                        Drive With Us
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                    <a href="/services" className="btn btn-secondary">
                        Our Services
                    </a>
                </div>

                {/* Stats row */}
                <div className="hero__stats">
                    <div className="hero__stat">
                        <span className="hero__stat-number">15+</span>
                        <span className="hero__stat-label">Years Experience</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-number">500+</span>
                        <span className="hero__stat-label">Trucks in Fleet</span>
                    </div>
                    <div className="hero__stat-divider" />
                    <div className="hero__stat">
                        <span className="hero__stat-number">48</span>
                        <span className="hero__stat-label">States Covered</span>
                    </div>
                </div>
            </div>

            {/* Diagonal bottom cut */}
            <div className="hero__diagonal" />
        </section>
    );
};

export default HomeCom;