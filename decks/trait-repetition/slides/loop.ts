// The spark runs once around the loop as the slide arrives, then rests back at 黒字.
const lap = 2600;

export default {
  motion: { "0": lap },
  draw(slide, { step, t }) {
    const orbit = slide.querySelector("[data-orbit]");
    if (!orbit) return;
    const p = step === "0" ? Math.min(t / lap, 1) : 1;
    const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    orbit.setAttribute("transform", `rotate(${eased * 360} 300 280)`);
  },
} satisfies DekSlide;
