import React from "react";
import { PLUGIN_REGISTRY } from "../types/pluginRegistry";

type LandingPageProps = {
  onStartChat: () => void;
};

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
  const categories = Array.from(
    new Set(PLUGIN_REGISTRY.map((p) => p.category)),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-20">
            <div className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 rounded-full p-1 mb-6">
              <span className="bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold">
                🚀 Advanced Plugin-Based Chatbot System
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 leading-tight">
              Intelligent Chat Assistant
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              A production-ready plugin-based chatbot system with extensible
              architecture, real-time capabilities, and professional-grade
              features.
            </p>

            <button
              onClick={onStartChat}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Chatting →
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">🔌</div>
              <h3 className="font-bold text-lg mb-2">Plugin Architecture</h3>
              <p className="text-gray-300 text-sm">
                Modular design with extensible plugin system for easy
                integration of new features.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Real-time Processing</h3>
              <p className="text-gray-300 text-sm">
                Instant responses with advanced error handling and graceful
                fallbacks.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Smart Commands</h3>
              <p className="text-gray-300 text-sm">
                Comprehensive command system with help, usage examples, and
                autocomplete.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-bold text-lg mb-2">API Integration</h3>
              <p className="text-gray-300 text-sm">
                Seamless integration with external APIs for weather,
                translations, and more.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="font-bold text-lg mb-2">Beautiful UI</h3>
              <p className="text-gray-300 text-sm">
                Modern, responsive interface with Tailwind CSS and smooth
                animations.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-lg mb-2">Type-Safe</h3>
              <p className="text-gray-300 text-sm">
                Built with TypeScript for robust, maintainable, production-ready
                code.
              </p>
            </div>
          </div>

          {/* Plugins Section */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">
              Available Plugins
            </h2>

            {categories.map((category) => {
              const categoryPlugins = PLUGIN_REGISTRY.filter(
                (p) => p.category === category,
              );
              return (
                <div key={category} className="mb-12">
                  <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                    📦 {category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryPlugins.map((plugin) => (
                      <div
                        key={plugin.id}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-white/20 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-bold text-white">
                            {plugin.name}
                          </h4>
                          <span className="text-2xl">{plugin.icon}</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">
                          {plugin.description}
                        </p>
                        <div className="space-y-1 text-xs">
                          <p className="text-blue-300">
                            <span className="font-semibold">Usage:</span>{" "}
                            {plugin.usage}
                          </p>
                          <p className="text-gray-400">
                            <span className="font-semibold">Example:</span>{" "}
                            <code className="bg-black/30 px-2 py-1 rounded">
                              {plugin.example}
                            </code>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stack */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 mb-20">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl mb-2">⚛️</p>
                <p className="text-sm font-semibold">React 19</p>
              </div>
              <div>
                <p className="text-2xl mb-2">🔵</p>
                <p className="text-sm font-semibold">TypeScript</p>
              </div>
              <div>
                <p className="text-2xl mb-2">🎨</p>
                <p className="text-sm font-semibold">Tailwind CSS</p>
              </div>
              <div>
                <p className="text-2xl mb-2">⚡</p>
                <p className="text-sm font-semibold">Vite</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <button
              onClick={onStartChat}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started Now 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
