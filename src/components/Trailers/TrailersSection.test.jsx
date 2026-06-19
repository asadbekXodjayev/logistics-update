import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import TrailersSection from './TrailersSection';
import { TRAILERS } from '../../lib/trailers';

const renderSection = () =>
    render(
        <MemoryRouter>
            <TrailersSection />
        </MemoryRouter>
    );

describe('TrailersSection', () => {
    it('renders a card heading for every trailer type', () => {
        renderSection();
        for (const t of TRAILERS) {
            expect(screen.getByRole('heading', { name: t.name })).toBeInTheDocument();
        }
    });

    it('renders the section title and a quote CTA', () => {
        renderSection();
        expect(screen.getByText(/Trailers We/i)).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /request a quote/i })).toBeInTheDocument();
    });
});
