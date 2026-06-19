import '@testing-library/jest-dom';
import { vi } from 'vitest';

// jsdom doesn't implement these, but framer-motion (useReducedMotion,
// whileInView) reaches for them — provide no-op polyfills.
if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
}

if (!window.IntersectionObserver) {
    class IO {
        constructor(cb) { this.cb = cb; }
        observe() { }
        unobserve() { }
        disconnect() { }
        takeRecords() { return []; }
    }
    window.IntersectionObserver = IO;
    global.IntersectionObserver = IO;
}
