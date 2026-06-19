import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

function Boom() {
    throw new Error('boom');
}

describe('ErrorBoundary', () => {
    it('renders children when there is no error', () => {
        render(
            <ErrorBoundary>
                <p>safe content</p>
            </ErrorBoundary>
        );
        expect(screen.getByText('safe content')).toBeInTheDocument();
    });

    it('renders the fallback when a child throws', () => {
        // Silence the expected React error log for this test.
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });
        render(
            <ErrorBoundary>
                <Boom />
            </ErrorBoundary>
        );
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByRole('heading')).toHaveTextContent(/bump in the road/i);
        expect(screen.getByRole('button', { name: /back to home/i })).toBeInTheDocument();
        spy.mockRestore();
    });
});
