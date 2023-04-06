import { unified } from "npm:unified";
import remarkParse from "npm:remark-parse";
import frontmatter from "npm:remark-frontmatter";
import { Context } from "../types.ts";
import { load } from "npm:js-yaml";
import { Root } from "npm:remark-parse/lib/types";

const parser = unified().use(remarkParse).use(frontmatter, ["yaml"]);

const getFrontmatter = (parsed: Root) => {
  if (parsed.children[0]?.type === "yaml") {
    const data = parsed.children[0].value;
    return load(data);
  }
  return null;
};

export const preprocessNaturalScript = async (
  context: Context,
  markdown: string,
  scriptDir: string
): Promise<Root> => {
  const parsed = parser.parse(markdown);

  const frontmatter = getFrontmatter(parsed);
  if (frontmatter) {
    context.config = {
      ...context.config,
      ...frontmatter,
    };
  }

  if (
    typeof context.config.json === "object" &&
    "input" in context.config.json
  ) {
    const input = context.config.json.input;
    if (typeof input === "string") {
      try {
        const data = JSON.parse(
          await Deno.readTextFile(`${scriptDir}/${input}`)
        );
        context.variables = {
          ...context.variables,
          ...data,
        };
      } catch (e) {
        if (e instanceof Deno.errors.NotFound) {
          return parsed;
        }
        if (e instanceof SyntaxError) {
          return parsed;
        }
      }
    }
  }

  return parsed;
};
