# deck

hajimism のスライドと配布資料。[dek](https://github.com/hajimism/dek) で作っています。

公開ページ: https://hajimism.github.io/deck/

## 使い方

```bash
bun install
bun run setup             # Playwright の Chromium（shot / lint --visual / pdf 用）
bunx dek new <name>       # デッキを追加
cd decks/<name> && bunx dek   # 開発サーバー
bun run lint              # 全デッキを lint（--visual 込み）
bun run build             # dist/ に全デッキの HTML・PDF・一覧ページを書き出す
```

`main` に push すると、GitHub Actions が `bun run build` を実行し、`dist/` を GitHub Pages に公開します。一覧ページ（`dist/index.html`）は `scripts/index.ts` が各デッキの `script.md` の frontmatter（title / description / date / duration）から作ります。
