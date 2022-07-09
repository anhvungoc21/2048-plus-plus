import Grid from "./classes/Grid.js";
import Tile from "./classes/Tile.js";

import { getGridSize, getPercentVHMain } from "./config.js";
import setupInput from "./helpers/handleInput.js";
import handleNavbar from "./helpers/handleNavbar.js";

// TODO:
/*
- Implement Modal for Loss
- Find a way to speed up input-allowing speed
- Implement user log-in/out
- Fix incorrect score problem
*/

/**
 * Main function to set up and start game
 */
export default function setupGame() {
  // Destroy all exisitng cells and tiles
  const existingCells = document.querySelectorAll(".cell");
  const existingTiles = document.querySelectorAll(".tile");
  if (existingCells) {
    existingCells.forEach((cell) => cell.remove());
  }

  if (existingTiles) {
    existingTiles.forEach((tile) => tile.remove());
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

  // Set up input listener
  setupInput(grid, gameBoard);
}

// Restart game handler
const btnRestart = document.getElementById("btn--restart");
btnRestart.addEventListener("click", () => {
  setupGame();
});

// Start Game:
setupGame();
handleNavbar();
