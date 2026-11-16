
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuToggle.textContent =
    navMenu.classList.contains("active") ? "✕" : "☰";
});

// Close menu after clicking a link
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// Contact form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please complete all fields.";
    return;
  }

  const subject = encodeURIComponent("Website enquiry from " + name);

  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  formMessage.textContent = "Opening your email application...";

  window.location.href =
    "mailto:hello@example.com?subject=" + subject + "&body=" + body;
});

// Reveal sections on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".service-card, .work-card, .about-grid, .contact-grid"
).forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(25px)";
  element.style.transition = "opacity .8s ease, transform .8s ease";
  observer.observe(element);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".visible").forEach(element => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
});

const revealStyle = document.createElement("style");

revealStyle.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(revealStyle);
