const yearNode = document.getElementById("year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  reveals.forEach((node) => revealObserver.observe(node));
} else {
  reveals.forEach((node) => node.classList.add("is-visible"));
}

const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabPanels = document.querySelectorAll("[data-tab-panel]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tabTarget;

    tabButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === target;
      panel.hidden = !isActive;
      requestAnimationFrame(() => {
        panel.classList.toggle("is-active", isActive);
      });
    });
  });
});

const accordionTriggers = document.querySelectorAll(".accordion-trigger");

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const isOpen = trigger.getAttribute("aria-expanded") === "true";
    const panel = trigger.nextElementSibling;

    trigger.setAttribute("aria-expanded", String(!isOpen));
    if (panel) {
      panel.hidden = isOpen;
    }
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteNav.classList.toggle("is-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteNav.classList.remove("is-open");
    });
  });
}

const sections = [...document.querySelectorAll("main section[id]")];

if ("IntersectionObserver" in window && sections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    {
      threshold: 0.45,
    }
  );

  sections.forEach((section) => navObserver.observe(section));
}
