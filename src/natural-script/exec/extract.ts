import { Context } from "../types.ts";

export const extract = (context: Context, template: string) => {
  let content = template;
  Object.entries(context.variables).forEach(([key, value]) => {
    content = content.replace(new RegExp(`{${key}}`, "g"), value);
  });

  return content;
};
