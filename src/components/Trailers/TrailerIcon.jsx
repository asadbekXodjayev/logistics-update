// ============================================================
// Trailer-type icons — uses the SVG files in public/icons/.
// The files are monochrome, so we render them as a CSS mask and
// fill with currentColor (the card's blue accent) to stay on-brand.
// Filenames are case-sensitive (matches the files on disk).
// ============================================================
import React from 'react';

const FILES = {
    'dry-van': 'dry_van.svg',
    reefer: 'reefer.svg',
    flatbed: 'flat_bed.svg',
    stepdeck: 'steep_deck.svg',
    rgn: 'RGN.svg',
    'power-only': 'power_only.svg',
};

export default function TrailerIcon({ type, size = 88 }) {
    const file = FILES[type] || FILES['dry-van'];
    const url = `/icons/${file}`;

    return (
        <span
            className="trailer-icon"
            aria-hidden="true"
            style={{
                width: size,
                height: size,
                WebkitMaskImage: `url("${url}")`,
                maskImage: `url("${url}")`,
            }}
        />
    );
}
