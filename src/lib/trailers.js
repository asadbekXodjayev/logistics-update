// ============================================================
// Single source of truth for the equipment / trailer types.
// Used by the home page, the /services page, and the Quote form
// dropdown so the list never drifts out of sync.
// ============================================================
export const TRAILERS = [
    {
        id: 'dry-van',
        name: 'Dry Van',
        tagline: 'Enclosed, general freight',
        description:
            'Fully enclosed trailers for general palletized and boxed freight — secure, weather-protected, and ideal for the bulk of dry goods moving across the country.',
    },
    {
        id: 'reefer',
        name: 'Reefer',
        tagline: 'Temperature-controlled',
        description:
            'Refrigerated units that hold precise temperatures end to end — built for perishables, pharmaceuticals, and produce that can\'t afford a break in the cold chain.',
    },
    {
        id: 'stepdeck',
        name: 'Stepdeck',
        tagline: 'Oversized / taller freight',
        description:
            'A lowered rear deck gives extra vertical clearance for taller loads that won\'t legally fit on a standard flatbed — with easy ramp loading built in.',
    },
    {
        id: 'flatbed',
        name: 'Flatbed',
        tagline: 'Open-deck, easy-load cargo',
        description:
            'An open platform for top-, side-, and rear-loaded freight — steel, lumber, building materials, and machinery that needs crane or forklift access.',
    },
    {
        id: 'rgn',
        name: 'RGN',
        tagline: 'Heavy / over-dimensional equipment',
        description:
            'Removable-gooseneck lowboys that drop to a drive-on deck height — the right call for heavy-haul and over-dimensional equipment that rides low and wide.',
    },
    {
        id: 'power-only',
        name: 'Power Only',
        tagline: 'We supply the tractor for your trailer',
        description:
            'Just need horsepower? We provide the tractor and driver for your pre-loaded trailer — flexible capacity exactly when you need it, without a full equipment lease.',
    },
];

/** Convenience list of names for <select> menus. */
export const TRAILER_NAMES = TRAILERS.map((t) => t.name);
