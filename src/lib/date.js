// ============================================================
// Date formatting helpers. This is a US-based logistics site,
// so every user-facing date uses the American month-first order:
// MM.DD.YYYY — never DD.MM.YYYY.
// ============================================================

const MONTHS_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Pull the year / month / day parts out of an ISO date string
 * ("2026-06-23" or a full timestamp) without timezone drift.
 * Returns null when the input is missing or malformed.
 */
const parseISODate = (value) => {
    if (!value || typeof value !== 'string') return null;
    const match = value.slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [, year, month, day] = match;
    return { year, month, day };
};

/**
 * American numeric date: MM.DD.YYYY (e.g. "06.23.2026").
 */
export const formatDateUS = (value) => {
    const parts = parseISODate(value);
    if (!parts) return '';
    return `${parts.month}.${parts.day}.${parts.year}`;
};

/**
 * Calendar-badge parts: a big day number plus a short month label
 * (e.g. { day: '23', month: 'Jun' }) for the news card date stamp.
 * Returns null when the input can't be parsed.
 */
export const formatDateBadge = (value) => {
    const parts = parseISODate(value);
    if (!parts) return null;
    return {
        day: parts.day,
        month: MONTHS_SHORT[Number(parts.month) - 1] ?? parts.month,
        year: parts.year,
    };
};
