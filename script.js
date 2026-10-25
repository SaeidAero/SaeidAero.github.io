
(() => {
  const journey = document.querySelector(".cinema");
  const frame = document.querySelector(".cinema-frame");
  const layers = [...document.querySelectorAll(".image-layer")];

  const title = document.getElementById("scene-title");
  const description = document.getElementById("scene-description");
  const number = document.getElementById("scene-number");
  const count = document.getElementById("progress-count");
  const progressFill = document.getElementById("progress-fill");

  if (!journey || !frame || layers.length !== 5) return;

  const scenes = [
    {
      title: "فراتر از لحظه",
      description: "هر مسیر، داستانی برای کشف کردن دارد."
    },
    {
      title: "قدم به قدم",
      description: "حرکت ادامه دارد؛ هر لحظه، نمایی تازه."
    },
    {
      title: "در دل مسیر",
      description: "گاهی زیبایی، در خودِ حرکت پنهان است."
    },
    {
      title: "نگاهی متفاوت",
      description: "از زاویه‌ای تازه، همه‌چیز تغییر می‌کند."
    },
    {
      title: "داستان ادامه دارد",
      description: "پایان یک قاب، آغاز ماجرای بعدی است."
    }
  ];

  let currentScene = -1;
  let ticking = false;

  const clamp = (value, min, max) =>
    Math.min(max, Math.max(min, value));

  // نرم‌سازی حرکت برای زوم و جابه‌جایی دوربین
  const ease = (value) => {
    const x = clamp(value, 0, 1);
    return x * x * (3 - 2 * x);
  };

  function setSceneText(index) {
    if (index === currentScene) return;

    currentScene = index;

    title.textContent = scenes[index].title;
    description.textContent = scenes[index].description;
    number.textContent =
      `CHAPTER ${String(index + 1).padStart(2, "0")} / 05`;

    count.textContent =
      `${String(index + 1).padStart(2, "0")} — 05`;
  }

  function updateJourney() {
    ticking = false;

    const rect = journey.getBoundingClientRect();
    const scrollRange = journey.offsetHeight - window.innerHeight;

    const travelled = clamp(-rect.top, 0, Math.max(1, scrollRange));
    const progress = travelled / Math.max(1, scrollRange);

    // از صفر تا چهار؛ مقدار اعشاری حرکت بین دو عکس را مشخص می‌کند.
    const position = progress * (layers.length - 1);
    const activeIndex = Math.min(
      layers.length - 1,
      Math.floor(position)
    );

    const nextIndex = Math.min(
      layers.length - 1,
      activeIndex + 1
    );

    const mix = ease(position - activeIndex);

    layers.forEach((layer, index) => {
      let opacity = 0;

      if (index === activeIndex) {
        opacity = 1 - mix;
      }

      if (index === nextIndex && nextIndex !== activeIndex) {
        opacity = mix;
      }

      // قاب ثابت می‌ماند؛ فقط خود تصاویر حرکت می‌کنند.
      const distance = position - index;
      const zoom = 1.09 + (1 - Math.min(1, Math.abs(distance))) * 0.055;

      const driftX = distance * -1.4;
      const driftY = distance * 0.8;

      layer.style.opacity = String(opacity);
      layer.style.transform =
        `translate3d(${driftX}%, ${driftY}%, 0) scale(${zoom})`;
      layer.style.zIndex = String(
        index === activeIndex || index === nextIndex ? 1 : 0
      );
    });

    progressFill.style.width = `${progress * 100}%`;

    // متن و شماره در میانه‌ی گذار به صحنه بعدی تغییر می‌کنند.
    const textIndex = Math.min(
      scenes.length - 1,
      Math.round(position)
    );

    setSceneText(textIndex);
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateJourney);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);

  // بارگذاری اولیه؛ عکس اول از همان ابتدا نمایش داده می‌شود.
  layers.forEach((layer) => {
    layer.style.transition = "opacity 80ms linear";
  });

  updateJourney();
})();
