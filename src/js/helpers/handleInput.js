import {
  canMoveDown,
  canMoveUp,
  canMoveLeft,
  canMoveRight,
} from "./checkMovable.js";
import { moveUp, moveDown, moveLeft, moveRight } from "./moveTiles.js";
import { preventTransition } from "./handleSettings.js";
import { getCombo, getComboIntervalID } from "../gameState.js";
import { incrementGameCount } from "./handleAccountInfo.js";
import Tile from "../classes/Tile.js";
import setupGame from "../../index.js";

/**
 * Handle key pressing inputs from user
 * @param {*} e Keydown event
 * @param {*} grid Game grid
 * @param {*} gameBoard Game gameBoard
 * @returns null
 */

async function handleInput(e, grid, gameBoard) {
  // Check if any modal is open:

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

  // Wait for tile-sliding animations to finish, aka move/slideTiles, then merge tiles
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
      // Display loss modal, Make gameBoard opaque, add listener to restart button.
      const lostModal = document.querySelector("#modal--loss");
      const gameBoard = document.querySelector("#game-board");
      const tryAgainBtn = lostModal.querySelector("#btn--try-again");
      lostModal.style.opacity = 1;
      gameBoard.style.opacity = 0.5;
      lostModal.style["pointer-events"] = "initial";

      // Set up animation stuff for restart button
      setTimeout(() => {
        tryAgainBtn.addEventListener(
          "click",
          () => {
            lostModal.style["pointer-events"] = "none";
            preventTransition(true);
            setupGame();
          },
          { once: true }
        );
      }, 500);
    });

    // Stop combo decreasing interval
    clearInterval(getComboIntervalID());

    // Increment game count for user
    incrementGameCount();
  } else {
    setupInput(grid, gameBoard);
  }
}

/** ----- HANDLE TOUCH ----- */
let xDown = null;
let yDown = null;

function getTouches(e) {
  return e.touches;
}

// Set initial x and y values of touch gesture
function handleTouchStart(e, grid, gameBoard) {
  const firstTouch = getTouches(e)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
  setupInput(grid, gameBoard);
}

function resetXY() {
  xDown = null;
  yDown = null;
}

async function handleTouchMove(e, grid, gameBoard) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = e.touches[0].clientX;
  const yUp = e.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    // Determine most significant swipe direction (x/y)
    if (xDiff > 0) {
      // Right swipe
      if (!canMoveRight(grid)) {
        resetXY();
        setupInput(grid, gameBoard);
        return;
      }
      await moveRight(grid);
    } else {
      // Left swipe
      if (!canMoveLeft(grid)) {
        resetXY();
        setupInput(grid, gameBoard);
        return;
      }
      await moveLeft(grid);
    }
  } else {
    if (yDiff > 0) {
      // Down swipe
      if (!canMoveDown(grid)) {
        resetXY();
        setupInput(grid, gameBoard);
        return;
      }
      await moveDown(grid);
    } else {
      // Up swipe
      if (!canMoveUp(grid)) {
        resetXY();
        setupInput(grid, gameBoard);
        return;
      }
      await moveUp(grid);
    }
  }

  resetXY();

  // Wait for tile-sliding animations to finish, aka move/slideTiles, then merge tiles
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
 * /**
 * Sets up event listener for keydown events.
 * This event listener is used once. It is added back after handling each input in `handleInput`
 * @param {*} grid Grid used for checking move validity. Grid is created from gameBoard
 * @param {*} gameBoard Gameboard is used for putting new tiles in
 */

const modals = document.querySelectorAll(".modal");
const areModelsOpened = () => {
  let openFlag = false;
  modals.forEach((el) => {
    if (el.style.opacity != 0) openFlag = true;
  });
  return openFlag;
};

export default function setupInput(grid, gameBoard) {
  console.log(xDown, yDown);
  window.addEventListener(
    "keydown",
    async (e) => {
      // If there are openned modals, do not handle input
      let modelsAreOpened = areModelsOpened();
      if (modelsAreOpened) {
        setupInput(grid, gameBoard);
      } else {
        await handleInput(e, grid, gameBoard);
      }
    },
    { once: true }
  );

  window.addEventListener(
    "touchstart",
    (e) => {
      // if (areModelsOpened()) {
      //   setupInput(grid, gameBoard);
      // } else {
      handleTouchStart(e, grid, gameBoard);
    },
    // },
    { once: true }
  );

  window.addEventListener(
    "touchmove",
    async (e) => {
      // if (areModelsOpened()) {
      //   setupInput(grid, gameBoard);
      // } else {
      await handleTouchMove(e, grid, gameBoard);
    },
    // },
    { once: true }
  );
}
