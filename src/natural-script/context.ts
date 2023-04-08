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
      json: {
        input: "base.json",
        output: "base.json",
      },
    },
    variables: {},
    ...opt,
  };
};
