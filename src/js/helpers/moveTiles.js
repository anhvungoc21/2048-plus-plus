import { updateScore } from "./handleScore.js";

// FIXME: updateScore correctly
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
            // TODO: If multiple cells are merged, need a way to add them up
            updateScore(lastValidCell.tile);
            updateScore(cell.tile);
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

async function moveUp(grid) {
  return await slideTiles(grid.cellsByColumn);
}

async function moveDown(grid) {
  return await slideTiles(grid.cellsByColumn.map((col) => [...col].reverse()));
}

async function moveLeft(grid) {
  return await slideTiles(grid.cellsByRow);
}

async function moveRight(grid) {
  return await slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
}

export { moveUp, moveDown, moveLeft, moveRight };
