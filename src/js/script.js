import Grid from "./classes/Grid.js";
import Tile from "./classes/Tile.js";

import { getGridSize, getPercentVHMain } from "./config.js";
import setupInput from "./helpers/handleInput.js";
import handleNavbar from "./helpers/handleNavbar.js";
import {
  handleSettings,
  applyLSSettings,
  preventTransition,
} from "./helpers/handleSettings.js";

/**
 * Main function to set up and start game
 */
export default function setupGame() {
  // Prevent initial elements transition in Dark Mode.
  preventTransition();

  // Set settings on localStorage if not already present. Else, update settings according to local settings.
  if (!window.localStorage.getItem("settings2048++")) {
    const defaultSettings = {
      darkMode: "light-theme",
      gridSize: "4",
      colorTheme: "original",
    };

    localStorage.setItem("settings2048++", JSON.stringify(defaultSettings));
  } else {
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
  const bestScoreContainer = document.querySelector(".best-container");
  const bestScoreLocal = window.localStorage.getItem("bestScore2048++");
  if (bestScoreLocal) {
    bestScoreContainer.dataset.bestScore = bestScoreLocal;
    bestScoreContainer.textContent = bestScoreLocal;
  }

  // Elements:
  const gameBoard = document.getElementById("game-board");

  // Create game board grid
  const gridSize = getGridSize();
  const percentVHMain = getPercentVHMain();
  const grid = new Grid(gameBoard, gridSize, percentVHMain);

  // Generate 2 random tiles
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = new Tile(gameBoard);

  // Set up input listener
  setupInput(grid, gameBoard);
}

// Restart game handler
const btnRestart = document.getElementById("btn--restart");
btnRestart.addEventListener("click", () => {
  const lossModal = document.getElementById("modal--loss");
  const gameBoard = document.getElementById("game-board");
  lossModal.style.opacity = 0;
  gameBoard.style.opacity = 1;
  setupGame();
});

// Start Game & Handle all inputs
setupGame();
handleNavbar();
handleSettings();
