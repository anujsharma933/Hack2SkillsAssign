/* ── Countdown ── */
!(function () {
  const el = document.getElementById("cd");
  const target = new Date("2025-07-20T23:59:59");
  function tick() {
    const d = target - Date.now();
    if (d <= 0) {
      el.textContent = "Closed";
      return;
    }
    const dd = Math.floor(d / 86400000),
      hh = Math.floor((d % 86400000) / 3600000),
      mm = Math.floor((d % 3600000) / 60000),
      ss = Math.floor((d % 60000) / 1000);
    el.textContent = `${dd}d ${hh}h ${mm}m ${ss}s`;
  }
  tick();
  setInterval(tick, 1000);
})();

/* ── Challenge expand ── */
function xpand(row) {
  if (row.querySelector(".ch-lm")) return;
  document.querySelectorAll(".dyn-lm").forEach((b) => b.remove());
  if (row.dataset.x === "1") {
    row.dataset.x = "0";
    return;
  }
  document.querySelectorAll('[data-x="1"]').forEach((r) => (r.dataset.x = "0"));
  row.dataset.x = "1";
  const d = row.querySelector(".ch-d");
  if (!d) return;
  const btn = document.createElement("button");
  btn.className = "ch-lm dyn-lm";
  btn.textContent = "Learn More";
  btn.onclick = (e) => e.stopPropagation();
  d.insertAdjacentElement("afterend", btn);
}

/* ── Scroll reveal ── */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 75}ms`;
  ro.observe(el);
});

/* ── Active nav link on scroll ── */
const sections = [
  "who",
  "about",
  "why",
  "how",
  "challenges",
  "schedule",
  "rewards",
  "faq",
];
const aLinks = document.querySelectorAll(".nav-links a");
window.addEventListener(
  "scroll",
  () => {
    let cur = "";
    sections.forEach((id) => {
      const s = document.getElementById(id);
      if (s && scrollY >= s.offsetTop - 150) cur = id;
    });
    aLinks.forEach((a) => {
      const href = a.getAttribute("href").slice(1);
      a.classList.toggle("active", href === cur);
    });
  },
  { passive: true },
);
