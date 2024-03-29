import Grid from "./js/classes/Grid.js";
import Tile from "./js/classes/Tile.js";

import {
  getColorTheme,
  getDarkMode,
  getGridSize,
  getPercentVHMain,
} from "./js/config.js";
import { setCombo, setComboIntervalID, setGrid } from "./js/gameState.js";
import setupInput from "./js/helpers/handleInput.js";
import handleNavbar from "./js/helpers/handleNavbar.js";
import {
  handleSettings,
  applyLSSettings,
  preventTransition,
} from "./js/helpers/handleSettings.js";
import { incrementGameCount } from "./js/helpers/handleAccountInfo.js";
import {
  getBestScore,
  getEmail,
  getGamesPlayed,
  getLoggedIn,
  getPassword,
} from "./js/userConfig.js";
import { updateAccount } from "./js/db/db.js";

// Handle window resize
const MOBILE_BREAKPOINT = 768;
const sideNav = document.querySelector(".l-navbar");
const sideNavWidth = sideNav.offsetWidth * 2; // prematurely hide side nav to prevent overflow
const toggleSideNav = () => {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;

  // Ensures that entire side nav is visible
  if (width < MOBILE_BREAKPOINT + sideNavWidth) {
    sideNav.style.display = "none";
  } else {
    sideNav.style.display = "unset";
  }
};

window.addEventListener("resize", toggleSideNav);

// Start Game & Handle all inputs
window.addEventListener("DOMContentLoaded", () => {
  toggleSideNav();
  setupGame();
  handleNavbar();
  handleSettings();
});

/**
 * Main function to set up and start game
 */
export default function setupGame() {
  // Prevent initial elements transition in Dark Mode.
  preventTransition();

  // Set settings on localStorage if not already present. Update settings according to local settings.
  if (!window.localStorage.getItem("settings2048++")) {
    const defaultSettings = {
      darkMode: "light-theme",
      gridSize: "4",
      colorTheme: "original",
    };

    localStorage.setItem("settings2048++", JSON.stringify(defaultSettings));
  }

  if (!getLoggedIn()) {
    applyLSSettings();
  }

  // Destroy all exisitng cells and tiles
  const existingCells = document.querySelectorAll(".cell");
  const existingTiles = document.querySelectorAll(".tile");
  if (existingCells) {
    existingCells.forEach((cell) => cell.remove());
  }

  if (existingTiles) {
    existingTiles.forEach((tile) => tile.remove());
  }

  // Reset score
  const scoreContainer = document.querySelector(".score-container");
  if (scoreContainer) {
    scoreContainer.dataset.score = "0";
    scoreContainer.textContent = "0";
  }

  // Fetch best score from localStorage
  if (!getLoggedIn()) {
    const bestScoreContainer = document.querySelector(".best-container");
    const bestScoreLocal = window.localStorage.getItem("bestScore2048++");
    if (bestScoreLocal) {
      bestScoreContainer.dataset.bestScore = bestScoreLocal;
      bestScoreContainer.textContent = bestScoreLocal;
    }
  }

  // Elements:
  const gameBoard = document.getElementById("game-board");
  const comboContainer = document.querySelector(".combo-container");
  const comboBar = comboContainer.querySelector(".combo-bar");

  // Reset combo state. Begin decreasing every half a second
  setCombo(false);
  comboContainer.style.setProperty("--transition-time", "0.25s");
  comboContainer.style.setProperty("--width", "0%");
  comboBar.style.background = "var(--white-color)";
  comboBar.classList.remove("blinker");

  const intervalID = setInterval(() => {
    const currentWidth = parseInt(
      getComputedStyle(comboContainer).getPropertyValue("--width")
    );
    if (currentWidth == 0) return;
    const decreasedWidth = currentWidth - 1;
    comboContainer.style.setProperty("--width", `${decreasedWidth}%`);
  }, 500);
  setComboIntervalID(intervalID);

  // Create game board grid
  const gridSize = getGridSize();
  const percentVHMain = getPercentVHMain();
  const grid = new Grid(gameBoard, gridSize, percentVHMain);
  setGrid(grid);

  // Generate 2 random tiles
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = new Tile(gameBoard);

  // Set up input listener
  setupInput(grid, gameBoard);
}

// Restart game handler
const btnRestart = document.getElementById("btn--restart");
btnRestart.addEventListener("click", () => {
  incrementGameCount();

  const lossModal = document.getElementById("modal--loss");
  const gameBoard = document.getElementById("game-board");
  lossModal.style.opacity = 0;
  gameBoard.style.opacity = 1;
  setupGame();
});

// Update account asynchronously when user unloads page
window.addEventListener("beforeunload", () => {
  if (getLoggedIn()) {
    const accountObj = {
      email: getEmail(),
      password: getPassword(),
      bestScore: getBestScore(),
      settings: {
        darkMode: getDarkMode(),
        colorTheme: getColorTheme(),
        gridSize: getGridSize(),
      },
      gamesPlayed: getGamesPlayed(),
    };

    updateAccount(accountObj);
  }
});
