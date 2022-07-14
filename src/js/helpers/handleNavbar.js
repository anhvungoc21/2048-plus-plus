const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");
const infoViewer = document.getElementById("info");
const userViewer = document.getElementById("user");
const logOutBtn = document.getElementById("log-out");

import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
} from "../userConfig.js";

import { tryLogIn, logIn, logOut } from "./handleUser.js";

const showMenu = () => {
  if (
    navBar &&
    navToggle &&
    setterDarkMode &&
    setterBoardSize &&
    setterColors &&
    userViewer &&
    logOutBtn
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
  const btnCloseModal = infoModal.querySelector(".btn--close-info-modal");
  const modalOverlay = document.querySelector(".modal-overlay");
  const lossModal = document.getElementById("modal--loss");
  // Show info modal and overlay. Allow pointer events on overlay.
  infoModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  modalOverlay.style["pointer-events"] = "initial";
  infoModal.style["pointer-events"] = "initial";
  lossModal.style["z-index"] = 2; // Info Modal can hide lossModal
  [btnCloseModal, modalOverlay].forEach((ele) =>
    ele.addEventListener("click", () => {
      // Revert changes
      infoModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      modalOverlay.style["pointer-events"] = "none";
      infoModal.style["pointer-events"] = "none";
      setTimeout(() => {
        // Transition time of info modal is 0.5s
        lossModal.style["z-index"] = 4;
      }, 500);
    })
  );
};

const showAccountModal = () => {
  const accountModal = document.getElementById("modal--account");
  const btnCloseModal = accountModal.querySelector(".btn--close-acc-modal");
};

const showLoginModal = () => {
  const loginModal = document.getElementById("modal--login");
  const modalOverlay = document.querySelector(".modal-overlay");
  const lossModal = document.getElementById("modal--loss");
  loginModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.4;
  lossModal.style["z-index"] = 2; // Login Modal can hide Loss Modal
  loginModal.style["pointer-events"] = "initial";
  modalOverlay.style["pointer-events"] = "initial";
  modalOverlay.addEventListener("click", () => {
    loginModal.style.opacity = 0;
    modalOverlay.style.opacity = 0;
    loginModal.style["pointer-events"] = "none";
    modalOverlay.style["pointer-events"] = "none";
    setTimeout(() => {
      // Transition time of login modal is 0.5s
      lossModal.style["z-index"] = 4;
    }, 500);
  });

  // Handle Login
  const btnLogin = loginModal.querySelector("#btn--login");
  btnLogin.addEventListener("click", () => {
    const email = loginModal.querySelector("#email-input").value;
    const password = loginModal.querySelector("#password-input").value;
    // const loginSuccess = tryLogIn(email, password);
    // if (loginSuccess) {
    //   logIn();
    // } else {
    //   // Report login failure
    // }
  });
};

const handleUserViewer = () => {
  const isLoggedIn = getLoggedIn();
  if (isLoggedIn) {
    showAccountModal();
  } else {
    showLoginModal();
  }
};

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  showMenu();
  handleOpenCollapseMenu();
  infoViewer.addEventListener("click", showInfoModal);
  userViewer.addEventListener("click", handleUserViewer);
}
