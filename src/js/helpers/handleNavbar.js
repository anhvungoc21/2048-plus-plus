import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
} from "../userConfig.js";

import { tryLogIn, logIn, logOut, tryCreateAccount } from "./handleUser.js";

const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const collapseMenus = document.querySelectorAll(".collapse__menu");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");
const infoViewer = document.getElementById("info");
const userViewer = document.getElementById("user");
const logOutBtn = document.getElementById("log-out");
const signupModal = document.getElementById("modal--signup");
const loginModal = document.getElementById("modal--login");
const lossModal = document.getElementById("modal--loss");
const infoModal = document.getElementById("modal--info");
const accountModal = document.getElementById("modal--account");
const modalOverlay = document.querySelector(".modal-overlay");
const btnSignup = signupModal.querySelector("#btn--signup");
const btnReturnToLogin = signupModal.querySelector("#btn--return-login");
const btnLogin = loginModal.querySelector("#btn--login");
const btnOpenSignup = loginModal.querySelector("#sign-up");

const iconsRotate = document.querySelectorAll(".collapse__icon");
const eyeIconsLogin = loginModal.querySelectorAll(".eye__icon");
const eyeIconsSignup = signupModal.querySelectorAll(
  "#password-input-wrapper > .eye__icon"
);
const eyeIconsReSignup = signupModal.querySelectorAll(
  "#password-reinput-wrapper > .eye__icon"
);

const handleShowMenu = () => {
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
  }
};

const handleNavToggle = () => {
  // Click to either expand or shrink. Also closes all menus
  navToggle.addEventListener("click", () => {
    navBar.classList.toggle("expander");
    collapseMenus.forEach((menu) => {
      if (menu.classList.contains("showCollapse")) {
        menu.classList.remove("showCollapse");
      }
    });

    iconsRotate.forEach((icon) => {
      if (icon.classList.contains("rotate")) {
        icon.classList.remove("rotate");
      }
    });
  });
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
  const btnCloseModal = infoModal.querySelector(".btn--close-info-modal");
  // Show info modal and overlay. Allow pointer events on overlay.
  infoModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  modalOverlay.style["pointer-events"] = "initial";
  infoModal.style["pointer-events"] = "initial";
  lossModal.style["z-index"] = 2; // Info Modal can hide lossModal
  [btnCloseModal, modalOverlay].forEach((ele) =>
    ele.addEventListener(
      "click",
      () => {
        // Revert changes
        infoModal.style.opacity = 0;
        modalOverlay.style.opacity = 0;
        modalOverlay.style["pointer-events"] = "none";
        infoModal.style["pointer-events"] = "none";
        setTimeout(() => {
          // Transition time of info modal is 0.5s
          lossModal.style["z-index"] = 4;
        }, 500);
      },
      { once: true }
    )
  );
};

const showAccountModal = () => {
  accountModal.style.opacity = 1;
  lossModal.style["z-index"] = 2; // Login Modal can hide Loss Modal
  modalOverlay.style["pointer-events"] = "initial";
  accountModal.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      accountModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      accountModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";

      setTimeout(() => {
        // Transition time of account modal is 0.5s
        lossModal.style["z-index"] = 4;
      }, 500);
    },
    { once: true }
  );
};

const showSignupModal = () => {
  // Show modal
  signupModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.4;
  if (lossModal.style.opacity == 1) {
    lossModal.style["z-index"] = 2; // Signup can hide Loss Modal
  }
  signupModal.style["pointer-events"] = "initial";
  modalOverlay.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      signupModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      signupModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";
      if (lossModal.style["z-index"] == 2) {
        setTimeout(() => {
          // Transition time of signup modal is 0.5s
          lossModal.style["z-index"] = 4;
        }, 500);
      }
    },
    { once: true }
  );
};

