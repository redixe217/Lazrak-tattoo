/* ---------------- Lightbox ---------------- */

function setupLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.querySelector(".close");

  if (!lightbox) console.warn("Mangler #lightbox i HTML (popup virker ikke)");
  if (!closeBtn) console.warn("Mangler .close i HTML (luk-knap virker ikke)");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
}

function openLightbox(src) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  if (!lightbox || !lightboxImg) return;

  lightbox.style.display = "flex";
  lightboxImg.src = src;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  lightbox.style.display = "none";
}