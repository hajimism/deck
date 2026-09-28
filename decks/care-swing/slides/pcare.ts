// Counts the running product down and slides the bar's edge during each factor's beat.
const RUN = [1, 0.8, 0.48, 0.24, 0.168, 0.1008];
const MS = 900;

function ease(p: number): number {
  return 1 - Math.pow(1 - p, 3);
}

export default {
  motion: { "pcare-1": MS, "pcare-2": MS, "pcare-3": MS, "pcare-4": MS, "pcare-5": MS },
  draw(slide, { step, t }) {
    const match = /^pcare-(\d)$/.exec(step);
    const active = match ? Number(match[1]) : 0;
    const p = ease(Math.min(1, Math.max(0, t / MS)));
    for (let k = 1; k <= 5; k++) {
      const value = k === active ? RUN[k - 1] + (RUN[k] - RUN[k - 1]) * p : RUN[k];
      const num = slide.querySelector<HTMLElement>(`[data-count="${k}"]`);
      if (num) num.textContent = value.toFixed(2);
      const cut = slide.querySelector<HTMLElement>(`[data-cut="${k}"]`);
      if (cut) cut.style.left = `${value * 100}%`;
    }
  },
} satisfies DekSlide;
