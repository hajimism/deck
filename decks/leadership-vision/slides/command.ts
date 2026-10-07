// At the last beat, the odds meter fills from where things stand to where the leader's work takes them.
const fill = 1400;

export default {
  motion: { "command-odds": fill },
  draw(slide, { step, t }) {
    const meter = slide.querySelector<HTMLElement>("[data-odds]");
    if (!meter) return;
    const reached = step === "command-odds" || step === "2";
    const p = reached ? Math.min(t / fill, 1) : 0;
    const eased = 1 - (1 - p) ** 3;
    meter.style.setProperty("--v", String(3 + 4 * eased));
  },
} satisfies DekSlide;
