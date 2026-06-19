import { describe, it, expect } from 'vitest';
import { TRAILERS, TRAILER_NAMES } from './trailers';

describe('trailers data', () => {
    it('defines exactly six trailer types', () => {
        expect(TRAILERS).toHaveLength(6);
    });

    it('every trailer has id, name, tagline and description', () => {
        for (const t of TRAILERS) {
            expect(t.id).toBeTruthy();
            expect(t.name).toBeTruthy();
            expect(t.tagline).toBeTruthy();
            expect(t.description).toBeTruthy();
        }
    });

    it('has unique ids', () => {
        const ids = TRAILERS.map((t) => t.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('TRAILER_NAMES mirrors the trailer names', () => {
        expect(TRAILER_NAMES).toEqual(TRAILERS.map((t) => t.name));
    });
});
