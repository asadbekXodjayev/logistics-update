// Lightweight fallback shown while a lazy-loaded route chunk downloads.
import React from 'react';
import './RouteFallback.css';

export default function RouteFallback() {
    return (
        <div className="route-fallback" role="status" aria-label="Loading">
            <span className="route-fallback__spinner" />
        </div>
    );
}
