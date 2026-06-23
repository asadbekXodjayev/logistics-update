// ============================================================
// Admin credentials, sourced from env (VITE_*). Imported by the
// login page and the ProtectedRoute guard so the two never drift.
//
// IMPORTANT: this is a client-only demo gate. Vite inlines every
// VITE_* variable into the shipped bundle at build time, so these
// values are NOT secret at runtime — anyone can read them in the
// browser. Moving them to env only keeps them out of source
// control / git history. For real protection, authenticate
// server-side and never ship the password to the client.
// ============================================================

export const ADMIN_LOGIN = import.meta.env.VITE_ADMIN_LOGIN;
export const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

// Token written to localStorage on login and compared by ProtectedRoute.
export const AUTH_TOKEN = btoa(`${ADMIN_LOGIN}:${ADMIN_PASSWORD}`);
