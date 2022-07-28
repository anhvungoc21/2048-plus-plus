import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
  getBestScore,
  setBestScore,
  getGamesPlayed,
} from "../userConfig.js";
import { tryLogIn, logIn, logOut, tryCreateAccount } from "./handleUser.js";
import displayAlert from "./handleAlert";
import { applyUserSettings } from "./handleSettings.js";

const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navList = navBar.querySelector(".nav__list");
const navLinks = navList.querySelectorAll(".nav__link");
const collapseMenus = document.querySelectorAll(".collapse__menu");
const setterDarkMode = document.getElementById("set--dark-mode");
const setterAudio = document.getElementById("set--audio");
const setterBoardSize = document.getElementById("set--board-size");
const setterColors = document.getElementById("set--colors");
const instructionsViewer = document.getElementById("instructions");
const infoViewer = document.getElementById("info");
const userViewer = document.getElementById("user");
const logOutBtn = document.getElementById("log-out");
const signupModal = document.getElementById("modal--signup");
const loginModal = document.getElementById("modal--login");
const lossModal = document.getElementById("modal--loss");
const instructionsModal = document.getElementById("modal--instructions");
const infoModal = document.getElementById("modal--info");
const accountModal = document.getElementById("modal--account");
const bestScoreAccountContainer =
  accountModal.querySelector("#best-score-data");
const gamesPlayed4x4Container =
  accountModal.querySelector("#games-played--4x4");
const gamesPlayed5x5Container =
  accountModal.querySelector("#games-played--5x5");
const gamesPlayed6x6Container =
  accountModal.querySelector("#games-played--6x6");

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

const bestScoreDisplay = document.querySelector(".best-container");

const handleShowMenu = () => {
  if (
    navBar &&
    navToggle &&
    setterDarkMode &&
    setterAudio &&
    setterBoardSize &&
    setterColors &&
    userViewer &&
    logOutBtn
  ) {
    // Click on these to expand
    const validExpanders = [
      setterDarkMode,
      setterBoardSize,
      setterColors,
      setterAudio,
    ];
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
  const btnCloseModal = infoModal.querySelector("#btn--close-info-modal");
  infoModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  modalOverlay.style["pointer-events"] = "initial";
  infoModal.style["pointer-events"] = "initial";
  [btnCloseModal, modalOverlay].forEach((ele) =>
    ele.addEventListener(
      "click",
      () => {
        // Revert changes
        infoModal.style.opacity = 0;
        modalOverlay.style.opacity = 0;
        modalOverlay.style["pointer-events"] = "none";
        infoModal.style["pointer-events"] = "none";
      },
      { once: true }
    )
  );
};

// View how-to-play instructions
const showInstructionsModal = () => {
  const btnCloseModal = instructionsModal.querySelector(
    "#btn--close-instructions-modal"
  );
  // Show info modal and overlay. Allow pointer events on overlay.
  instructionsModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  modalOverlay.style["pointer-events"] = "initial";
  instructionsModal.style["pointer-events"] = "initial";
  // lossModal.style["z-index"] = 2; // Info Modal can hide lossModal
  [btnCloseModal, modalOverlay].forEach((ele) =>
    ele.addEventListener(
      "click",
      () => {
        // Revert changes
        instructionsModal.style.opacity = 0;
        modalOverlay.style.opacity = 0;
        modalOverlay.style["pointer-events"] = "none";
        instructionsModal.style["pointer-events"] = "none";
      },
      { once: true }
    )
  );
};

const showAccountModal = () => {
  accountModal.style.opacity = 1;
  modalOverlay.style["pointer-events"] = "initial";
  accountModal.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      accountModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      accountModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";
    },
    { once: true }
  );
};

export const updateAccountInfo = () => {
  if (getLoggedIn()) {
    // Update account modal
    const gamesPlayed = getGamesPlayed();
    const bestScore = getBestScore();
    bestScoreAccountContainer.textContent = bestScore;
    gamesPlayed4x4Container.textContent = gamesPlayed["4x4"];
    gamesPlayed5x5Container.textContent = gamesPlayed["5x5"];
    gamesPlayed6x6Container.textContent = gamesPlayed["6x6"];

    // Update best score display
    bestScoreDisplay.dataset.bestScore = bestScore;
    bestScoreDisplay.textContent = bestScore;
  }
};

