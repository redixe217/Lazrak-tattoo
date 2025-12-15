document.addEventListener("DOMContentLoaded", async () => {
  const SUPABASE_URL = "https://ipyzlrvbejpvxmjbpmbf.supabase.co"; // replace with your project URL
  const SUPABASE_ANON_KEY = "sb_publishable_najTqwKPWCfSxu-E93zOGQ_xGV6r_kH"; // replace with your anon key

  // Create Supabase client (v1 syntax)
  const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const portfolio = document.getElementById("portfolio");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".close");

  // Fetch list of files from the bucket
  const { data: files, error } = await supabase.storage.from("portfolio").list();

  if (error) {
    console.error("Error fetching images:", error);
    return;
  }

  console.log("Supabase files:", files); // Debug: see the files array in the console

  // Create image elements dynamically
  files.forEach((file) => {
    const img = document.createElement("img");
    img.src = `${SUPABASE_URL}/storage/v1/object/public/portfolio/${file.name}`;
    img.alt = file.name;
    img.classList.add("portfolio-img");
    portfolio.appendChild(img);

    // Lightbox click behavior
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });

  // Lightbox close behavior
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
});
