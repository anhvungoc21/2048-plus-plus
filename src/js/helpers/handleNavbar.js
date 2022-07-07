const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const togglerDarkMode = document.getElementById("switch-dark");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");

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

const toggleDarkMode = () => {
  const css = document.querySelector("[rel='stylesheet']");
  if (css.href.includes("light-theme")) {
    css.href = "./src/css/dark-theme.css";
  } else {
    css.href = "./src/css/light-theme.css";
  }
  console.log(css.href);
};

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu();
  // navLinks.forEach((l) => {
  //   l.addEventListener("click", handleNavLinksActive);
  // });
  togglerDarkMode.addEventListener("click", toggleDarkMode);
}
