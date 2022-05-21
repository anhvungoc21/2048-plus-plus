import Grid from "./classes/Grid.js";
import Tile from "./classes/Tile.js";

// TODO:
/*
- Fix scaling for board -- No hard-coded values for cellSize
- Implement color buttons
- Implement score updating
*/

// Elements
const gameBoard = document.getElementById("game-board");
const scoreBoard = document.getElementById("score-board");
const btnAdd = document.querySelector(".add");

function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };

  tick();
}

btnAdd.addEventListener("click", function () {
  const html = document.createElement("span");
  html.classList.add("plus-one");
  html.innerHTML = "+1";
  scoreBoard.append(html);
  fadeIn(html, "1000");
  setTimeout(function () {
    html.remove();
  }, 2000);
});

const grid = new Grid(gameBoard);

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

function setupInput() {
  window.addEventListener("keydown", handleInput, { once: true });
}

async function handleInput(e) {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      if (!canMoveUp()) {
        setupInput();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
    case "s":
      if (!canMoveDown()) {
        setupInput();
        return;
      }
      await moveDown();
      break;
    case "ArrowLeft":
    case "a":
      if (!canMoveLeft()) {
        setupInput();
        return;
      }
      await moveLeft();
      break;
    case "ArrowRight":
    case "d":
      if (!canMoveRight()) {
        setupInput();
        return;
      }
      await moveRight();
      break;
    default:
      // Add event listener again;
      setupInput();
      return;
  }

  // Need to await CSS animation to finish before merging tiles
  grid.cells.forEach((cell) => cell.mergeTiles());

  const newTile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = newTile;

  if (!canMoveUp() && !canMoveDown() && !canMoveLeft() && !canMoveRight()) {
    // Wait for last tile to appear before alerting loss
    newTile.waitForTransition(true).then(() => {
      alert("You Lost!");
    });
  } else {
    setupInput();
  }
}

function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      // Far-most cell
      if (index === 0) return false;
      // Empty cell
      if (cell.tile == null) return false;

      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}

function canMoveUp() {
  return canMove(grid.cellsByColumn);
}

function canMoveDown() {
  return canMove(grid.cellsByColumn.map((col) => [...col].reverse()));
}

function canMoveLeft() {
  return canMove(grid.cellsByRow);
}

function canMoveRight() {
  return canMove(grid.cellsByRow.map((col) => [...col].reverse()));
}

function moveUp() {
  return slideTiles(grid.cellsByColumn);
}

function moveDown() {
  return slideTiles(grid.cellsByColumn.map((col) => [...col].reverse()));
}

function moveLeft() {
  return slideTiles(grid.cellsByRow);
}

function moveRight() {
  return slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

function slideTiles(cells) {
  // Since we want moveUp/etc. to return a promise, slideTiles must also return promises
  return Promise.all(
    // FlatMap simply makes everything into a 1D array of animation promises
    cells.flatMap((group) => {
      const promises = [];
      // The top cell doesn't move, so start at 1
      for (let i = 1; i < group.length; i++) {
        const cell = group.at(i);
        if (cell.tile == null) continue;
        let lastValidCell;
        // Loop through entire group with current cell
        // i - 1 is cell directly above i
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group.at(j);
          // Check if destination cell can accept current tile.
          // If not, stop checking further.
          if (!moveToCell.canAccept(cell.tile)) break;

          // lastValidCell is the last tile in the group that can be moved to
          lastValidCell = moveToCell;
        }
        if (lastValidCell != null) {
          // Push promise to wait for animation
          promises.push(cell.tile.waitForTransition());
          // Check if destination cell has a tile
          if (lastValidCell.tile != null) {
            // Cell has tile
            lastValidCell.mergeTile = cell.tile;
          } else {
            // Empty Cell
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
}

setupInput();
