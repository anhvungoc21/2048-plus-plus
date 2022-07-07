const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId),
    bodypadding = document.getElementById(bodyId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("expander");
      bodypadding.classList.toggle("body-pd");
    });
  }
};

/*===== LINK ACTIVE  =====*/
const navLinks = document.querySelectorAll(".nav__link");
function handleNavLinksActive() {
  navLinks.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
}

/*===== COLLAPSE MENU  =====*/
const linkCollapses = document.getElementsByClassName("collapse__link");
let i;

for (i = 0; i < linkCollapses.length; i++) {
  linkCollapses[i].addEventListener("click", function () {
    // Show collapseed menu
    const collapseMenu = this.nextElementSibling;
    collapseMenu.classList.toggle("showCollapse");

    // Rotate collapse icon
    const rotate = collapseMenu.previousElementSibling;
    rotate.classList.toggle("rotate");
  });
}

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu("nav-toggle", "navbar", "body-pd");
  navLinks.forEach((l) => l.addEventListener("click", handleNavLinksActive));
}
