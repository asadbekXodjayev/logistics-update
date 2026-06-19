// ============================================================
// Shared Telegram Bot API helper.
//
// Credentials are read from Vite env vars (see .env.local / .env.example).
// NOTE: VITE_* vars are inlined into the client bundle at build time, so
// these are not runtime-secret. They live in env only to keep them out of
// source control. Rotate the token in BotFather if it is ever abused.
// ============================================================
import axios from 'axios';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

const API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

function assertConfigured() {
    if (!BOT_TOKEN || !CHAT_ID) {
        throw new Error(
            'Telegram is not configured. Set VITE_TELEGRAM_BOT_TOKEN and ' +
            'VITE_TELEGRAM_CHAT_ID in .env.local, then restart the dev server.'
        );
    }
}

/**
 * Send a plain-text message to the configured Telegram chat.
 * @param {string} text
 * @returns {Promise<object>} the Telegram API response payload
 */
export async function sendTelegramMessage(text) {
    assertConfigured();
    const res = await axios.post(`${API_BASE}/sendMessage`, {
        chat_id: CHAT_ID,
        text,
    });
    if (!res.data?.ok) {
        throw new Error('Telegram API responded with an error.');
    }
    return res.data;
}

/**
 * Send a document (file) with a caption to the configured Telegram chat.
 * @param {File} file
 * @param {string} caption
 * @returns {Promise<object>}
 */
export async function sendTelegramDocument(file, caption) {
    assertConfigured();
    const formData = new FormData();
    formData.append('document', file);
    const res = await axios.post(`${API_BASE}/sendDocument`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        params: { chat_id: CHAT_ID, caption },
    });
    if (!res.data?.ok) {
        throw new Error('Telegram API responded with an error.');
    }
    return res.data;
}
