import { unified } from "npm:unified";
import remarkParse from "npm:remark-parse";
import frontmatter from "npm:remark-frontmatter";
import { Context } from "../types.ts";
// @deno-types="npm:@types/js-yaml"
import yaml from "npm:js-yaml";

type Node = any;

const parser = unified().use(remarkParse).use(frontmatter, ["yaml"]);

const getFrontmatter = (parsed: Node) => {
  if (parsed.children[0]?.type === "yaml") {
    const data = parsed.children[0].value;
    return yaml.load(data);
  }
  return null;
};

export const preprocessNaturalScript = async (
  context: Context,
  markdown: string,
  scriptDir: string
): Promise<Node> => {
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
        const inputFileName = `${scriptDir}/${input}`;
        context.isVerbose && console.log(`read: ${inputFileName}`);
        const data = JSON.parse(await Deno.readTextFile(`${inputFileName}`));
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
