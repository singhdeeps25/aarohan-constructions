const menu = document.querySelector(".menu");
const navLinks = document.querySelector(".nav-links");
menu?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
});
navLinks?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menu?.setAttribute("aria-expanded", "false");
}));

const filters = [...document.querySelectorAll(".filter")];
const items = [...document.querySelectorAll(".gallery-item")];
const count = document.querySelector("#gallery-count");
function updateGallery(filter) {
  let visible = 0;
  items.forEach(item => {
    const show = filter === "all" || item.dataset.category === filter;
    item.classList.toggle("hidden", !show);
    if (show) visible++;
  });
  if (count) count.textContent = `${visible} photograph${visible === 1 ? "" : "s"}`;
}
filters.forEach(btn => btn.addEventListener("click", () => {
  filters.forEach(f => {
    const active = f === btn;
    f.classList.toggle("active", active);
    f.setAttribute("aria-pressed", String(active));
  });
  updateGallery(btn.dataset.filter);
}));

const dialog = document.querySelector("#lightbox");
const dialogImg = document.querySelector("#lightbox-img");
const dialogTitle = document.querySelector("#lightbox-title");
const dialogCaption = document.querySelector("#lightbox-caption");
const position = document.querySelector("#lightbox-position");
let currentPhoto = 0;
function visibleItems() { return items.filter(item => !item.classList.contains("hidden")); }
function showPhoto(index) {
  const visible = visibleItems();
  if (!visible.length) return;
  currentPhoto = (index + visible.length) % visible.length;
  const item = visible[currentPhoto];
  const img = item.querySelector("img");
  dialogImg.src = img.src;
  dialogImg.alt = img.alt;
  dialogTitle.textContent = item.dataset.title || "Site photograph";
  dialogCaption.textContent = item.dataset.caption || "Aarohan Constructions";
  position.textContent = `${currentPhoto + 1} of ${visible.length}`;
}
items.forEach(item => item.addEventListener("click", () => {
  showPhoto(visibleItems().indexOf(item));
  if (dialog.showModal) dialog.showModal();
}));
document.querySelector(".close-lightbox")?.addEventListener("click", () => dialog.close());
document.querySelector("#prev-photo")?.addEventListener("click", () => showPhoto(currentPhoto - 1));
document.querySelector("#next-photo")?.addEventListener("click", () => showPhoto(currentPhoto + 1));
dialog?.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
dialog?.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") showPhoto(currentPhoto - 1);
  if (e.key === "ArrowRight") showPhoto(currentPhoto + 1);
});
document.querySelector("#year").textContent = new Date().getFullYear();
