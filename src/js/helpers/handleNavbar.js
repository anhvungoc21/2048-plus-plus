const showMenu = (toggleId, navbarId, bodyId) => {
  const toggle = document.getElementById(toggleId);
  const navbar = document.getElementById(navbarId);

  if (toggle && navbar) {
    toggle.addEventListener("click", () => {
      navbar.classList.toggle("expander");
    });
  }
};

/*===== LINK ACTIVE  =====*/
const navLinks = document.querySelectorAll(".nav__link");
const handleNavLinksActive = () => {
  navLinks.forEach((l) => l.classList.remove("active"));
  this.classList.add("active");
};

/*===== COLLAPSE MENU  =====*/
const linkCollapses = document.getElementsByClassName("collapse__link");
for (let i = 0; i < linkCollapses.length; i++) {
  linkCollapses[i].addEventListener("click", function () {
    // Show collapseed menu
    const collapseMenu = this.nextElementSibling;
    collapseMenu.classList.toggle("showCollapse");

    // Rotate collapse icon
    const rotate = collapseMenu.previousElementSibling;
    rotate.classList.toggle("rotate");
  });
}

// const togglerDarkmode =  

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu("nav-toggle", "navbar");
  navLinks.forEach((l) => l.addEventListener("click", handleNavLinksActive));
}
