type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runTranslator = async (input: string): Promise<PluginResponse> => {
  try {
    const match = input.match(/\/translate\s+to\s+(\w+)\s+(.*)/i);
    if (!match) {
      return {
        type: "bot",
        content:
          "Usage: /translate to [language] [text]\nExample: /translate to spanish hello",
      };
    }

    const targetLang = match[1].toLowerCase();
    const text = match[2];

    const response = await fetch("https://api.mymemory.translated.net/get", {
      method: "GET",
    });

    const url = new URL("https://api.mymemory.translated.net/get");
    url.searchParams.append("q", text);
    url.searchParams.append("langpair", `en|${targetLang.substring(0, 2)}`);

    const res = await fetch(url.toString());
    const data = await res.json();

    if (data.responseStatus === 200 && data.responseData.translatedText) {
      return {
        type: "plugin",
        content: `🌍 Translated: "${text}" → "${data.responseData.translatedText}"`,
      };
    }

    return {
      type: "bot",
      content: "Translation not available for that language pair.",
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Translation service unavailable.",
    };
  }
};
