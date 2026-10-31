(() => {
  const roles = ["Aspiring AI/ML Engineer", "Data Science Student", "Machine Learning Enthusiast", "Builder of Practical AI"];
  const roleEl = document.getElementById("typed-role");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (roleEl && !reduceMotion) {
    let roleIndex = 0, charIndex = roles[0].length, deleting = true;
    function typeRole() {
      const word = roles[roleIndex];
      if (deleting) {
        charIndex--;
        roleEl.textContent = word.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 300); return; }
        setTimeout(typeRole, 35);
      } else {
        const next = roles[roleIndex];
        charIndex++;
        roleEl.textContent = next.slice(0, charIndex);
        if (charIndex >= next.length) { deleting = true; setTimeout(typeRole, 1800); return; }
        setTimeout(typeRole, 65);
      }
    }
    setTimeout(typeRole, 1800);
  }
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".nav a")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".placeholder-link").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert(`Add the real GitHub repository URL for "${link.dataset.project}" in index.html before publishing.`);
    });
  });
  const emailLink = document.querySelector(".email-placeholder");
  if (emailLink) emailLink.addEventListener("click", event => {
    if (emailLink.getAttribute("href").includes("YOUR_EMAIL")) {
      event.preventDefault();
      alert("Replace YOUR_EMAIL@example.com in index.html with your real email address.");
    }
  });
})();