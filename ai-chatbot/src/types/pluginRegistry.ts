export type Plugin = {
  id: string;
  name: string;
  description: string;
  command: string;
  category: string;
  icon: string;
  usage: string;
  example: string;
};

export const PLUGIN_REGISTRY: Plugin[] = [
  {
    id: "weather",
    name: "Weather",
    description: "Get real-time weather information for any city",
    command: "/weather",
    category: "Information",
    icon: "🌤️",
    usage: "/weather [city]",
    example: "/weather london",
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    command: "/calc",
    category: "Utilities",
    icon: "🧮",
    usage: "/calc [expression]",
    example: "/calc 25 * 4 + 10",
  },
  {
    id: "dictionary",
    name: "Dictionary",
    description: "Get word definitions and meanings",
    command: "/define",
    category: "Education",
    icon: "📚",
    usage: "/define [word]",
    example: "/define eloquent",
  },
  {
    id: "translator",
    name: "Translator",
    description: "Translate text to different languages",
    command: "/translate",
    category: "Utilities",
    icon: "🌍",
    usage: "/translate [language] [text]",
    example: "/translate hindi how are you",
  },
  {
    id: "converter",
    name: "Unit Converter",
    description: "Convert between different units",
    command: "/convert",
    category: "Utilities",
    icon: "⚙️",
    usage: "/convert [amount] [from] to [to]",
    example: "/convert 100 km to miles",
  },
  {
    id: "quote",
    name: "Quote Generator",
    description: "Get inspirational quotes",
    command: "/quote",
    category: "Entertainment",
    icon: "✨",
    usage: "/quote",
    example: "/quote",
  },
  {
    id: "joke",
    name: "Joke Generator",
    description: "Get funny programming jokes",
    command: "/joke",
    category: "Entertainment",
    icon: "😄",
    usage: "/joke",
    example: "/joke",
  },
  {
    id: "json",
    name: "JSON Tools",
    description: "Format and validate JSON",
    command: "/format or /validate",
    category: "Developer",
    icon: "📋",
    usage: "/format [json] or /validate [json]",
    example: '/format {"name":"John"}',
  },
  {
    id: "dice",
    name: "Dice Roller",
    description: "Roll dice for games",
    command: "/dice",
    category: "Games",
    icon: "🎲",
    usage: "/dice [count]d[sides]",
    example: "/dice 2d6",
  },
];
