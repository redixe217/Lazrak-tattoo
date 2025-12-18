console.log("script.js - portfolio");

document.addEventListener("DOMContentLoaded", init);

const SUPABASE_URL = "https://ipyzlrvbejpvxmjbpmbf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_najTqwKPWCfSxu-E93zOGQ_xGV6r_kH";

const BUCKET = "portfolio";

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
    .list("", { limit: 27 })
    .then(({ data, error }) => {
      if (error) {
        console.error("Supabase list() error:", error);
        return;
      }

      showPortfolioImages(data);
    });
}

function showPortfolioImages(files) {
  const portfolio = document.getElementById("portfolio");
  portfolio.innerHTML = ""; 

  files.forEach((file) => {

    if (!file.name || file.name.endsWith("/")) return;
    if (file.name === ".emptyFolderPlaceholder") return;
    const img = document.createElement("img");
    img.src = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${file.name}`;
    img.alt = "Billede af tatovering";
    img.classList.add("portfolio-img");

    portfolio.appendChild(img);

    img.addEventListener("click", () => openLightbox(img.src));
  });
}

