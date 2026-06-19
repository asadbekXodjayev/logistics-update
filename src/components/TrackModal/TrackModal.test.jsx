import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TrackModal from './TrackModal';

describe('TrackModal', () => {
    it('renders nothing when closed', () => {
        render(<TrackModal open={false} onClose={() => { }} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders the dialog and its fields when open', () => {
        render(<TrackModal open={true} onClose={() => { }} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        expect(screen.getByLabelText(/Load \/ Cargo Number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Company Name/i)).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', async () => {
        const onClose = vi.fn();
        render(<TrackModal open={true} onClose={onClose} />);
        await userEvent.click(screen.getByLabelText(/close dialog/i));
        expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when Escape is pressed', async () => {
        const onClose = vi.fn();
        render(<TrackModal open={true} onClose={onClose} />);
        await userEvent.keyboard('{Escape}');
        expect(onClose).toHaveBeenCalled();
    });
});
