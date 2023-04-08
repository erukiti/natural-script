import { Context, Message } from "./types.ts";

/** prompt で与えた文章を補完する */
export const completeChat = async (
  context: Context,
  messages: Message[]
): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model: "gpt-3.5-turbo",
  });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.openaiApiKey}`,
    },
    body,
  });
  const data: any = await res.json();

  const choice = 0;

  return data.choices[choice].message;
};
