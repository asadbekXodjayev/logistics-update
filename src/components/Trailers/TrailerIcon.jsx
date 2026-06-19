// ============================================================
// Trailer-type icons sourced from react-icons (real, open-source
// icon sets — Font Awesome 6 + Game Icons). Fill uses currentColor
// so each icon inherits the surrounding text color.
// ============================================================
import React from 'react';
import {
    FaTruck,        // box delivery truck  -> Dry Van
    FaTruckMoving,  // box / moving van    -> Reefer
    FaTrailer,      // trailer / deck      -> Stepdeck
    FaTruckRampBox, // drive-on ramp       -> RGN (lowboy)
    FaTruckFront,   // cab only            -> Power Only
} from 'react-icons/fa6';
import { GiFlatbed } from 'react-icons/gi'; // real flatbed truck -> Flatbed

const ICONS = {
    'dry-van': FaTruck,
    reefer: FaTruckMoving,
    flatbed: GiFlatbed,
    stepdeck: FaTrailer,
    rgn: FaTruckRampBox,
    'power-only': FaTruckFront,
};

export default function TrailerIcon({ type, size = 44 }) {
    const Icon = ICONS[type] || FaTruck;
    return <Icon size={size} aria-hidden="true" focusable="false" />;
}
