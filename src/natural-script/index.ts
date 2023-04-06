import { unified } from "npm:unified";
import remarkParse from "npm:remark-parse";
import { completeChat } from "./llm.ts";
import { Context, Message } from "./types.ts";

const parser = unified().use(remarkParse);

export const execNaturalScriptFile = async (
  context: Context,
  filePath: string
): Promise<string | null> => {
  const text = await Deno.readTextFile(filePath);
  return execNaturalScript(context, text);
};

const ROLES = ["user", "system", "assistant"];

export const execNaturalScript = async (
  context: Context,
  markdown: string
): Promise<string | null> => {
  const parsed = parser.parse(markdown);
  const messages: Message[] = [];
  parsed.children.forEach((node) => {
    if (node.type === "code" && node.lang && ROLES.includes(node.lang)) {
      messages.push({
        role: node.lang as "user" | "system" | "assistant",
        content: node.value,
      });
    }
  });

  if (messages.length > 0) {
    const res = await completeChat(context, messages);
    if (!res?.content) {
      throw new Error("生成できませんでした");
    }
    return res.content;
  }
  return null;
};
