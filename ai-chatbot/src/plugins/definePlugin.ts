type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runDefine = async (input: string): Promise<PluginResponse> => {
  const word = input?.replace("/define", "")?.trim();
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
        word
      )}`
    );
    if (!res?.ok) throw new Error("Dictionary API error");
    const data = await res.json();

    const definition = data[0]?.meanings?.[0]?.definitions?.[0]?.definition;
    const partOfSpeech = data[0]?.meanings?.[0]?.partOfSpeech;
    const wordText = data[0]?.word;

    if (!definition) {
      return { type: "plugin", content: "No definition found." };
    }

    return {
      type: "plugin",
      content: `${wordText} (${partOfSpeech}): ${definition}`,
    };
  } catch (err) {
    return { type: "plugin", content: "Definition not available." };
  }
};
