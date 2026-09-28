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
- Color, type, space, radius, and motion in either stylesheet use token `var()` only. A value only one slide uses can be a token of its own on that slide's `.slide` rule in `slides/<id>.css`.
- Do not add `<style>`, `style=`, `<script>`, event handler attributes (`onclick=` and the like), or `javascript:` URLs inside slide HTML.
- Motion CSS cannot express lives in `slides/<id>.ts`: `export default { motion: { <step>: ms }, draw(slide, { index, step, t }) {} } satisfies DekSlide`. `DekSlide` is global, from `.dek/slide.d.ts`; do not import it. Key the slide's arrival, before its first beat, as `"0"`: every `data-step` element is hidden there, so draw what the slide shows before anything happens. Draw from `t` alone and set everything you touch on every call, with no timers and no imports, so video and screenshots can seek it. In `draw`, find elements by data-* attributes, not classes.
- Keep the deck self-contained: no remote URLs and no paths outside the deck.

## Checking a slide

- `dek check <slug> --shot` lints one slide and screenshots it at its last beat.
- `dek shot --sheet` tiles every slide on one image: read it to judge the deck's balance in one look, then open a slide's own shot for detail.
- One shot shows no motion. `dek shot <slug> --motion` lays the slide's beats out as rows, each held at moments through everything it moves and ending as the shot does. `dek shot <a> --to <b> --at 0.5` freezes the view transition between any two slides.

## Theme classes

From the project `theme.css`. A deck's own `theme.css` can differ; `dek theme` lists what a deck's theme defines.

- `card`
- `chip`
- `col`
- `dougu`
- `facts`
- `hima`
- `iki`
- `is-current`
- `is-filled`
- `is-shown`
- `kao`
- `kicker`
- `label`
- `lede`
- `mark`
- `note`
- `seal`
- `slide`
- `slide-title`
- `source`
- `stage`
- `stat`
- `timeline`
- `ude`
- `unit`
- `when`

## Theme tokens

- `--accent`
- `--bg`
- `--c-dougu`
- `--c-hima`
- `--c-iki`
- `--c-kao`
- `--c-ude`
- `--dur-draw`
- `--dur-long`
- `--dur-rise`
- `--ease-draw`
- `--ease-out`
- `--fg`
- `--font-body`
- `--font-title`
- `--gap`
- `--hair`
- `--line`
- `--line-soft`
- `--margin`
- `--muted`
- `--pad`
- `--paper-card`
- `--paper-deep`
- `--radius`
- `--rise`
- `--rule`
- `--seal-box`
- `--side`
- `--size-body`
- `--size-caption`
- `--size-hero`
- `--size-lede`
- `--size-seal`
- `--size-small`
- `--size-stat`
- `--size-title`
- `--stagger`
- `--step-transition`
- `--tone`

## Layouts

- `center`
- `compound`
- `cover`
- `default`
- `split`

For a layout's markup, run `dek theme <layout>`.

For commands, run `dek help --agent`.
<!-- dek:end -->
