// Writes dist/index.html: one card per deck that `dek build --root-dist` put in dist/.
// Title, description, and date come from each deck's script.md frontmatter.
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");

type Deck = { name: string; title: string; description: string; date: string; duration: string; pdf: boolean; png: boolean };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const decks: Deck[] = readdirSync(join(root, "decks"), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(dist, `${d.name}.html`)))
  .map((d) => {
    const script = readFileSync(join(root, "decks", d.name, "script.md"), "utf8");
    const fm = (Bun.YAML.parse(script.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "") ?? {}) as Record<string, unknown>;
    return {
      name: d.name,
      title: String(fm.title ?? d.name),
      description: String(fm.description ?? ""),
      date: fm.date ? String(fm.date instanceof Date ? fm.date.toISOString().slice(0, 10) : fm.date) : "",
      duration: String(fm.duration ?? ""),
      pdf: existsSync(join(dist, `${d.name}.pdf`)),
      png: existsSync(join(dist, `${d.name}.png`)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name));

const card = (d: Deck) => `
    <li class="card">
      <a class="thumb" href="${d.name}.html">${d.png ? `<img src="${d.name}.png" alt="" loading="lazy" width="1280" height="720">` : ""}</a>
      <div class="body">
        <p class="meta">${[d.date, d.duration && `${d.duration.replace("m", "")}分`].filter(Boolean).map(esc).join(" · ")}</p>
        <h2><a href="${d.name}.html">${esc(d.title)}</a></h2>
        ${d.description ? `<p class="desc">${esc(d.description)}</p>` : ""}
        <p class="links"><a href="${d.name}.html">スライド</a>${d.pdf ? `<a href="${d.name}.pdf">PDF</a>` : ""}</p>
      </div>
    </li>`;

const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>deck · hajimism</title>
<meta name="description" content="hajimism のスライドと配布資料">
<style>
  :root {
    --bg: #f6f1e7; --fg: #1d1a16; --muted: #5f584e; --line: #d9cfbd; --card: #fbf8f2; --accent: #b3361f;
    color-scheme: light dark;
  }
  @media (prefers-color-scheme: dark) {
    :root { --bg: #171512; --fg: #eee8dc; --muted: #a79f92; --line: #3a352d; --card: #201d19; --accent: #e0765f; }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; background: var(--bg); color: var(--fg);
    font-family: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Noto Sans CJK JP", sans-serif;
    line-height: 1.7; font-feature-settings: "palt";
  }
  main { max-width: 1120px; margin: 0 auto; padding: 64px 16px 96px; }
  header { margin-bottom: 40px; border-bottom: 1px solid var(--line); padding-bottom: 20px; }
  h1 { margin: 0; font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", serif; font-size: 40px; font-weight: 600; }
  header p { margin: 4px 0 0; color: var(--muted); font-size: 14px; }
  ul { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; margin: 0; padding: 0; list-style: none; }
  .card { display: flex; flex-direction: column; overflow: hidden; border: 1px solid var(--line); border-radius: 10px; background: var(--card); }
  .thumb { display: block; aspect-ratio: 16 / 9; background: var(--line); }
  .thumb img { display: block; width: 100%; height: 100%; object-fit: cover; }
  .body { display: flex; flex: 1; flex-direction: column; gap: 6px; padding: 16px 20px 20px; }
  .meta { margin: 0; color: var(--muted); font-size: 12px; letter-spacing: 0.08em; }
  h2 { margin: 0; font-family: "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif CJK JP", serif; font-size: 20px; font-weight: 600; line-height: 1.4; }
  h2 a { color: inherit; text-decoration: none; }
  h2 a:hover { color: var(--accent); }
  .desc { margin: 0; color: var(--muted); font-size: 14px; }
  .links { display: flex; gap: 16px; margin: auto 0 0; padding-top: 8px; font-size: 14px; font-weight: 700; }
  .links a { color: var(--accent); text-decoration: none; }
  .links a:hover { text-decoration: underline; }
  footer { margin-top: 48px; color: var(--muted); font-size: 12px; }
  footer a { color: inherit; }
</style>
</head>
<body>
<main>
  <header>
    <h1>deck</h1>
    <p>hajimism のスライドと配布資料</p>
  </header>
  <ul>${decks.map(card).join("")}
  </ul>
  <footer>Built with <a href="https://github.com/hajimism/dek">dek</a>.</footer>
</main>
</body>
</html>
`;

writeFileSync(join(dist, "index.html"), html);
console.log(`wrote ${join(dist, "index.html")} (${decks.length} decks)`);
