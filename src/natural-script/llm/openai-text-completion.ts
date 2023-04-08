import { Context, Message } from "../types.ts";

/** prompt で与えた文章を補完する */
export const completeText = async (
  context: Context,
  messages: Message[],
  model: string
): Promise<Message | undefined> => {
  let prompt = messages.map((message) => message.content).join("\n") + "\n\n";
  let text = "";

  while (true) {
    const body = JSON.stringify({
      model,
      prompt: prompt + text,
      max_tokens: 1000,
    });

    const res = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${context.openaiApiKey}`,
      },
      body,
    });
    const data: any = await res.json();

    console.log(data);

    const choice = 0;

    const isContinue = data.choices[choice].finish_reason === "length";
    text = text + (data.choices[choice].text || "");

    if (!isContinue) {
      return { role: "assistant", content: text };
    }
  }
};
