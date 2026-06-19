import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import '../Pages.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <PageTransition>
        <div className="nf-page">
            <div className="nf-page__overlay" />
            <div className="nf-page__bg" />
            <div className="nf-page__inner">
                <div className="nf-page__label">
                    <span className="nf-page__line" />
                    <span>Error 404</span>
                </div>
                <h1 className="nf-page__code">
                    4<em>0</em>4
                </h1>
                <h2 className="nf-page__title">
                    Page <em>Not Found</em>
                </h2>
                <p className="nf-page__text">
                    The route you tried doesn't exist or has been moved. Let's get you back on track.
                </p>
                <div className="nf-page__actions">
                    <Link to="/" className="nf-btn nf-btn--primary">
                        Back to Home
                        <span className="nf-btn__arrow">→</span>
                    </Link>
                    <button
                        type="button"
                        className="nf-btn nf-btn--outline"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
        </PageTransition>
    );
};

export default NotFound;
