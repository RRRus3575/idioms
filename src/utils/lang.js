// src/utils/lang.js

// Разрешённые коды языков
export const ALLOWED = ["en", "de", "it", "pt", "uk"];

export const LABELS = {
  en: "English",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  uk: "Ukrainian"
};


export const ALL_LANGUAGES = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  uk: "Ukrainian",
  pl: "Polish",
  cs: "Czech",
  sk: "Slovak",
  hu: "Hungarian",
  ro: "Romanian",
  bg: "Bulgarian",
  sr: "Serbian",
  hr: "Croatian",
  sl: "Slovenian",
  mk: "Macedonian",
  sq: "Albanian",
  el: "Greek",
  tr: "Turkish",
  nl: "Dutch",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  is: "Icelandic",
  ga: "Irish",
  cy: "Welsh",
  et: "Estonian",
  lv: "Latvian",
  lt: "Lithuanian",

  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  vi: "Vietnamese",
  th: "Thai",
  id: "Indonesian",
  ms: "Malay",
  tl: "Filipino",
  hi: "Hindi",
  bn: "Bengali",
  ur: "Urdu",
  pa: "Punjabi",
  ta: "Tamil",
  te: "Telugu",
  mr: "Marathi",
  gu: "Gujarati",
  kn: "Kannada",
  ml: "Malayalam",
  or: "Odia",
  si: "Sinhala",
  ne: "Nepali",
  my: "Burmese",
  km: "Khmer",
  lo: "Lao",
  mn: "Mongolian",

  ar: "Arabic",
  fa: "Persian",
  he: "Hebrew",
  ps: "Pashto",
  ku: "Kurdish",
  am: "Amharic",
  so: "Somali",
  sw: "Swahili",
  ha: "Hausa",
  yo: "Yoruba",
  ig: "Igbo",
  zu: "Zulu",
  xh: "Xhosa",
  st: "Sesotho",
  sn: "Shona",
  rw: "Kinyarwanda",
  rn: "Kirundi",
  om: "Oromo",
  ti: "Tigrinya",
  mg: "Malagasy",

  af: "Afrikaans",
  ca: "Catalan",
  eu: "Basque",
  gl: "Galician",
  mt: "Maltese",
  lb: "Luxembourgish",
  bs: "Bosnian",

  hy: "Armenian",
  ka: "Georgian",
  az: "Azerbaijani",
  kk: "Kazakh",
  uz: "Uzbek",
  tk: "Turkmen",
  ky: "Kyrgyz",
  tg: "Tajik",

  ur: "Urdu",
  dv: "Dhivehi",

  // Americas
  qu: "Quechua",
  gn: "Guarani",
  ay: "Aymara",
  nah: "Nahuatl",
  iu: "Inuktitut",
};


export const SHORT = {
  en: "Eng",
  de: "Ger",
  it: "It",
  pt: "Pt",
  uk: "Uk",
};

export const LANGUAGE_TO_VOICE_LANG = {
  en: "en-US",
  uk: "uk-UA",
  ru: "ru-RU",
  es: "es-ES",
  de: "de-DE",
  fr: "fr-FR",
  // добавь нужные тебе языки
};

// 👇 общая нормализация языка (то же самое, что у тебя было в FormHero)
export function normalizeLang(x, fallback = "en") {
  const v = String(x ?? fallback).toLowerCase().trim();
  if (ALLOWED.includes(v)) return v;

  const map = {
    english: "en",
    eng: "en",

    german: "de",
    germany: "de",
    deutsch: "de",

    italian: "it",
    italiano: "it",

    portuguese: "pt",
    portugal: "pt",
    brazilian: "pt",
    brasileiro: "pt",

    ukrainian: "uk",
    ukraine: "uk",
  };

  return map[v] || fallback;
}

// 👇 для обратной совместимости: MainIdioms продолжает вызывать toLangCode
export function toLangCode(raw, fallback = "en") {
  return normalizeLang(raw, fallback);
}
