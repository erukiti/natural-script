import * as mod from "https://deno.land/std@0.178.0/dotenv/mod.ts";
import { parse } from "https://deno.land/std@0.66.0/flags/mod.ts";
import { createContext } from "./natural-script/context.ts";
import { execNaturalScriptFile } from "./natural-script/exec/index.ts";

const { OPENAI_API_KEY: openaiApiKey } = await mod.load({
  envPath: "./.env.local",
});

const usage = () => {
  console.log("Usage: natural-script <実行するMarkdown>");
};

if (Deno.args.length === 0) {
  console.log("引数がありません");
  usage();
  Deno.exit(1);
}

const parsedArgs = parse(Deno.args, { boolean: ["V", "verbose"] });

const isVerbose: boolean = parsedArgs.V || parsedArgs.verbose;

const context = createContext(openaiApiKey, { isVerbose });

for (const arg of parsedArgs._) {
  if (typeof arg !== "string") {
    continue;
  }
  const res = await execNaturalScriptFile(context, arg);
  console.log(res);
}
