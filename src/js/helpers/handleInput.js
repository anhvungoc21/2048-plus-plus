import {
  canMoveDown,
  canMoveUp,
  canMoveLeft,
  canMoveRight,
} from "./checkMovable.js";
import { moveUp, moveDown, moveLeft, moveRight } from "./moveTiles.js";
import Tile from "../classes/Tile.js";

/**
 * Handle key pressing inputs from user
 * @param {*} e Keydown event
 * @param {*} grid Game grid
 * @param {*} gameBoard Game gameBoard
 * @returns null
 */
async function handleInput(e, grid, gameBoard) {
  // Handle keydown inputs
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (!canMoveUp(grid)) {
        setupInput(grid, gameBoard);
        return;
      }
      await moveUp(grid);
      break;
    case "ArrowDown":
    case "s":
      if (!canMoveDown(grid)) {
        setupInput(grid, gameBoard);
        return;
      }
      await moveDown(grid);
      break;
    case "ArrowLeft":
    case "a":
      if (!canMoveLeft(grid)) {
        setupInput(grid, gameBoard);
        return;
      }
      await moveLeft(grid);
      break;
    case "ArrowRight":
    case "d":
      if (!canMoveRight(grid)) {
        setupInput(grid, gameBoard);
        return;
      }
      await moveRight(grid);
      break;
    default:
      setupInput(grid, gameBoard);
      return;
  }

  // Wait for tile-sliding animations to finish before acutally merging tiles
  grid.cells.forEach((cell) => {
    cell.mergeTiles();
  });

  // After each move, add a new tile to gameBoard
  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  // Handle loss
  checkHandleLoss(grid, gameBoard, newTile);
}

/**
 * Check if the user has lost. If yes, handle animation of last tile and alert loss. Else, setupInput and continue.
 * @param {*} lastTile The tile that was most recently added
 */
function checkHandleLoss(grid, gameBoard, lastTile) {
  if (
    !canMoveUp(grid) &&
    !canMoveDown(grid) &&
    !canMoveLeft(grid) &&
    !canMoveRight(grid)
  ) {
    // Wait for last tile to appear before alerting loss
    lastTile.waitForTransition(true).then(() => {
      alert("You Lost!");
    });
  } else {
    setupInput(grid, gameBoard);
  }
}

/**
 * /**
 * Sets up event listener for keydown events.
 * This event listener is used once. It is added back after handling each input in `handleInput`
 * @TODO: Allow for mobile swipe events with HTML5.
 * @param {*} grid Grid used for checking move validity. Grid is created from gameBoard
 * @param {*} gameBoard Gameboard is used for putting new tiles in
 */
export default function setupInput(grid, gameBoard) {
  window.addEventListener(
    "keydown",
    async (e) => await handleInput(e, grid, gameBoard),
    {
      once: true,
    }
  );
}