const showSignupModal = () => {
  // Show modal
  signupModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;

  signupModal.style["pointer-events"] = "initial";
  modalOverlay.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      signupModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      signupModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";
    },
    { once: true }
  );
};

const handleBtnsSignup = () => {
  // Handle Signup
  btnSignup.addEventListener("click", () => {
    const email = signupModal.querySelector("#email-input").value;
    const password = signupModal.querySelector("#password-input").value;
    const rePassword = signupModal.querySelector("#password-reinput").value;
    const username = signupModal.querySelector("#username-input").value;
    if (rePassword != password) {
      displayAlert("Passwords did not match!");

      // Shake signup modal
      signupModal.classList.add("modal-shaker");
      signupModal.addEventListener("animationend", () => {
        signupModal.classList.remove("modal-shaker");
      });
    }

    (async () => {
      const signupSuccess = await tryCreateAccount(username, email, password);
      if (signupSuccess) {
        displayAlert("Successfully signed up!");
      } else {
        displayAlert(
          "Signup failed. Email is already associated with another account!"
        );

        // Shake signup modal
        signupModal.classList.add("modal-shaker");
        signupModal.addEventListener("animationend", () => {
          signupModal.classList.remove("modal-shaker");
        });
      }
    })();
  });

  // Handle return to Login
  btnReturnToLogin.addEventListener("click", () => {
    signupModal.classList.add("no-transition");
    signupModal.style.opacity = 0;
    signupModal.style["pointer-events"] = "none";
    loginModal.addEventListener("transitionend", () => {
      signupModal.offsetHeight;
      signupModal.classList.remove("no-transition");
    });
    showLoginModal();
  });
};

/* LOGIN */

const showLoginModal = () => {
  // Show login modal
  loginModal.style.opacity = 1;
  modalOverlay.style.opacity = 0.6;
  loginModal.style["pointer-events"] = "initial";
  modalOverlay.style["pointer-events"] = "initial";
  modalOverlay.addEventListener(
    "click",
    () => {
      loginModal.style.opacity = 0;
      modalOverlay.style.opacity = 0;
      loginModal.style["pointer-events"] = "none";
      modalOverlay.style["pointer-events"] = "none";
    },
    { once: true }
  );
};

const handleBtnsLogin = () => {
  // Handle Login
  btnLogin.addEventListener("click", () => {
    const email = loginModal.querySelector("#email-input").value;
    const password = loginModal.querySelector("#password-input").value;
    (async () => {
      const [loginSuccess, accountObj] = await tryLogIn(email, password);
      if (loginSuccess && accountObj != null) {
        displayAlert("Successfully logged in!");

        // Hide login modal
        loginModal.style.opacity = 0;
        modalOverlay.style.opacity = 0;
        loginModal.style["pointer-events"] = "none";
        modalOverlay.style["pointer-events"] = "none";

        // Update account settings
        applyUserSettings(accountObj);

        // Update account modal
        updateAccountInfo();
      } else {
        displayAlert("Login failed! Invalid email-password combination!");

        // Shake login modal
        loginModal.classList.add("modal-shaker");
        loginModal.addEventListener("animationend", () => {
          loginModal.classList.remove("modal-shaker");
        });
      }
    })();
  });

  // Handle open signup
  btnOpenSignup.addEventListener("click", () => {
    loginModal.classList.add("no-transition");
    loginModal.style.opacity = 0;
    loginModal.style["pointer-events"] = "none";
    signupModal.addEventListener("transitionend", () => {
      loginModal.classList.remove("no-transition");
    });
    showSignupModal();
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
  instructionsViewer.addEventListener("click", showInstructionsModal);
  infoViewer.addEventListener("click", showInfoModal);
  userViewer.addEventListener("click", handleUserViewer);
}
