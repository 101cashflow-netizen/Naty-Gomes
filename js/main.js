/**
 * Naty Gomes Personal Trainer - Scripts Interativos
 */
(function () {
  'use strict';

  var WA_NUMBER = "5513997476920";
  var header = document.getElementById("site-header");
  var menuBtn = document.getElementById("menu-btn");
  var menuIcon = document.getElementById("menu-icon");
  var mobileNav = document.getElementById("mobile-nav");
  var contactForm = document.getElementById("contact-form");

  // 1. Sombra e elevação dinâmica no Header ao rolar
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("shadow-[0_4px_20px_rgba(27,59,43,0.08)]", "bg-surface/95");
      header.classList.remove("shadow-[0_1px_8px_rgba(27,59,43,0.05)]", "bg-surface/90");
    } else {
      header.classList.remove("shadow-[0_4px_20px_rgba(27,59,43,0.08)]", "bg-surface/95");
      header.classList.add("shadow-[0_1px_8px_rgba(27,59,43,0.05)]", "bg-surface/90");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 2. Menu Hambúrguer Mobile
  if (menuBtn && mobileNav) {
    function toggleMobileMenu(open) {
      var isOpen = typeof open === 'boolean' ? open : mobileNav.classList.contains("hidden");
      if (isOpen) {
        mobileNav.classList.remove("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
        menuBtn.setAttribute("aria-label", "Fechar menu de navegação");
        if (menuIcon) menuIcon.textContent = "close";
      } else {
        mobileNav.classList.add("hidden");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Abrir menu de navegação");
        if (menuIcon) menuIcon.textContent = "menu";
      }
    }

    menuBtn.addEventListener("click", function () {
      toggleMobileMenu();
    });

    // Fechar ao clicar em um link interno
    document.querySelectorAll(".mobile-link").forEach(function (link) {
      link.addEventListener("click", function () {
        toggleMobileMenu(false);
      });
    });

    // Fechar com a tecla Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobileNav.classList.contains("hidden")) {
        toggleMobileMenu(false);
        menuBtn.focus();
      }
    });
  }

  // 3. FAQ Accordion com acessibilidade ARIA
  document.querySelectorAll(".faq-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var isExpanded = button.getAttribute("aria-expanded") === "true";
      var content = button.nextElementSibling;
      var icon = button.querySelector(".faq-icon");

      // Fechar outros itens (comportamento de acordeão harmonioso)
      document.querySelectorAll(".faq-toggle").forEach(function (otherBtn) {
        if (otherBtn !== button) {
          otherBtn.setAttribute("aria-expanded", "false");
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.classList.add("hidden");
            otherBtn.nextElementSibling.classList.remove("block");
          }
          var otherIcon = otherBtn.querySelector(".faq-icon");
          if (otherIcon) otherIcon.classList.remove("rotate-180");
        }
      });

      // Alternar o item clicado
      button.setAttribute("aria-expanded", !isExpanded);
      if (isExpanded) {
        content.classList.add("hidden");
        content.classList.remove("block");
        if (icon) icon.classList.remove("rotate-180");
      } else {
        content.classList.remove("hidden");
        content.classList.add("block");
        if (icon) icon.classList.add("rotate-180");
      }
    });
  });

  // 4. Formulário de Triagem para WhatsApp
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var data = new FormData(contactForm);
      var nome = String(data.get("nome") || "").trim();
      var whatsapp = String(data.get("whatsapp") || "").trim();
      var objetivo = String(data.get("objetivo") || "").trim();
      var modalidade = String(data.get("modalidade") || "").trim();
      var mensagem = String(data.get("mensagem") || "").trim();

      if (!nome || !whatsapp) {
        contactForm.reportValidity();
        return;
      }

      var text = "Olá, Naty! Vim pelo site e gostaria de agendar uma conversa sobre os treinos.\n\n";
      text += "*Nome:* " + nome + "\n";
      text += "*WhatsApp:* " + whatsapp + "\n";
      text += "*Objetivo:* " + objetivo + "\n";
      text += "*Modalidade:* " + modalidade + "\n";
      if (mensagem) {
        text += "*Mensagem/Observações:* " + mensagem + "\n";
      }

      var waUrl = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(text);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    });
  }
})();
