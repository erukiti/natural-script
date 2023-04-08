import { build, emptyDir } from "https://deno.land/x/dnt@0.34.0/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
    undici: true,
  },
  package: {
    name: "@natural-script/natural-script",
    version: "0.1.1",
    description: "Natural Script programming",
    license: "MIT",
    main: "mod.js",
    repository: {
      type: "git",
      url: "git+https://github.com/erukiti/naturl-script.git",
    },
    keywords: ["natural-script", "natural_script", "GPT", "LLM"],
  },
  postBuild() {
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
