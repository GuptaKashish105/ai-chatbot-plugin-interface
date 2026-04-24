type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

const LANGUAGE_MAP: Record<string, string> = {
  english: "en",
  spanish: "es",
  french: "fr",
  german: "de",
  italian: "it",
  portuguese: "pt",
  russian: "ru",
  chinese: "zh",
  japanese: "ja",
  korean: "ko",
  hindi: "hi",
  arabic: "ar",
};

const normalizeLanguage = (lang: string) => {
  const normalized = lang.trim().toLowerCase();
  if (LANGUAGE_MAP[normalized]) return LANGUAGE_MAP[normalized];
  return normalized.slice(0, 2);
};

export const runTranslator = async (input: string): Promise<PluginResponse> => {
  const match = input.match(/\/translate(?:\s+to)?\s+(\w+)\s+([\s\S]+)/i);
  if (!match) {
    return {
      type: "bot",
      content:
        "Usage: /translate [language] [text]\nExample: /translate spanish hello",
    };
  }

  const rawLang = match[1];
  const text = match[2].trim();
  const targetLang = normalizeLanguage(rawLang);

  if (!text) {
    return {
      type: "bot",
      content:
        "Please provide text to translate. Example: /translate spanish hello",
    };
  }

  if (targetLang === "en") {
    return {
      type: "bot",
      content:
        "The translator is currently configured for English source text. Please choose a different target language, for example /translate hindi how are you.",
    };
  }

  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.append("q", text);
    url.searchParams.append("langpair", `en|${targetLang}`);

    const response = await fetch(url.toString());
    const data = await response.json();

    const translatedText = data?.responseData?.translatedText;
    const normalizedSource = text.trim().toLowerCase();

    const bestMatch = Array.isArray(data?.matches)
      ? data.matches.find((match: any) => {
          const translation = String(match.translation || "").trim();
          const isSameAsSource =
            translation.toLowerCase() === normalizedSource ||
            translation === "";
          const hasTargetScript = /[\u0900-\u097F]/.test(translation);
          return !isSameAsSource && translation.length > 0 && hasTargetScript;
        })
      : null;

    const finalTranslation =
      bestMatch?.translation ||
      (translatedText && translatedText.trim() !== "" ? translatedText : null);

    if (finalTranslation) {
      return {
        type: "plugin",
        content: `🌍 Translated to ${rawLang}: "${finalTranslation}"`,
      };
    }

    return {
      type: "bot",
      content: "Translation not available for that language.",
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Translation service unavailable.",
    };
  }
};
