// Main JS for navigation, smooth scrolling, form validation, and theme toggle

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.querySelector("#nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const yearSpan = document.querySelector("#year");
  const contactForm = document.querySelector("#contact-form");
  const themeToggleBtn = document.querySelector(".theme-toggle");
  const themeToggleIcon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

  // Helpers
  function updateThemeToggleIcon() {
    if (!themeToggleBtn || !themeToggleIcon) return;

    const isLight = body.classList.contains("theme--light");
    if (isLight) {
      themeToggleIcon.classList.remove("fa-moon");
      themeToggleIcon.classList.add("fa-sun");
      themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
    } else {
      themeToggleIcon.classList.remove("fa-sun");
      themeToggleIcon.classList.add("fa-moon");
      themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
    }
  }

  // Initialize theme from localStorage (default: light)
  const storedTheme = localStorage.getItem("theme");
  
  if (storedTheme === "dark") {
    // User chose dark before -> remove light class
    body.classList.remove("theme--light");
  } else {
    // Default or "light" -> ensure light class present
    body.classList.add("theme--light");
  }
  
  updateThemeToggleIcon();
  // Theme toggle click handler
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("theme--light");
      const newTheme = body.classList.contains("theme--light") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      updateThemeToggleIcon();
    });
  }

  // Set current year in footer
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav__menu--open");
      navToggle.classList.toggle("nav__toggle--active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Smooth scrolling navigation
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      event.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

      // Update active state
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");

      // Close mobile menu after clicking a link
      if (navMenu && navMenu.classList.contains("nav__menu--open")) {
        navMenu.classList.remove("nav__menu--open");
        if (navToggle) {
          navToggle.classList.remove("nav__toggle--active");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Basic contact form validation
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.querySelector("#name");
      const emailInput = document.querySelector("#email");
      const messageInput = document.querySelector("#message");
      const nameError = document.querySelector("#name-error");
      const emailError = document.querySelector("#email-error");
      const messageError = document.querySelector("#message-error");
      const formSuccess = document.querySelector("#form-success");

      // Reset messages
      [nameError, emailError, messageError].forEach((el) => {
        if (el) el.textContent = "";
      });
      if (formSuccess) formSuccess.textContent = "";

      let hasError = false;

      // Name validation
      const nameValue = nameInput.value.trim();
      if (nameValue.length === 0) {
        nameError.textContent = "Please enter your name.";
        hasError = true;
      } else if (nameValue.length < 2) {
        nameError.textContent = "Name should be at least 2 characters.";
        hasError = true;
      }

      // Email validation
      const emailValue = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailValue.length === 0) {
        emailError.textContent = "Please enter your email.";
        hasError = true;
      } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        hasError = true;
      }

      // Message validation
      const messageValue = messageInput.value.trim();
      if (messageValue.length === 0) {
        messageError.textContent = "Please enter a message.";
        hasError = true;
      } else if (messageValue.length < 10) {
        messageError.textContent = "Message should be at least 10 characters.";
        hasError = true;
      }

      if (!hasError) {
        if (formSuccess) {
          formSuccess.textContent =
            "Thank you for reaching out! I will get back to you soon.";
        }
        contactForm.reset();
      }
    });
  }
});