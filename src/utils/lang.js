// src/utils/lang.js

// Разрешённые коды языков
export const ALLOWED = ["en", "de", "it", "pt", "uk", "all"];

export const LABELS = {
  en: "English",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  uk: "Ukrainian",
  all: "All languages",
};

export const SHORT = {
  en: "Eng",
  de: "Ger",
  it: "It",
  pt: "Pt",
  uk: "Uk",
  all: "All",
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
