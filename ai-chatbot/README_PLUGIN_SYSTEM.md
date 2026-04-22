# 🤖 Advanced Plugin-Based Chatbot System

A production-ready, modular chatbot system built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**. This project demonstrates advanced software architecture, API integration, and modern web development practices.

## 🌟 Key Features

### Architecture & Design

- **Plugin-Based Architecture**: Modular plugin system allowing easy extension of functionality
- **Type-Safe**: Built with TypeScript for robust, maintainable code
- **Production Ready**: Error handling, graceful fallbacks, and comprehensive validation
- **API Integration**: Seamless integration with external APIs (weather, translations, etc.)

### Available Plugins

#### Information & Utilities

- **🌤️ Weather Plugin** - Real-time weather information for any city
  - Usage: `/weather [city]`
  - Example: `/weather london`

- **🧮 Calculator Plugin** - Mathematical expression evaluation
  - Usage: `/calc [expression]`
  - Example: `/calc 2**10 + sqrt(16)`

- **📚 Dictionary Plugin** - Word definitions and meanings
  - Usage: `/define [word]`
  - Example: `/define eloquent`

- **🌍 Translator Plugin** - Multi-language translation
  - Usage: `/translate to [language] [text]`
  - Example: `/translate to spanish hello world`

- **⚙️ Unit Converter** - Convert between different units
  - Usage: `/convert [amount] [from] to [to]`
  - Supported: km↔miles, kg↔lbs, °c↔°f, m↔ft
  - Example: `/convert 100 km to miles`

#### Entertainment & Tools

- **✨ Quote Generator** - Inspirational quotes
  - Usage: `/quote`

- **😄 Joke Generator** - Programming humor
  - Usage: `/joke`

- **📋 JSON Tools** - Format and validate JSON
  - Usage: `/format [json]` or `/validate [json]`
  - Example: `/format {"name":"John"}`

- **🎲 Dice Roller** - Roll dice for games
  - Usage: `/dice [count]d[sides]`
  - Example: `/dice 2d6`

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
cd ai-chatbot
npm install
```

### Development

```bash
npm run dev
```

The app will start at `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

## 💻 Technology Stack

- **Frontend Framework**: React 19 with Hooks
- **Type Safety**: TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 6.3
- **Package Manager**: npm 10+

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Chat.tsx                 # Message display component
│   ├── ChatInput.tsx            # Input with command suggestions
│   ├── CommandSuggestions.tsx   # Command autocomplete
│   ├── LandingPage.tsx          # Professional landing page
│   ├── Message.tsx              # Individual message component
│   ├── PluginBrowser.tsx        # Plugin discovery interface
│   └── PluginCard.tsx           # Plugin showcase card
├── plugins/
│   ├── calcPlugin.ts            # Math expression evaluator
│   ├── weatherPlugin.ts         # Weather API integration
│   ├── definePlugin.ts          # Dictionary API integration
│   ├── translatorPlugin.ts      # Translation API integration
│   ├── converterPlugin.ts       # Unit conversion logic
│   ├── quotePlugin.ts           # Inspirational quotes
│   ├── jokePlugin.ts            # Programming jokes
│   ├── jsonPlugin.ts            # JSON formatting/validation
│   └── dicePlugin.ts            # Dice rolling utility
├── types/
│   ├── index.ts                 # Plugin exports
│   └── pluginRegistry.ts        # Plugin metadata & registry
├── App.tsx                      # Main application component
├── App.css                      # Component styling
└── index.css                    # Global styles
```

## 🔌 Plugin System

### Creating a New Plugin

Plugins follow a consistent interface:

```typescript
type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runMyPlugin = async (input: string): Promise<PluginResponse> => {
  // Plugin logic here
  return {
    type: "plugin",
    content: "Result message",
  };
};
```

### Registering a Plugin

1. Create the plugin file in `src/plugins/`
2. Export it from `src/types/index.ts`
3. Add it to `src/types/pluginRegistry.ts` with metadata
4. Handle the command in `src/App.tsx`

## 🎨 UI/UX Highlights

- **Beautiful Landing Page** - Modern design with animated gradients
- **Smart Command Suggestions** - Real-time fuzzy search for commands
- **Responsive Layout** - Works seamlessly on desktop and tablet
- **Chat Interface** - Clean, intuitive message display
- **Error Handling** - User-friendly error messages with recovery suggestions
- **Loading States** - Smooth loading indicators

## 📦 Key Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "^5.8.3",
  "mathjs": "^14.5.0",
  "fuse.js": "^7.1.0"
}
```

## 🔐 Features for Production

- ✅ Type-safe with comprehensive TypeScript types
- ✅ Error boundaries and graceful error handling
- ✅ Input validation and sanitization
- ✅ API error handling with fallbacks
- ✅ Performance optimized components
- ✅ Accessibility considerations
- ✅ Mobile responsive design
- ✅ SEO-friendly landing page

## 📈 Performance

- Vite for fast development and optimized builds
- Code splitting and lazy loading
- Optimized re-renders with React hooks
- Minimal bundle size with tree-shaking

## 🎓 Learning Resources

This project demonstrates:

- Advanced React patterns and hooks
- TypeScript best practices
- API integration strategies
- Plugin architecture design
- Component composition
- State management
- Error handling patterns
- Responsive UI design

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to add new plugins or improve existing functionality.

---

**Built with ❤️ for developers who want to showcase their skills**
