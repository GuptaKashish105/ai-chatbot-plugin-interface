import { useEffect, useState } from "react";
import Chat from "./components/Chat";
import ChatInput from "./components/ChatInput";
import { runCalc, runDefine, runWeather } from "./types";

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
    if (input?.startsWith("/weather "))
      pluginResponse = await runWeather(input);
    else if (input?.startsWith("/calc ")) pluginResponse = await runCalc(input);
    else if (input?.startsWith("/define "))
      pluginResponse = await runDefine(input);
    else {
      const lower = input?.toLowerCase();
      if (lower?.includes("hi") || lower?.includes("hello")) {
        pluginResponse = {
          type: "bot",
          content: "Hello! How can I help you today?",
        };
      } else {
        pluginResponse = {
          type: "bot",
          content: "Unknown command. Try /weather, /calc, or /define.",
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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50/70 via-white/60 to-blue-100/70 backdrop-blur-sm">
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
          <div className="relative">
            {showGreeting && (
              <div className="absolute bottom-full right-0 mb-4 animate-fade-in  px-4 py-2 text-sm  max-w-xs w-max break-words">
                <div className="relative bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-md text-sm border border-gray-200 max-w-[220px]">
                  👋 Hi user, I'm here to help you!
                  <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border border-gray-200 rotate-45"></div>
                </div>
              </div>
            )}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg animate-bounce"
              onClick={() => setIsOpen(true)}
            >
              💬
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[350px] max-h-[500px] bg-white border border-gray-300 shadow-xl rounded-xl flex flex-col overflow-hidden z-50">
          <div className="flex justify-between items-center px-4 py-2 bg-blue-600 text-white font-semibold text-lg">
            ChatBot
            <button
              onClick={() => setIsOpen(false)}
              className="text-white font-bold text-xl leading-none"
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
            <Chat messages={messages} />
          </div>
          <div className="p-2 border-t">
            <ChatInput onSend={handleMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
