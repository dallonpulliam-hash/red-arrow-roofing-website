// Red Arrow Roofing starter website interactions
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Customer review carousel
const reviewSlides = Array.from(document.querySelectorAll(".review-slide"));
const reviewCount = document.querySelector(".review-count");
let activeReview = 0;

function showReview(index) {
  if (!reviewSlides.length) return;
  activeReview = (index + reviewSlides.length) % reviewSlides.length;
  reviewSlides.forEach((slide, i) => slide.classList.toggle("active", i === activeReview));
  if (reviewCount) reviewCount.innerHTML = `${String(activeReview + 1).padStart(2, "0")} <i>/</i> ${String(reviewSlides.length).padStart(2, "0")}`;
}
document.querySelector(".review-prev")?.addEventListener("click", () => showReview(activeReview - 1));
document.querySelector(".review-next")?.addEventListener("click", () => showReview(activeReview + 1));
if (reviewSlides.length > 1) {
  window.setInterval(() => showReview(activeReview + 1), 6500);
}

// Project gallery lightbox
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.querySelector("img")?.alt || "Roofing project";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose?.focus();
  });
});

function closeLightbox() {
  if (!lightbox) return;
  lightbox.hidden = true;
  document.body.style.overflow = "";
}
lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

// Functional mailto estimate form. A real backend or form provider is required
// if submissions should be stored or sent without opening the visitor's email app.
const estimateForm = document.querySelector("#estimate-form");
const formFeedback = document.querySelector("#form-feedback");

estimateForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!estimateForm.reportValidity()) return;

  const formData = new FormData(estimateForm);
  const value = (key) => String(formData.get(key) || "").trim();
  const subject = `Roofing estimate request — ${value("name")}`;
  const body = [
    "Red Arrow Roofing estimate request",
    "",
    `Name: ${value("name")}`,
    `Phone: ${value("phone")}`,
    `Email: ${value("email")}`,
    `Roof type: ${value("roofType") || "Not specified"}`,
    `Service: ${value("projectType") || "Not specified"}`,
    `Project address/city: ${value("address") || "Not specified"}`,
    "",
    "Project details:",
    value("message")
  ].join("\n");

  const mailto = `mailto:scott@redarrowroofing.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if (formFeedback) {
    formFeedback.textContent = "Your email app should open with the request filled in. Review it and press Send to contact Red Arrow Roofing.";
  }
  window.location.href = mailto;
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();
