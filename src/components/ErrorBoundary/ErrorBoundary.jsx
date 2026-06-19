// ============================================================
// App-wide error boundary. Catches render-time errors anywhere in
// the tree and shows a branded fallback instead of a white screen.
// ============================================================
import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Surface for debugging; in production this is where a logging
        // service (Sentry, etc.) would be wired in.
        console.error('Uncaught UI error:', error, info);
    }

    handleReload = () => {
        this.setState({ hasError: false });
        window.location.assign('/');
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="errbound" role="alert">
                    <div className="errbound__inner">
                        <span className="errbound__label">
                            <span className="errbound__line" />
                            Something went wrong
                        </span>
                        <h1 className="errbound__title">
                            We hit a <em>bump</em> in the road.
                        </h1>
                        <p className="errbound__text">
                            An unexpected error occurred. Please head back to the
                            home page — if it keeps happening, contact our team.
                        </p>
                        <button type="button" className="errbound__btn" onClick={this.handleReload}>
                            Back to Home
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
