const menu_mobile = document.querySelector(".menu_mobile");
const nav = document.querySelector(".nav");

menu_mobile.addEventListener("click", mobilmenuClick);

function mobilmenuClick() {
  menu_mobile.classList.toggle("active");
  nav.classList.toggle("active");
}

nav.addEventListener("click", () => {
  menu_mobile.classList.remove("active");
  nav.classList.remove("active");
});