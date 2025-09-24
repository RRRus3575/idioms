// src/utils/lang.js
const LANG_ALIASES = {
  en: ['en', 'en-us', 'english', 'английский', 'англійська', 'inglés', 'anglais'],
  de: ['de', 'de-de', 'german', 'deutsch', 'немецкий', 'німецька', 'alemán', 'allemand'],
  uk: ['uk', 'uk-ua', 'ukrainian', 'українська', 'украинский'],
  es: ['es', 'es-es', 'spanish', 'español', 'испанский', 'іспанська'],
  fr: ['fr', 'fr-fr', 'french', 'français', 'французский', 'французька'],
  pl: ['pl', 'pl-pl', 'polish', 'polski', 'польский', 'польська'],
  it: ['it', 'it-it', 'italian', 'italiano', 'итальянский', 'італійська'],
  pt: ['pt', 'pt-pt', 'pt-br', 'portuguese', 'português', 'португальский'],
  zh: ['zh', 'zh-cn', 'zh-hans', 'chinese', '中文', 'китайский', 'китайська'],
  ja: ['ja', 'ja-jp', 'japanese', '日本語'],
  ko: ['ko', 'ko-kr', 'korean', '한국어'],
  ar: ['ar', 'ar-sa', 'arabic', 'العربية'],
  hi: ['hi', 'hi-in', 'hindi', 'हिन्दी'],
};

export const DISPLAY_NAMES = {
  en: 'English', de: 'German', uk: 'Ukrainian', es: 'Spanish', fr: 'French',
  pl: 'Polish', it: 'Italian', pt: 'Portuguese', zh: 'Chinese', ja: 'Japanese',
  ko: 'Korean', ar: 'Arabic', hi: 'Hindi',
};

function norm(s) {
  return String(s || '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
}

export function toLangCode(input, fallback = 'en') {
  const n = norm(input);
  if (!n) return fallback;

  // быстрый путь: уже ISO-код
  const base = n.includes('-') ? n.split('-')[0] : n;
  if (LANG_ALIASES[base]) return base;

  // поиск по алиасам
  for (const code of Object.keys(LANG_ALIASES)) {
    if (LANG_ALIASES[code].includes(n) || LANG_ALIASES[code].includes(base)) {
      return code;
    }
  }
  return fallback;
}

export function isSupported(code) {
  return Boolean(LANG_ALIASES[String(code || '').toLowerCase()]);
}
