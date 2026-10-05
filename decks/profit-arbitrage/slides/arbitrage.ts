// As the slide arrives, the carrier walks the water uphill and the price climbs with it.
const climb = 2800;

export default {
  motion: { "0": climb },
  draw(slide, { step, t }) {
    const trail = slide.querySelector<SVGPathElement>("[data-trail]");
    const carrier = slide.querySelector("[data-carrier]");
    const price = slide.querySelector("[data-price]");
    if (!trail || !carrier || !price) return;
    const p = step === "0" ? Math.min(t / climb, 1) : 1;
    const eased = p < 0.5 ? 2 * p * p : 1 - (-2 * p + 2) ** 2 / 2;
    const at = trail.getPointAtLength(eased * trail.getTotalLength());
    carrier.setAttribute("transform", `translate(${at.x} ${at.y})`);
    trail.setAttribute("stroke-dashoffset", String(1 - eased));
    price.textContent = String(Math.round((50 + 450 * eased) / 10) * 10);
  },
} satisfies DekSlide;
