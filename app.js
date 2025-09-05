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
// Script for Carousel 
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const pauseBtn = document.querySelector(".pause-btn");

  let currentSlide = 0;
  let isPlaying = false;   // start paused
  let interval = null;

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

  function stopAutoplay() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function startAutoplay() {
    stopAutoplay(); // guard against multiple intervals
    interval = setInterval(showNextSlide, 5000);
  }

  function updateToggleUI() {
    // Button label reflects the ACTION available
    // - When playing: show "Pause"
    // - When paused:  show "Play"
    pauseBtn.textContent = isPlaying ? "Pause" : "Play";
    pauseBtn.setAttribute("aria-pressed", String(isPlaying));
  }

  prevBtn.addEventListener("click", showPrevSlide);
  nextBtn.addEventListener("click", showNextSlide);

  pauseBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    updateToggleUI();
  });

  // Initial render: first slide visible, paused UI
  showSlide(currentSlide);
  updateToggleUI();
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

// Table Component 
// Accessible sortable table
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".a11y-table").forEach(initA11yTable);
});

function initA11yTable(table) {
  const ths = Array.from(table.querySelectorAll("thead th"));
  const sortButtons = ths.map(th => th.querySelector(".sort")).filter(Boolean);
  const tbody = table.querySelector("tbody");
  const status = document.getElementById("table-status");

  // Preserve original order for stable sorting
  Array.from(tbody.rows).forEach((tr, i) => (tr.dataset.origIndex = i));

  sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const col = parseInt(btn.dataset.col, 10);
      const type = btn.dataset.type || inferColType(tbody, col);
      toggleSort(ths, col);                 // updates aria-sort on THs
      const dir = getSortDirection(ths[col]); // "ascending" or "descending"
      sortRows(tbody, col, dir, type);
      if (status) status.textContent = `Sorted by ${btn.textContent.trim()}, ${dir}.`;
    });

    // activate with Enter/Space also works since it's a <button>
  });
}

function inferColType(tbody, col) {
  // Look at first non-empty cell; if numeric, sort as number
  for (const row of tbody.rows) {
    const text = getCellText(row, col);
    if (text && !isNaN(parseFloat(text))) return "number";
  }
  return "text";
}

function toggleSort(ths, colIndex) {
  ths.forEach((th, i) => {
    if (i === colIndex) {
      const current = th.getAttribute("aria-sort") || "none";
      const next = current === "ascending" ? "descending" : "ascending";
      th.setAttribute("aria-sort", next);
    } else {
      th.setAttribute("aria-sort", "none");
    }
  });
}

function getSortDirection(th) {
  return th.getAttribute("aria-sort") === "descending" ? "descending" : "ascending";
}

function sortRows(tbody, col, dir, type) {
  const rows = Array.from(tbody.rows);

  const comparator = (a, b) => {
    const av = getCellText(a, col);
    const bv = getCellText(b, col);
    if (type === "number") {
      const an = parseFloat(av) || 0;
      const bn = parseFloat(bv) || 0;
      return an - bn || a.dataset.origIndex - b.dataset.origIndex;
    }
    // text compare (case-insensitive)
    const res = av.localeCompare(bv, undefined, { sensitivity: "base" });
    return res || a.dataset.origIndex - b.dataset.origIndex;
  };

  rows.sort(comparator);
  if (dir === "descending") rows.reverse();

  // Re-append in sorted order
  rows.forEach(row => tbody.appendChild(row));
}

function getCellText(row, col) {
  // col 0 is a row header (<th scope="row">) in this table
  const cell = row.cells[col] || row.querySelectorAll("th[scope='row']")[0];
  return (cell ? cell.textContent : "").trim();
}
