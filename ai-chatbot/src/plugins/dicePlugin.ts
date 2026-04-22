type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runDice = async (input: string): Promise<PluginResponse> => {
  try {
    const match = input.match(/\/dice\s+(\d+)?d(\d+)?/i);
    if (!match) {
      return {
        type: "bot",
        content:
          "Usage: /dice [count]d[sides]\nExample: /dice 2d6 or just /dice d20",
      };
    }

    const count = parseInt(match[1]) || 1;
    const sides = parseInt(match[2]) || 6;

    if (count < 1 || count > 100 || sides < 2 || sides > 1000) {
      return {
        type: "bot",
        content: "Invalid dice format. Max 100 dice, max 1000 sides.",
      };
    }

    let total = 0;
    const rolls: number[] = [];

    for (let i = 0; i < count; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }

    const rollsStr = rolls.join(", ");
    return {
      type: "plugin",
      content: `🎲 Rolling ${count}d${sides}:\nRolls: [${rollsStr}]\nTotal: ${total}`,
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Dice rolling error.",
    };
  }
};
