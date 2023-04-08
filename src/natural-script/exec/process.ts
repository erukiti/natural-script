import { completeChat } from "../llm.ts";
import { Context, Message } from "../types.ts";
import mdast from "npm:mdast";

type Node = any;

const ROLES = ["user", "system", "assistant"] as const;

export const processNaturalScript = async (parsed: Node, context: Context) => {
  const messages: Message[] = [];

  parsed.children.forEach((node: mdast.Content) => {
    if (node.type === "code") {
      if (node.lang?.slice(0, 1) === ":") {
        const key = node.lang.slice(1);
        context.variables[key] = node.value;
        return;
      }

      if (node.meta && node.meta.slice(0, 1) === ":") {
        const key = node.meta.slice(1);
        context.variables[key] = node.value;
        return;
      }

      if (node.lang && ROLES.includes(node.lang as typeof ROLES[number])) {
        let content = node.value;
        Object.entries(context.variables).forEach(([key, value]) => {
          content = content.replace(new RegExp(`{${key}}`, "g"), value);
        });

        messages.push({
          role: node.lang as typeof ROLES[number],
          content,
        });
      }
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
