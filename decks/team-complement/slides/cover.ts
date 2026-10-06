// As the slide arrives, the team's columns fill one by one: each person's 凸 poured into the gap.
const fill = 1800;
const lag = 260;

export default {
  motion: { "0": fill },
  draw(slide, { step, t }) {
    const columns = slide.querySelectorAll<HTMLElement>("[data-team] li");
    columns.forEach((column, i) => {
      const v = Number(column.dataset.v ?? 0);
      const span = fill - lag * (columns.length - 1);
      const p = step === "0" ? Math.min(Math.max((t - lag * i) / span, 0), 1) : 1;
      const eased = 1 - (1 - p) ** 3;
      column.style.setProperty("--v", String(v * eased));
    });
  },
} satisfies DekSlide;
