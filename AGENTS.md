<!-- dek:begin (dek rewrites this block; write your own notes outside it) -->
# dek

A build system for talks. Write what you will say; dek builds, measures, and ships the rest.

## Principles

- `script.md` is the source of truth for order, script, and timing.
- Each slide is a `<section class="slide">` fragment.
- Conventions are enforced by lint; a deck is done when lint passes.

## Conventions

- One `##` heading is one slide. HTML lives in `slides/<id>.html`.
- Shared look lives in `theme.css`. Decoration only one slide uses lives in `slides/<id>.css`, which is scoped to that slide.
- Use only classes defined in `theme.css` or in that slide's own `slides/<id>.css`.
- Color, type, space, radius, and motion in either stylesheet use token `var()` only.
- Do not add `<style>`, `style=`, `<script>`, event handler attributes (`onclick=` and the like), or `javascript:` URLs inside slide HTML.
- Motion CSS cannot express lives in `slides/<id>.ts`: `export default { motion: { <step>: ms }, draw(slide, { index, step, t }) {} } satisfies DekSlide`. `DekSlide` is global, from `.dek/slide.d.ts`; do not import it. Draw from `t` alone and set everything you touch on every call, with no timers and no imports, so video and screenshots can seek it. In `draw`, find elements by data-* attributes, not classes.
- Keep the deck self-contained: no remote URLs and no paths outside the deck.

## Theme classes

From the project `theme.css`. A deck's own `theme.css` can differ; `dek theme` lists what a deck's theme defines.

- `col`
- `figure`
- `figure-small`
- `is-current`
- `is-shown`
- `node`
- `node-parent`
- `slide`
- `slide-title`

## Theme tokens

- `--accent`
- `--bg`
- `--fg`
- `--font-body`
- `--font-title`
- `--gap`
- `--muted`
- `--pad`
- `--radius`
- `--size-body`
- `--size-caption`
- `--size-title`
- `--step-transition`

## Layouts

- `default`
- `full-bleed`
- `quote`
- `title`
- `two-col`

For a layout's markup, run `dek theme <layout>`.

For commands, run `dek help --agent`.
<!-- dek:end -->
