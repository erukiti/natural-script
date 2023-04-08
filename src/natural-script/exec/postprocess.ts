import { Context } from "../types.ts";

export const postprocessNaturalScript = (
  context: Context,
  output: string | null,
  scriptDir: string
) => {
  if (
    output &&
    typeof context.config.output === "string" &&
    typeof context.config.json === "object" &&
    "output" in context.config.json &&
    typeof context.config.json.output === "string"
  ) {
    const outputFilePath = `${scriptDir}/${context.config.json.output}`;
    context.isVerbose && console.log(`write: ${outputFilePath}}`);
    context.variables[context.config.output] = output;
    Deno.writeTextFileSync(outputFilePath, JSON.stringify(context.variables));
  }
};
