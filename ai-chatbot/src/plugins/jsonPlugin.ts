type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runJsonFormatter = async (
  input: string,
): Promise<PluginResponse> => {
  try {
    const match = input.match(/\/format\s+([\s\S]*)/i);
    if (!match) {
      return {
        type: "bot",
        content: 'Usage: /format [json]\nExample: /format {"name":"John"}',
      };
    }

    const jsonStr = match[1].trim();

    try {
      const parsed = JSON.parse(jsonStr);
      const formatted = JSON.stringify(parsed, null, 2);
      return {
        type: "plugin",
        content: `📋 Formatted JSON:\n\`\`\`json\n${formatted}\n\`\`\``,
      };
    } catch {
      return {
        type: "bot",
        content: "❌ Invalid JSON format.",
      };
    }
  } catch (err) {
    return {
      type: "bot",
      content: "JSON formatting error.",
    };
  }
};

export const runJsonValidate = async (
  input: string,
): Promise<PluginResponse> => {
  try {
    const match = input.match(/\/validate\s+([\s\S]*)/i);
    if (!match) {
      return {
        type: "bot",
        content: "Usage: /validate [json]",
      };
    }

    const jsonStr = match[1].trim();

    try {
      JSON.parse(jsonStr);
      return {
        type: "plugin",
        content: `✅ Valid JSON! No errors found.`,
      };
    } catch (error: any) {
      return {
        type: "bot",
        content: `❌ Invalid JSON: ${error.message}`,
      };
    }
  } catch (err) {
    return {
      type: "bot",
      content: "JSON validation error.",
    };
  }
};
