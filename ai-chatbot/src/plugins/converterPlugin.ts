type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runConverter = async (input: string): Promise<PluginResponse> => {
  try {
    const match = input.match(/\/convert\s+([\d.]+)\s+(\w+)\s+to\s+(\w+)/i);
    if (!match) {
      return {
        type: "bot",
        content:
          "Usage: /convert [amount] [unit] to [unit]\nSupported: km↔miles, kg↔lbs, c↔f, m↔ft",
      };
    }

    const amount = parseFloat(match[1]);
    const from = match[2].toLowerCase();
    const to = match[3].toLowerCase();

    let result: number = 0;
    let description = "";

    if (
      (from === "km" && to === "miles") ||
      (from === "kilometers" && to === "miles")
    ) {
      result = amount * 0.621371;
      description = `${amount} km = ${result.toFixed(2)} miles`;
    } else if (
      (from === "miles" && to === "km") ||
      (from === "miles" && to === "kilometers")
    ) {
      result = amount / 0.621371;
      description = `${amount} miles = ${result.toFixed(2)} km`;
    } else if (
      (from === "kg" && to === "lbs") ||
      (from === "kilogram" && to === "pounds")
    ) {
      result = amount * 2.20462;
      description = `${amount} kg = ${result.toFixed(2)} lbs`;
    } else if (
      (from === "lbs" && to === "kg") ||
      (from === "pounds" && to === "kilogram")
    ) {
      result = amount / 2.20462;
      description = `${amount} lbs = ${result.toFixed(2)} kg`;
    } else if (
      (from === "c" && to === "f") ||
      (from === "celsius" && to === "fahrenheit")
    ) {
      result = (amount * 9) / 5 + 32;
      description = `${amount}°C = ${result.toFixed(2)}°F`;
    } else if (
      (from === "f" && to === "c") ||
      (from === "fahrenheit" && to === "celsius")
    ) {
      result = ((amount - 32) * 5) / 9;
      description = `${amount}°F = ${result.toFixed(2)}°C`;
    } else if (
      (from === "m" && to === "ft") ||
      (from === "meter" && to === "feet")
    ) {
      result = amount * 3.28084;
      description = `${amount} m = ${result.toFixed(2)} ft`;
    } else if (
      (from === "ft" && to === "m") ||
      (from === "feet" && to === "meter")
    ) {
      result = amount / 3.28084;
      description = `${amount} ft = ${result.toFixed(2)} m`;
    } else {
      return {
        type: "bot",
        content: "Conversion not supported. Try: km/miles, kg/lbs, c/f, m/ft",
      };
    }

    return {
      type: "plugin",
      content: `⚙️ ${description}`,
    };
  } catch (err) {
    return {
      type: "bot",
      content: "Invalid conversion format.",
    };
  }
};
