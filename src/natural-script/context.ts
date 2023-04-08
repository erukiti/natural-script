import { Context } from "./types.ts";

export const createContext = (
  openaiApiKey: string,
  opt: Partial<Context> = {}
): Context => {
  if (!openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  return {
    isVerbose: false,
    openaiApiKey,
    config: {
      json: {},
      models: ["gpt-3.5-turbo"],
    },
    variables: {},
    ...opt,
  };
};
