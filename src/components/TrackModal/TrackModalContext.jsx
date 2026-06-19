// ============================================================
// Provides a global openTrack()/closeTrack() and mounts the
// single TrackModal instance. Wrap the app once with this.
// ============================================================
import React, { createContext, useCallback, useContext, useState } from 'react';
import TrackModal from './TrackModal';

const TrackModalContext = createContext({ openTrack: () => { }, closeTrack: () => { } });

export const useTrackModal = () => useContext(TrackModalContext);

export function TrackModalProvider({ children }) {
    const [open, setOpen] = useState(false);
    const openTrack = useCallback(() => setOpen(true), []);
    const closeTrack = useCallback(() => setOpen(false), []);

    return (
        <TrackModalContext.Provider value={{ openTrack, closeTrack }}>
            {children}
            <TrackModal open={open} onClose={closeTrack} />
        </TrackModalContext.Provider>
    );
}
