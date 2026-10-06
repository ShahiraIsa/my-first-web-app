document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const navList = document.getElementById("nav-links");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Smooth scroll for in-page links, and close the mobile menu after a click
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || !targetId.startsWith("#")) return;

      const section = document.querySelector(targetId);
      if (!section) return;

      event.preventDefault();
      section.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      navList.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    const open = navList.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  // Highlight the nav link for the section currently in view
  const sections = [...navLinks]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
});
