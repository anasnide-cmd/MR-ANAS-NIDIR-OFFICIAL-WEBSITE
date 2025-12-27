document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Link in Bio page loaded");

  // Contoh animasi kecil: highlight bila klik
  document.querySelectorAll(".link-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("active");
      setTimeout(() => btn.classList.remove("active"), 300);
    });
  });
});