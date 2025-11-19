import "dotenv/config";
import appJson from "./app.json";

export default ({ config }) => ({
  ...config,
  ...appJson.expo,
  extra: {
    ...(appJson.expo.extra || {}),
    ...(config.extra || {}),
    openaiApiKey:
      process.env.EXPO_PUBLIC_OPENAI_API_KEY ||
      process.env.OPENAI_API_KEY ||
      appJson.expo.extra?.openaiApiKey ||
      "",
  },
});
