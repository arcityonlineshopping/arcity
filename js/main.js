const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});
// Mobile dropdown toggle
const dropdown = document.querySelector(".dropdown > a");
const dropdownMenu = document.querySelector(".dropdown-menu");

if (dropdown && dropdownMenu) {
  dropdown.addEventListener("click", (e) => {
    // prevent jumping
    e.preventDefault();

    dropdownMenu.classList.toggle("open");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      dropdownMenu.classList.remove("open");
    }
  });
}
