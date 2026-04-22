import React from "react";
import { PLUGIN_REGISTRY } from "../types/pluginRegistry";

type CommandSuggestionsProps = {
  input: string;
  onSelectCommand: (command: string) => void;
};

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({
  input,
  onSelectCommand,
}) => {
  if (input.trim().length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-64 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Available Commands
        </p>
        <div className="space-y-2">
          {PLUGIN_REGISTRY.map((plugin) => (
            <button
              key={plugin.id}
              onClick={() => onSelectCommand(plugin.usage)}
              className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded transition text-sm text-gray-700 hover:text-blue-600"
            >
              <span className="font-semibold">
                {plugin.icon} {plugin.command}
              </span>
              <p className="text-xs text-gray-500">{plugin.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const filtered = PLUGIN_REGISTRY.filter(
    (p) =>
      p.command.includes(input.toLowerCase()) ||
      p.name.toLowerCase().includes(input.toLowerCase()) ||
      p.description.toLowerCase().includes(input.toLowerCase()),
  );

  if (filtered.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-h-64 overflow-y-auto">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Suggestions
      </p>
      <div className="space-y-2">
        {filtered.map((plugin) => (
          <button
            key={plugin.id}
            onClick={() => onSelectCommand(plugin.usage)}
            className="w-full text-left px-3 py-2 hover:bg-blue-50 rounded transition text-sm text-gray-700 hover:text-blue-600"
          >
            <span className="font-semibold">
              {plugin.icon} {plugin.command}
            </span>
            <p className="text-xs text-gray-500">{plugin.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CommandSuggestions;
