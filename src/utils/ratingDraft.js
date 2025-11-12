// utils/ratingDraft.js
const PREFIX = "idiomo:ratingDraft:";       // ключи вида idiomo:ratingDraft:<idiomId>
const TTL = 24 * 60 * 60 * 1000;            // живёт 24 часа

export function saveDraft(idiomId, data) {
  try {
    const payload = { v: 1, data, exp: Date.now() + TTL };
    localStorage.setItem(PREFIX + idiomId, JSON.stringify(payload));
  } catch {}
}

export function loadDraft(idiomId) {
  try {
    const raw = localStorage.getItem(PREFIX + idiomId);
    if (!raw) return null;
    const { data, exp } = JSON.parse(raw);
    if (exp && Date.now() > exp) {
      localStorage.removeItem(PREFIX + idiomId);
      return null;
    }
    return data; // { rating, comment }
  } catch {
    return null;
  }
}

export function clearDraft(idiomId) {
  try { localStorage.removeItem(PREFIX + idiomId); } catch {}
}
