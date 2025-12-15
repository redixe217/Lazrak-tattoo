console.log("script.js - portfolio");

document.addEventListener("DOMContentLoaded", init);

const SUPABASE_URL = "https://ipyzlrvbejpvxmjbpmbf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_najTqwKPWCfSxu-E93zOGQ_xGV6r_kH";

const BUCKET = "portfolio"; // hvis den ikke hedder portfolio, ret her

let supabaseClient;

function init() {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const portfolio = document.getElementById("portfolio");
  if (!portfolio) {
    console.error("Mangler #portfolio i HTML");
    return;
  }

  setupLightbox();
  getPortfolioImages();
}

function getPortfolioImages() {
  supabaseClient.storage
    .from(BUCKET)
    .list("", { limit: 200 })
    .then(({ data, error }) => {
      if (error) {
        console.error("Supabase list() error:", error);
        return;
      }

      // "Et efter et" som de typisk ligger: vi tager dem i navne-rækkefølge.
      // Hvis du vil styre rækkefølgen, så giv filerne et prefix (01-, 02-, 03- ...)
      data.sort((a, b) => a.name.localeCompare(b.name));

      showPortfolioImages(data);
    });
}

function showPortfolioImages(files) {
  const portfolio = document.getElementById("portfolio");
  portfolio.innerHTML = ""; // ryd gammelt indhold

  files.forEach((file) => {
    // spring "mapper" og tomme entries over
    if (!file.name || file.name.endsWith("/")) return;

    const img = document.createElement("img");
    img.src = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file.name}`;
    img.alt = file.name;
    img.classList.add("portfolio-img");

    portfolio.appendChild(img);

    img.addEventListener("click", () => openLightbox(img.src));
  });
}

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