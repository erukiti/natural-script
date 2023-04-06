import { dirname } from "https://deno.land/std@0.178.0/path/mod.ts";
import { Context } from "../types.ts";
import { preprocessNaturalScript } from "./preprocess.ts";
import { processNaturalScript } from "./process.ts";
import { postprocessNaturalScript } from "./postprocess.ts";

export const execNaturalScriptFile = async (
  context: Context,
  filePath: string
): Promise<string | null> => {
  const text = await Deno.readTextFile(filePath);
  return execNaturalScript(context, text, dirname(filePath));
};

export const execNaturalScript = async (
  context: Context,
  markdown: string,
  scriptDir: string
): Promise<string | null> => {
  const parsed = await preprocessNaturalScript(context, markdown, scriptDir);

  const output = await processNaturalScript(parsed, context);
  await postprocessNaturalScript(context, output, scriptDir);

  return output;
};
