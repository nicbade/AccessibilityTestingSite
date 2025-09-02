//   <!-- Script for Accordion -->

document.querySelectorAll(".accordion button").forEach(btn => {
    btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        document.getElementById(btn.getAttribute("aria-controls")).hidden = expanded;
    });
});

// Script for button 

document.getElementById("customBtn").addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault(); // prevent page scroll on Space
        this.click();
    }
});

document.getElementById("customBtn").addEventListener("click", function () {
    alert("Custom Button Activated!");
});


// Script for Carousel 
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const pauseBtn = document.querySelector(".pause-btn");

  let currentSlide = 0;
  let autoPlay = true;
  let interval = setInterval(showNextSlide, 5000);

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.hidden = i !== index;
    });
  }

  function showNextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function showPrevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  prevBtn.addEventListener("click", showPrevSlide);
  nextBtn.addEventListener("click", showNextSlide);

  pauseBtn.addEventListener("click", () => {
    autoPlay = !autoPlay;
    pauseBtn.setAttribute("aria-pressed", String(!autoPlay));
    pauseBtn.textContent = autoPlay ? "Pause" : "Play";

    if (autoPlay) {
      interval = setInterval(showNextSlide, 5000);
    } else {
      clearInterval(interval);
    }
  });

  // Start with first slide visible
  showSlide(currentSlide);
});

// Script for Modal 
// Simple modal
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalBackdrop = document.getElementById("modalBackdrop");
let lastFocused;

function openModal() {
  lastFocused = document.activeElement;
  modalBackdrop.hidden = false;
  closeModalBtn.focus();

  // trap focus
  document.addEventListener("keydown", trapFocus);
}

function closeModal() {
  modalBackdrop.hidden = true;
  document.removeEventListener("keydown", trapFocus);
  if (lastFocused) lastFocused.focus();
}

function trapFocus(e) {
  if (e.key === "Escape") {
    closeModal();
  }
  if (e.key === "Tab") {
    const focusable = modalBackdrop.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
