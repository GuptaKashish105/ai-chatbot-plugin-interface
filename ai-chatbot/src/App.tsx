import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import LandingPage from "./components/LandingPage";
import {
  runCalc,
  runDefine,
  runWeather,
  runTranslator,
  runConverter,
  runQuote,
  runJoke,
  runJsonFormatter,
  runJsonValidate,
  runDice,
} from "./types";

export type Message = {
  id: number;
  type: "user" | "bot" | "plugin";
  content: string;
};

type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [idCounter, setIdCounter] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [fullscreenMode, setFullscreenMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    setIdCounter((prev) => prev + 1);
  };

  const handleMessage = async (input: string) => {
    const userMsg: Message = { id: idCounter, type: "user", content: input };
    addMessage(userMsg);

    let pluginResponse: PluginResponse;

    // Route to appropriate plugin
    if (input?.startsWith("/weather ")) {
      pluginResponse = await runWeather(input);
    } else if (input?.startsWith("/calc ")) {
      pluginResponse = await runCalc(input);
    } else if (input?.startsWith("/define ")) {
      pluginResponse = await runDefine(input);
    } else if (input?.startsWith("/translate ")) {
      pluginResponse = await runTranslator(input);
    } else if (input?.startsWith("/convert ")) {
      pluginResponse = await runConverter(input);
    } else if (input?.startsWith("/quote")) {
      pluginResponse = await runQuote();
    } else if (input?.startsWith("/joke")) {
      pluginResponse = await runJoke();
    } else if (input?.startsWith("/format ")) {
      pluginResponse = await runJsonFormatter(input);
    } else if (input?.startsWith("/validate ")) {
      pluginResponse = await runJsonValidate(input);
    } else if (input?.startsWith("/dice")) {
      pluginResponse = await runDice(input);
    } else if (input?.startsWith("/help")) {
      pluginResponse = {
        type: "bot",
        content:
          "Available commands: /weather, /calc, /define, /translate, /convert, /quote, /joke, /format, /validate, /dice\n\nType / to see suggestions!",
      };
    } else {
      const lower = input?.toLowerCase();
      if (
        lower?.includes("hi") ||
        lower?.includes("hello") ||
        lower?.includes("hey")
      ) {
        pluginResponse = {
          type: "bot",
          content:
            "👋 Hello! I can help you with various tasks. Type /help to see all available commands!",
        };
      } else {
        pluginResponse = {
          type: "bot",
          content:
            "I didn't recognize that command. Type / to see available commands!",
        };
      }
    }

    const pluginMsg: Message = {
      id: idCounter + 1,
      type: pluginResponse.type,
      content: pluginResponse.content,
    };
    addMessage(pluginMsg);
  };

  if (showLanding) {
    return (
      <LandingPage
        onStartChat={() => {
          setShowLanding(false);
          setFullscreenMode(true);
        }}
      />
    );
  }

  if (fullscreenMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 shadow-lg flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>🤖</span> Advanced Chatbot
          </h1>
          <button
            onClick={() => {
              setFullscreenMode(false);
              setShowLanding(true);
              setMessages([]);
              setIdCounter(0);
            }}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
          >
            ← Back to Home
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Chat messages={messages} />
          </div>
        </div>

        <div className="bg-white border-t border-gray-200 p-6">
          <div className="max-w-2xl mx-auto">
            <ChatInput onSend={handleMessage} />
          </div>
        </div>
      </div>
    );
  }

  // Widget mode (original minimal version)
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50/70 via-white/60 to-blue-100/70 backdrop-blur-sm">
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          <div className="relative">
            {showGreeting && (
              <div className="absolute bottom-full right-0 mb-4 animate-fade-in px-4 py-2 text-sm max-w-xs w-max break-words">
                <div className="relative bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-md text-sm border border-gray-200 max-w-[220px]">
                  👋 Hi! I'm here to help you!
                  <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border border-gray-200 rotate-45"></div>
                </div>
              </div>
            )}
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg animate-bounce transition"
              onClick={() => setIsOpen(true)}
            >
              💬
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[400px] max-h-[600px] bg-white border border-gray-300 shadow-2xl rounded-xl flex flex-col overflow-hidden z-50">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-lg">
            <span className="flex items-center gap-2">
              <span>🤖</span> Smart Assistant
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-xl leading-none hover:scale-110 transition"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            <Chat messages={messages} />
          </div>
          <div className="p-3 border-t bg-white">
            <ChatInput onSend={handleMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
