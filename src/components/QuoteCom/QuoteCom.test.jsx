import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import QuoteCom from './QuoteCom';

// Force the Telegram send to fail so we can assert the error path.
vi.mock('../../lib/telegram', () => ({
    sendTelegramMessage: vi.fn(() => Promise.reject(new Error('network down'))),
}));

describe('QuoteCom', () => {
    it('lists all six trailer types plus a placeholder in the dropdown', () => {
        render(<QuoteCom />);
        const select = screen.getByLabelText(/type of trailer/i);
        expect(select.querySelectorAll('option')).toHaveLength(7);
    });

    it('shows an error message when the submission fails', async () => {
        render(<QuoteCom />);
        await userEvent.type(screen.getByLabelText(/from \(city/i), 'Austin, TX');
        await userEvent.type(screen.getByLabelText(/to \(city/i), 'Dallas, TX');
        await userEvent.selectOptions(screen.getByLabelText(/type of trailer/i), 'Dry Van');
        await userEvent.type(screen.getByLabelText(/full name/i), 'John Smith');
        await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
        await userEvent.type(screen.getByLabelText(/phone/i), '5125551234');
        await userEvent.click(screen.getByRole('button', { name: /request quote/i }));

        await waitFor(() =>
            expect(screen.getByText(/error occurred/i)).toBeInTheDocument()
        );
    });
});
