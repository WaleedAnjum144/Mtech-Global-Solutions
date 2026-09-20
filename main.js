(function () {
  var root = document.documentElement;
  var KEY = 'mtech-lang';
  function setLang(v) {
    root.setAttribute('data-lang', v);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.setLang === v)); });
    root.lang = (v === 'zh') ? 'zh-CN' : 'en';
    try { localStorage.setItem(KEY, v); } catch (e) { }
  }
  var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) { }
  if (saved === 'en' || saved === 'zh' || saved === 'both') setLang(saved);
  document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.dataset.setLang); }); });

  var toc = document.getElementById('toc'), btn = document.getElementById('menuBtn'), closeBtn = document.getElementById('tocClose');
  function openToc() { toc.classList.add('open'); toc.setAttribute('aria-hidden', 'false'); btn.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; setTimeout(function () { closeBtn.focus(); }, 50); }
  function closeToc() { toc.classList.remove('open'); toc.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; btn.focus({ preventScroll: true }); }
  btn.addEventListener('click', openToc);
  toc.querySelectorAll('[data-close]').forEach(function (el) { el.addEventListener('click', function () { toc.classList.remove('open'); toc.setAttribute('aria-hidden', 'true'); btn.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; }); });
  closeBtn.addEventListener('click', closeToc);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && toc.classList.contains('open')) closeToc(); });
})();



document.addEventListener("DOMContentLoaded", () => {

  const slider = document.querySelector(".hero-slider");

  if (!slider) return;

  const slides = [...slider.querySelectorAll(".hero-slide")];

  const prev = slider.querySelector(".hero-prev");
  const next = slider.querySelector(".hero-next");
  const progress = slider.querySelector(".hero-progress-bar");

  let current = 0;
  let timer;

  const duration = 6000;


  function showSlide(index) {

    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === current);
    });

    /* restart progress animation */
    progress.style.animation = "none";

    void progress.offsetWidth;

    progress.style.animation =
      `heroProgress ${duration}ms linear`;
  }


  function nextSlide() {
    showSlide(current + 1);
    restartTimer();
  }


  function prevSlide() {
    showSlide(current - 1);
    restartTimer();
  }


  function restartTimer() {

    clearInterval(timer);

    timer = setInterval(() => {
      showSlide(current + 1);
    }, duration);
  }


  next.addEventListener("click", nextSlide);
  prev.addEventListener("click", prevSlide);


  /* pause when mouse is over hero */
  slider.addEventListener("mouseenter", () => {
    clearInterval(timer);
  });

  slider.addEventListener("mouseleave", () => {
    restartTimer();
  });


  /* keyboard */
  document.addEventListener("keydown", e => {

    if (e.key === "ArrowRight") {
      nextSlide();
    }

    if (e.key === "ArrowLeft") {
      prevSlide();
    }

  });


  showSlide(0);
  restartTimer();

});








/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems = document.querySelectorAll(
  '.sec-head, .two, .stat, .hist-card, .cert-card, ' +
  '.why-list li, .pcard, .opt, .bank-grid li, .step, ' +
  '.office, .gallery li, .listcard, .benefits li, .division'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('reveal', 'visible');

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.08,
    rootMargin: '0px 0px -70px 0px'
  }
);

revealItems.forEach((item) => {
  item.classList.add('reveal');
  revealObserver.observe(item);
});

