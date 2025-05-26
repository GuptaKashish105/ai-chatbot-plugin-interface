type PluginResponse = {
  type: "bot" | "plugin";
  content: string;
};

export const runWeather = async (input: string): Promise<PluginResponse> => {
  const city = input?.replace("/weather", "")?.trim();
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    return {
      type: "plugin",
      content: `Weather in ${city}: ${data?.main?.temp}°C, ${data?.weather?.[0]?.description}`,
    };
  } catch {
    return { type: "plugin", content: "Failed to fetch weather data" };
  }
};
