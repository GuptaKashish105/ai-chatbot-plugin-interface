type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

const QUOTES = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Success is not final, failure is not fatal.",
    author: "Winston Churchill",
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
  },
];

export const runQuote = async (): Promise<PluginResponse> => {
  try {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    return {
      type: "plugin",
      content: `✨ "${randomQuote.text}"\n— ${randomQuote.author}`,
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Could not fetch a quote.",
    };
  }
};