const handleBtnsSignup = () => {
  // Handle Signup
  btnSignup.addEventListener("click", () => {
    const email = loginModal.querySelector("#email-input").value;
    const password = loginModal.querySelector("#password-input").value;
    const rePassword = loginModal.querySelector("#password-reinput").value;
    const username = loginModal.querySelector("#username-input").value;
    if (rePassword != password) {
      // NOTIFY THAT PASSWORD DOESN'T MATCH
    }

    (async () => {
      const signupSuccess = await tryCreateAccount(username, email, password);
      if (signupSuccess) {
      } else {
        console.log("SIGN UP FAILED");
        // NOTIFY THAT EMAIL ALREADY EXISTS
        // Report login failure
        // Shake some kind of modal
      }
    })();
  });

  // Handle return to Login
  btnReturnToLogin.addEventListener("click", () => {
    signupModal.classList.add("modal-no-transition");
    signupModal.style.opacity = 0;
    signupModal.style["pointer-events"] = "none";
    signupModal.addEventListener("transitionend", () => {
      signupModal.classList.remove("modal-no-transition");
    });
    showLoginModal();
  });
};

/* LOGIN */

const showLoginModal = () => {
  // Show login modal
  loginModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.4;
  if (lossModal.style.opacity == 1) {
    lossModal.style["z-index"] = 2; // Login Modal can hide Loss Modal
  }
  loginModal.style["pointer-events"] = "initial";
  modalOverlay.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      loginModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      loginModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";
      if (lossModal.style["z-index"] == 2) {
        setTimeout(() => {
          // Transition time of login modal is 0.5s
          lossModal.style["z-index"] = 4;
        }, 500);
      }
    },
    { once: true }
  );

  // btnOpenSignup.addEventListener(
  //   "click",
  //   () => {
  //     loginModal.style.opacity = 0;
  //     loginModal.style["pointer-events"] = "none";
  //     if (lossModal.style["z-index"] == 2) {
  //       setTimeout(() => {
  //         // Transition time of login modal is 0.5s
  //         lossModal.style["z-index"] = 4;
  //       }, 500);
  //     }
  //   },
  //   { once: true }
  // );
};

const handleBtnsLogin = () => {
  // Handle Login
  btnLogin.addEventListener("click", () => {
    const email = loginModal.querySelector("#email-input").value;
    const password = loginModal.querySelector("#password-input").value;
    (async () => {
      const loginSuccess = await tryLogIn(email, password);
      if (loginSuccess) {
      } else {
        console.log("LOG IN FAILED");
        // Report login failure
        // Shake some kind of modal
      }
    })();
  });

  // Handle open signup
  btnOpenSignup.addEventListener("click", () => {
    loginModal.classList.add("modal-no-transition");
    loginModal.style.opacity = 0;
    loginModal.style["pointer-events"] = "none";
    loginModal.addEventListener("transitionend", () => {
      loginModal.classList.remove("modal-no-transition");
    });
    if (lossModal.style["z-index"] == 2) {
      setTimeout(() => {
        // Transition time of login modal is 0.5s
        lossModal.style["z-index"] = 4;
      }, 500);
    }
    showSignupModal();
  });
};

const handleUserViewer = () => {
  const isLoggedIn = getLoggedIn();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    showAccountModal();
  } else {
    showLoginModal();
  }
};

// Eye Icons
const handleEyeIcons = (eyeIcons) => {
  eyeIcons.forEach((icon) =>
    icon.addEventListener("click", () => {
      eyeIcons.forEach((icon) => icon.classList.toggle("hidden"));
    })
  );
};

/**
 * Main function for handling navbar events
 */
export default function handleNavbar() {
  handleShowMenu();
  handleNavToggle();
  handleOpenCollapseMenu();
  handleBtnsSignup();
  handleBtnsLogin();
  handleEyeIcons(eyeIconsLogin);
  handleEyeIcons(eyeIconsSignup);
  handleEyeIcons(eyeIconsReSignup);
  infoViewer.addEventListener("click", showInfoModal);
  userViewer.addEventListener("click", handleUserViewer);
}
