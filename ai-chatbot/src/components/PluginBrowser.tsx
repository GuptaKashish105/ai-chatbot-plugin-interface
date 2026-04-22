import React from "react";
import { PLUGIN_REGISTRY } from "../types/pluginRegistry";

type PluginBrowserProps = {
  onSelectPlugin: (usage: string) => void;
};

const PluginBrowser: React.FC<PluginBrowserProps> = ({ onSelectPlugin }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );

  const categories = Array.from(
    new Set(PLUGIN_REGISTRY.map((p) => p.category)),
  );
  const plugins =
    selectedCategory === null
      ? PLUGIN_REGISTRY
      : PLUGIN_REGISTRY.filter((p) => p.category === selectedCategory);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-xl shadow-lg p-4 max-h-96 overflow-y-auto">
      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
        <span>🔌</span> Plugin Browser
      </h3>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
            selectedCategory === null
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Plugin List */}
      <div className="space-y-2">
        {plugins.map((plugin) => (
          <button
            key={plugin.id}
            onClick={() => onSelectPlugin(plugin.usage)}
            className="w-full text-left bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-3 transition text-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-bold text-gray-800 flex items-center gap-2">
                  <span>{plugin.icon}</span>
                  {plugin.name}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {plugin.description}
                </p>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2 font-mono bg-blue-50 px-2 py-1 rounded inline-block">
              {plugin.usage}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PluginBrowser;
