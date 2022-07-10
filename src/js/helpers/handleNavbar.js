const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");
const infoViewer = document.getElementById("info");

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

// View info 2048++
const showInfoModal = () => {
  const infoModal = document.getElementById("modal--info");
  const btnCloseModal = infoModal.querySelector(".btn--close-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const lossModal = document.getElementById("modal--loss");
  // Show info modal and overlay. Allow pointer events on overlay.
  infoModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  modalOverlay.style["pointer-events"] = "initial";
  lossModal.style["z-index"] = 2; // Info Modal can hide lossModal
  [btnCloseModal, modalOverlay].forEach((ele) =>
    ele.addEventListener("click", () => {
      // Revert changes
      infoModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      modalOverlay.style["pointer-events"] = "none";
      setTimeout(() => {
        // Animation time of info modal is 0.5s
        lossModal.style["z-index"] = 4;
      }, 500);
    })
  );
};

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu();
  handleOpenCollapseMenu();
  infoViewer.addEventListener("click", showInfoModal);
}
