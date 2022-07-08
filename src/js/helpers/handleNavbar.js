const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");

import handleSettings from "./handleSettings.js";

const showMenu = () => {
  if (
    navBar &&
    navToggle &&
    setterDarkMode &&
    setterBoardSize &&
    setterColors
  ) {
    // Click on these to expand
    const validExpanders = [setterDarkMode, setterBoardSize, setterColors];
    validExpanders.forEach((element) => {
      element.addEventListener("click", () => {
        navBar.classList.add("expander");
      });
    });

    // Click to either expand or shrink
    navToggle.addEventListener("click", () => {
      navBar.classList.toggle("expander");
    });
  }
};

// /*===== LINK ACTIVE  =====*/
// function handleNavLinksActive() {
//   navLinks.forEach((l) => {
//     l.classList.remove("active");
//   });
//   this.classList.add("active");
// }

/*===== COLLAPSE MENU  =====*/
const handleOpenCollapseMenu = () => {
  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
      // Find closest because user might click on icon
      const collapseMenu =
        this.querySelector(".collapse__menu") ||
        this.closest(".collapse__menu");
      collapseMenu && collapseMenu.classList.toggle("showCollapse");

      // Rotate icon
      const iconRotate = this.querySelector(".collapse__icon");
      iconRotate && iconRotate.classList.toggle("rotate");
    });
  }
};


/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu();
  handleSettings();
  handleOpenCollapseMenu();
}
