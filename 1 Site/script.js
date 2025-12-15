const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const images = document.querySelectorAll(".portfolio-img");
const closeBtn = document.querySelector(".close");

images.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
