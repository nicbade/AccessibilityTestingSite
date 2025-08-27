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