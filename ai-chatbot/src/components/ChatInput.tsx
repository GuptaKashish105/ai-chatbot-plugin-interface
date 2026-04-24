import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { PLUGIN_REGISTRY } from "../types/pluginRegistry";

type CommandSuggestion = {
  command: string;
  description: string;
  placeholder: string;
};

// Convert plugin registry to command suggestions
const commandSuggestions: CommandSuggestion[] = PLUGIN_REGISTRY.map((p) => ({
  command: p.command.split("|")[0].trim(), // Get first command if there are multiple
  description: p.description,
  placeholder: p.usage,
}));

const fuse = new Fuse(commandSuggestions, {
  keys: ["command", "description"],
  threshold: 0.4,
});

type Props = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const [input, setInput] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(
    "Try typing: /help or /",
  );
  const [filteredSuggestions, setFilteredSuggestions] =
    useState<CommandSuggestion[]>(commandSuggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [error, setError] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);

  const isIncompleteCommand = (text: string) => {
    const trimmed = text?.trim();
    for (const cmd of commandSuggestions) {
      if (trimmed === cmd?.command) return true;
      if (trimmed?.startsWith(cmd?.command + " ")) {
        const rest = trimmed.slice(cmd?.command?.length)?.trim();
        if (rest?.length === 0) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (input?.startsWith("/")) {
      const results = fuse?.search(input);
      setFilteredSuggestions(
        results?.length > 0 ? results?.map((r) => r?.item) : commandSuggestions,
      );
      setShowSuggestions(true);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
      setError("");
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e?.preventDefault();
    if (input?.trim() === "") return;

    // Allow standalone commands like /quote, /joke, /help
    const trimmed = input.trim();
    const isStandaloneCommand =
      trimmed === "/quote" ||
      trimmed === "/joke" ||
      trimmed === "/help" ||
      (trimmed.startsWith("/dice") && trimmed.split(" ").length <= 2);

    if (isIncompleteCommand(input) && !isStandaloneCommand) {
      setError("Please provide arguments for the command.");
      return;
    }

    setError("");
    onSend(input);
    setInput("");
    setDynamicPlaceholder("Try typing: /help or /");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showSuggestions) {
      if (e?.key === "ArrowDown") {
        e?.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredSuggestions?.length);
      } else if (e?.key === "ArrowUp") {
        e?.preventDefault();
        setSelectedIndex(
          (prev) =>
            (prev - 1 + filteredSuggestions?.length) %
            filteredSuggestions?.length,
        );
      } else if (e?.key === "Enter") {
        const trimmed = input.trim();
        const selectedCmd = filteredSuggestions[selectedIndex];
        const shouldSelectSuggestion =
          selectedCmd &&
          (isIncompleteCommand(input) || trimmed === selectedCmd.command);

        if (shouldSelectSuggestion) {
          e?.preventDefault();
          setInput(selectedCmd.command + " ");
          setDynamicPlaceholder(
            selectedCmd?.placeholder?.split(/\[|\]/)[1] || "Enter value",
          );
          setShowSuggestions(false);
          setError("");
        }
      }
    }
  };

  const getCommandPart = () => {
    for (const cmd of commandSuggestions) {
      if (input?.startsWith(cmd?.command)) {
        return cmd?.command + " ";
      }
    }
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 relative">
      <div className="flex gap-2 relative w-full">
        <div className="flex-1 relative">
          {input?.trim() && isIncompleteCommand(input) && (
            <>
              <span
                ref={spanRef}
                className="invisible absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono whitespace-pre"
              >
                {getCommandPart()}
              </span>

              <span
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none whitespace-nowrap"
                style={{
                  left: spanRef?.current?.offsetWidth
                    ? `${
                        spanRef?.current?.offsetLeft +
                        spanRef?.current?.offsetWidth
                      }px`
                    : "0px",
                }}
              >
                {dynamicPlaceholder}
              </span>
            </>
          )}

          <input
            className={`w-full border rounded-lg px-3 py-2 text-sm bg-transparent font-mono focus:outline-none focus:ring-2 transition ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            type="text"
            value={input}
            onChange={(e) => {
              const value = e.target.value;
              setInput(value);
              if (!hasInteracted && value !== "") {
                setHasInteracted(true);
              }
              if (error) setError("");
            }}
            placeholder={!hasInteracted ? dynamicPlaceholder : ""}
            onKeyDown={handleKeyDown}
            aria-invalid={!!error}
            aria-describedby="input-error"
          />
        </div>

        <button
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 text-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
          type="submit"
          disabled={input?.trim() === ""}
          title={error ? error : "Send message"}
        >
          Send
        </button>
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <div
          className="absolute bottom-12 left-0 bg-white border border-gray-200 shadow-lg rounded-lg w-full z-10 max-h-64 overflow-y-auto"
          role="listbox"
        >
          {filteredSuggestions?.map((cmd, index) => (
            <div
              key={cmd.command}
              className={`px-3 py-2 text-sm cursor-pointer border-b border-gray-100 last:border-b-0 transition ${
                selectedIndex === index
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-50"
              }`}
              onMouseDown={() => {
                setInput(cmd.command + " ");
                setDynamicPlaceholder(
                  cmd?.placeholder?.split(/\[|\]/)[1] || "Enter value",
                );
                setShowSuggestions(false);
                setError("");
              }}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <span className="font-bold text-blue-600">{cmd?.command}</span> —{" "}
              <span className="text-gray-700">{cmd?.description}</span>
              <div className="text-xs text-gray-500 mt-1">
                Example: {cmd?.placeholder}
              </div>
            </div>
          ))}
          {filteredSuggestions.some((cmd) => cmd.command === "/translate") && (
            <div className="px-3 py-3 bg-blue-50 border-t border-blue-100 text-xs text-blue-700">
              <p className="font-semibold mb-1">Translation usage</p>
              <p className="mb-1">
                Type <code className="bg-white px-1 rounded">/translate [language] [text]</code> or <code className="bg-white px-1 rounded">/translate to [language] [text]</code>.
              </p>
              <p>
                Supported: english, spanish, french, german, italian, portuguese, russian, chinese, japanese, korean, hindi, arabic.
              </p>
            </div>
          )}
        </div>
      )}
      {error && (
        <p id="input-error" className="text-red-600 text-xs mt-1">
          ⚠️ {error}
        </p>
      )}
    </form>
  );
};

export default ChatInput;
