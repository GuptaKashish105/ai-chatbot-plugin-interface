import { evaluate } from "mathjs";

type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runCalc = async (input: string): Promise<PluginResponse> => {
  const expr = input?.replace("/calc", "")?.trim();
  try {
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      throw new Error("Invalid characters in expression");
    }
    const result = evaluate(expr);
    return { type: "plugin", content: `Result: ${result}` };
  } catch {
    return { type: "plugin", content: "Invalid expression" };
  }
};
