# Advanced Plugin-Based Chatbot Interface

A modern, production-ready chatbot built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project demonstrates a scalable plugin-driven architecture, real-time command processing, and a clean, resume-ready UI.

---

## 🔗 Live Demo

👉 [https://ai-chatbot-plugin-interface-ta7z.vercel.app/](https://ai-chatbot-plugin-interface-ta7z.vercel.app/)

---

## ⭐ Project Highlights

- **Modular plugin system** for extensible command support
- **Smart command suggestions** with fuzzy search and autocomplete
- **API-driven features** for weather, translation, dictionary, and more
- **Responsive UI** with landing page, chat interface, and plugin browser
- **Production-ready build** validated with `npm run build`

## 🚀 Available Plugins

| Command                            | Plugin          | Description                                             | Example                             |
| ---------------------------------- | --------------- | ------------------------------------------------------- | ----------------------------------- |
| `/weather [city]`                  | Weather         | Real-time weather data via OpenWeather API              | `/weather London`                   |
| `/calc [expression]`               | Calculator      | Evaluate math expressions using `mathjs`                | `/calc 12 / (2 + 1)`                |
| `/define [word]`                   | Dictionary      | Fetch word definitions from Dictionary API              | `/define eloquent`                  |
| `/translate [language] [text]`      | Translator      | Translate text into another language                    | `/translate hindi how are you`      |
| `/translate to [language] [text]` | Translator      | Alternative translate syntax                            | `/translate to spanish hello world` |
| `/convert [amount] [from] to [to]` | Unit Converter  | Convert units such as km, miles, kg, lbs, °C, °F, m, ft | `/convert 100 km to miles`          |
| `/quote`                           | Quote Generator | Returns an inspirational quote                          | `/quote`                            |
| `/joke`                            | Joke Generator  | Returns a random programming joke                       | `/joke`                             |
| `/format [json]`                   | JSON Formatter  | Pretty-print JSON                                       | `/format {"name":"John"}`           |
| `/validate [json]`                 | JSON Validator  | Validate JSON syntax                                    | `/validate {"name":"John"}`         |
| `/dice [count]d[sides]`            | Dice Roller     | Roll dice with customizable count and sides             | `/dice 2d6`                         |

## 🧭 Key Features

- **Professional landing experience** with plugin showcase
- **Smart chat input** that supports command entry, suggestions, and validation
- **Plugin browser** for easy command discovery
- **Error handling** for incomplete or invalid input
- **Extensible architecture** to add new plugins quickly
- **Production build success** with optimized Vite output

## 💻 Setup Instructions

### Prerequisites

- Node.js 16+ installed
- npm available

### Install Dependencies

```bash
cd ai-chatbot
npm install
```

### Configure API Keys

Duplicate `.env.example` to `.env` and add your OpenWeather API key:

```bash
cp .env.example .env
```

Update `.env`:

```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

### Run Locally

```bash
npm run dev
```

The app will run at `http://localhost:5173/`.

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

- `src/App.tsx` — entry point and chat routing
- `src/components/` — UI components for chat, landing page, and plugin browser
- `src/plugins/` — command handling logic for each plugin
- `src/types/pluginRegistry.ts` — plugin metadata and registry
- `src/index.css` — global and Tailwind utilities

## 🎯 Usage

1. Open the app and start typing in the chat input.
2. Type `/` to reveal commands and suggestions.
3. Select a plugin or type a command directly.
4. Press `Enter` or click **Send** to execute.

### Example Commands

- `/weather london`
- `/calc 5 * (3 + 2)`
- `/define innovation`
- `/translate to french good morning`
- `/convert 100 km to miles`
- `/quote`
- `/joke`
- `/format {"name":"John"}`
- `/validate {"name":"John"}`
- `/dice 3d8`

## ✅ Notes

- The chatbot will automatically suggest commands while typing.
- If a command is incomplete, the input layer will show helpful guidance.
- The plugin architecture makes it easy to add more features over time.

## 📌 GitHub Repository

https://github.com/GuptaKashish105/ai-chatbot-plugin-interface
