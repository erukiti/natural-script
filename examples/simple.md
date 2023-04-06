# シンプルなスクリプト例

```:theme
日本の経済低迷
```

```plaintext :hoge
ほげ
```

`:theme` のようなコロンで始まるコードブロックや、言語名の後ろに `:hoge` のようなコロンで始まる名前が指定されているコードブロックは、変数として解釈します。
変数は `{theme}` のような記法で展開されます。

```system
{theme}について教えてください。
```

`system` `user` `assistant` コードブロックはそれぞれ OpenAI Chat Completion API の role として解釈されます。
