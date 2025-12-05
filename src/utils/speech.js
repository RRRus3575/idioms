import { LANGUAGE_TO_VOICE_LANG } from "./lang";

export const speak = (text, language = "en") => {
  if (typeof window === "undefined") return;
  if (!text) return;

  const synth = window.speechSynthesis;
  if (!synth || !window.SpeechSynthesisUtterance) return;

  const voiceLang = LANGUAGE_TO_VOICE_LANG[language] || "en-US";
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceLang;

  const voices = synth.getVoices() || [];

  if (voices.length) {
    const exactVoice =
      voices.find((v) => v.lang === voiceLang) ||
      voices.find((v) => v.lang?.startsWith(language));

    if (exactVoice) {
      utterance.voice = exactVoice;
    }
  }

  synth.cancel();
  synth.speak(utterance);
};


export  const canSpeak = () =>
        typeof window !== "undefined" &&
        "speechSynthesis" in window &&
        "SpeechSynthesisUtterance" in window;