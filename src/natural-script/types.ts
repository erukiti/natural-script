type Config = { [key: string]: string | string[] | Config | Config[] };

export type Context = {
  openaiApiKey: string;
  config: Config;
  variables: { [props: string]: string };
};

export type Message = {
  role: "user" | "system" | "assistant";
  content: string;
};
