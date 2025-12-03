import { LANGUAGE_TO_VOICE_LANG } from "./lang";

export const speak = (text, language = "en") => {
  // защита от SSR
  if (typeof window === "undefined") return;

  if (!text) return;

  const synth = window.speechSynthesis;
  if (!synth) return;

  const voiceLang = LANGUAGE_TO_VOICE_LANG[language] || "en-US";

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceLang;

  const voices = synth.getVoices() || [];

  const exactVoice =
    voices.find((v) => v.lang === voiceLang) ||
    voices.find((v) => v.lang.startsWith(language));

  if (exactVoice) {
    utterance.voice = exactVoice;
  }

  synth.cancel();
  synth.speak(utterance);
};