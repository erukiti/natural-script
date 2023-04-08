import { Context, Message } from "../types.ts";

/** prompt で与えた文章を補完する */
export const completeChat = async (
  context: Context,
  messages: Message[],
  model: string
): Promise<Message | undefined> => {
  const body = JSON.stringify({
    messages,
    model,
  });

  context.isVerbose &&
    console.log("completeChat message:", JSON.stringify(messages, null, "  "));

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

  context.isVerbose && console.log("completeChat usage:", data.usage);

  return data.choices[choice].message;
};
