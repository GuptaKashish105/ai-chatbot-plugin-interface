import React, { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";

const commandSuggestions = [
  {
    command: "/weather",
    description: "Get weather for a city",
    placeholder: "/weather [Enter your City here]",
  },
  {
    command: "/calc",
    description: "Evaluate a math expression",
    placeholder: "/calc [Enter your Expression here]",
  },
  {
    command: "/define",
    description: "Get a definition of a word",
    placeholder: "/define [Enter your Term here]",
  },
];

const fuse = new Fuse(commandSuggestions, {
  keys: ["command"],
  threshold: 0.4,
});

type Props = {
  onSend: (message: string) => void;
};

const ChatInput = ({ onSend }: Props) => {
  const [input, setInput] = useState("");
  const [dynamicPlaceholder, setDynamicPlaceholder] = useState(
    "Try typing: Hi or / "
  );
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(commandSuggestions);
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
      setFilteredSuggestions(results?.map((r) => r?.item));
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

    if (isIncompleteCommand(input)) {
      setError("Please provide arguments for the command.");
      return;
    }

    setError("");
    onSend(input);
    setInput("");
    setDynamicPlaceholder("Try typing: Hi or / ");
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
            filteredSuggestions?.length
        );
      } else if (e?.key === "Enter") {
        if (filteredSuggestions[selectedIndex]) {
          e?.preventDefault();
          const selectedCmd = filteredSuggestions[selectedIndex];
          setInput(selectedCmd?.command + " ");
          const placeholder = selectedCmd?.placeholder?.replace(
            /.*?\[(.*?)\]/,
            "$1"
          );
          setDynamicPlaceholder(placeholder);
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-1 relative">
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
            className={`w-full border rounded-lg px-3 py-2 text-sm bg-transparent font-mono focus:outline-none focus:ring-2 ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-blue-500"
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm disabled:opacity-50"
          type="submit"
          disabled={input?.trim() === "" || isIncompleteCommand(input)}
          title={
            isIncompleteCommand(input)
              ? "Please complete the command before sending"
              : "Send message"
          }
        >
          Send
        </button>
      </div>

      {showSuggestions && (
        <div
          className="absolute bottom-12 left-0 bg-white border border-gray-300 shadow-md rounded-md w-full z-10"
          role="listbox"
        >
          {filteredSuggestions?.map((cmd, index) => (
            <div
              key={cmd.command}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                selectedIndex === index ? "bg-gray-100" : ""
              }`}
              onMouseDown={() => {
                setInput(cmd.command + " ");
                const placeholder = cmd?.placeholder?.replace(
                  /.*?\[(.*?)\]/,
                  "$1"
                );
                setDynamicPlaceholder(placeholder);
                setShowSuggestions(false);
                setError("");
              }}
              role="option"
              aria-selected={selectedIndex === index}
            >
              <span className="font-mono text-blue-600">{cmd?.command}</span> —{" "}
              {cmd?.description}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p id="input-error" className="text-red-600 text-xs mt-1">
          {error}
        </p>
      )}
    </form>
  );
};

export default ChatInput;
