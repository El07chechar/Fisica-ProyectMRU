const dropdownBtn = document.getElementById("dropdownBtn");
const dropdownMenu = document.getElementById("dropdownMenu");
const dropdownItems = document.querySelectorAll(".dropdown-item");

dropdownBtn.addEventListener("click", () => {
  dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
});

dropdownItems.forEach(item => {
  item.addEventListener("click", () => {
    dropdownBtn.textContent = `${item.textContent} ▼`;
    dropdownMenu.style.display = "none";
  });
});


window.addEventListener("click", (e) => {
  if (!e.target.matches('.dropdown-button')) {
    dropdownMenu.style.display = "none";
  }
});
