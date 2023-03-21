import { Context } from "./types.ts";

export const createContext = (openaiApiKey: string): Context => {
  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  return {
    openaiApiKey,
  };
};
