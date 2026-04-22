type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

const JOKES = [
  {
    setup: "Why do programmers prefer dark mode?",
    punchline: "Because light attracts bugs! 🐛",
  },
  {
    setup: "Why do Java developers wear glasses?",
    punchline: "Because they don't C#! 👓",
  },
  {
    setup: "How many programmers does it take to change a lightbulb?",
    punchline: "None, that's a hardware problem! 💡",
  },
  {
    setup: "Why did the programmer quit his job?",
    punchline: "Because he didn't get arrays! 📊",
  },
  {
    setup: "What do you call a programmer from Finland?",
    punchline: "Nerdic! 🇫🇮",
  },
  {
    setup: "Why do programmers always get Christmas and Halloween mixed up?",
    punchline: "Because DEC 25 equals OCT 31! 🎃",
  },
];

export const runJoke = async (): Promise<PluginResponse> => {
  try {
    const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
    return {
      type: "plugin",
      content: `😄 ${randomJoke.setup}\n${randomJoke.punchline}`,
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Could not fetch a joke.",
    };
  }
};
