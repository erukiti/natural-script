import { Context, Message } from "./types.ts";
import { completeChat } from "./llm/openai-chat-completion.ts";
import { completeText } from "./llm/openai-text-completion.ts";

export const llm = (
  context: Context,
  messages: Message[]
): Promise<Message | undefined> => {
  if (
    !Array.isArray(context.config.models) ||
    context.config.models.length === 0
  ) {
    throw new Error("models is not set");
  }
  const model = context.config.models[0];
  switch (model) {
    case "gpt-4":
    case "gpt-4-0314":
    case "gpt-4-32k":
    case "gpt-4-32k-0314":
    case "gpt-3.5-turbo":
    case "gpt-3.5-turbo-0301":
      return completeChat(context, messages, model);
    case "text-davinci-003":
    case "text-davinci-002":
    case "text-curie-001":
    case "text-babbage-001":
    case "text-ada-001":
    case "davinci":
    case "curie":
    case "babbage":
    case "ada":
      return completeText(context, messages, model);
    default:
      throw new Error(`model ${model} is not supported`);
  }
};
