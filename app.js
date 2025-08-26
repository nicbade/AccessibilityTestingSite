//   <!-- Script for Accordion -->

    document.querySelectorAll(".accordion button").forEach(btn => {
      btn.addEventListener("click", () => {
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        document.getElementById(btn.getAttribute("aria-controls")).hidden = expanded;
      });
    });
