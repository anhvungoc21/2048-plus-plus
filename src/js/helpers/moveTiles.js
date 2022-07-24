import soundEffect from "../../assets/tileSoundEffect.wav";
import { updateScore, updateCombo } from "./handleScore.js";
import { getSounds } from "../config";

/**
 * For each cell group (column/row):
 * - Loop through the cell group starting at the second position of the array. (Index-0 tile can never move)
 * - For eac
 * @param {*} cells Cells whose tiles to slide/move.
 * @returns An aggregate promise of all promises to slide tiles for each group (row/column).
 */
let combos = 0;

function slideTiles(cells) {
  // Aggregate all added scores from each group
  let playSound = false;
  const groupsScoreAdds = [];
  const promises =
    // flatMap cell groups' arrays into a 1D array of promises
    cells.flatMap((group) => {
      const promises = [];
      let scoreAdds = 0;

      // The top cell doesn't move, so start at 1, go up to length of group.
      // The latter the cell, the more cells before it we must check in the nested for-loop.
      for (let i = 1; i < group.length; i++) {
        const cell = group.at(i);
        if (cell.tile == null) continue; // If cell has no tile, ignore
        let lastValidCell; // lastValidCell is the last cell in the group that the current cell's tile can be moved to

        // Loop through entire group with current cell, going back to the first cell.
        // Check if each destination cell can accept current tile.
        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group.at(j);
          if (!moveToCell.canAccept(cell.tile)) break; // If cell cannot accept, stop checking immediately.
          lastValidCell = moveToCell;
        }

        // After getting lastValidCell to migrate into,
        if (lastValidCell != null) {
          // Push promise to wait for tile animation
          promises.push(cell.tile.waitForTransition());
          // Check if destination cell has a tile,
          if (lastValidCell.tile != null) {
            // Case 1: Cell has tile => set mergeTile at that cell to be the incoming tile.
            lastValidCell.mergeTile = cell.tile;
            scoreAdds += lastValidCell.tile.value + cell.tile.value;
            combos += 1;
            playSound = true; // Play sound when there is a merged cell
          } else {
            // Case 2: Empty Cell
            lastValidCell.tile = cell.tile;
          }

          // Set cell's tile whose tile was moved to null
          cell.tile = null;
        }
      }

      // Add score
      groupsScoreAdds.push(scoreAdds);
      return promises;
    });

  // Play sound effect for tile merging
  if (playSound && getSounds()) {
    const sndEffect = new Audio("./soundEffect.wav");
    sndEffect.play();
  }

  // Update score
  updateScore(groupsScoreAdds.reduce((sum, scoreAdd) => sum + scoreAdd, 0));
  return Promise.all(promises);
}

const updateResetCombos = () => {
  updateCombo(combos);
  combos = 0;
};

// Versions of slideTiles. Determines the direction of sliding by gettings cells by column/row/reverse column/reverse row.
async function moveUp(grid) {
  await slideTiles(grid.cellsByColumn);
  updateResetCombos();
}

async function moveDown(grid) {
  await slideTiles(grid.cellsByColumn.map((col) => [...col].reverse()));
  updateResetCombos();
}

async function moveLeft(grid) {
  await slideTiles(grid.cellsByRow);
  updateResetCombos();
}

async function moveRight(grid) {
  await slideTiles(grid.cellsByRow.map((row) => [...row].reverse()));
  updateResetCombos();
}

export { moveUp, moveDown, moveLeft, moveRight };
