(function () {
  var header = document.getElementById("header");
  var hamburger = document.getElementById("hamburger");
  var nav = document.getElementById("nav");
  var form = document.getElementById("contato-form");
  var WA_NUMBER = "5513997476920";
  var DEFAULT_MSG = "Olá, Naty! Conheci seu trabalho pelo site e gostaria de saber mais sobre os treinos.";

  function waUrl(text) {
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text || DEFAULT_MSG);
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      hamburger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  document.querySelectorAll(".faq__item").forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      document.querySelectorAll(".faq__item").forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var nome = String(data.get("nome") || "").trim();
      var whatsapp = String(data.get("whatsapp") || "").trim();
      var objetivo = String(data.get("objetivo") || "").trim();
      var modalidade = String(data.get("modalidade") || "").trim();
      var mensagem = String(data.get("mensagem") || "").trim();

      if (!nome || !whatsapp || !objetivo || !modalidade || !mensagem) {
        form.reportValidity();
        return;
      }

      var text =
        "Olá, Naty! Conheci seu trabalho pelo site e gostaria de saber mais sobre os treinos.\n\n" +
        "Nome: " + nome + "\n" +
        "WhatsApp: " + whatsapp + "\n" +
        "Objetivo: " + objetivo + "\n" +
        "Modalidade: " + modalidade + "\n" +
        "Mensagem: " + mensagem;

      window.open(waUrl(text), "_blank", "noopener");
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach(function (el, index) {
    el.style.animationDelay = (index % 6) * 70 + "ms";
    observer.observe(el);
  });
})();
