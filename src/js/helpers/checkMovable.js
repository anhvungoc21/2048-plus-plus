/**
 * Check if we can move tiles. This is used for different directions (up, down, left, right)
 * Check each group of cells's tiles (a group is either a column or a row of cells). If any tile in any group can move, return True.
 * @param {*} cells Input cells. Already determines the direction we move in.
 */
function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      // Far-most cell is always unable to move
      if (index === 0) return false;
      // Cells with no tiles are unable to move
      if (cell.tile == null) return false;

      // If a cell's tile can technically move, check the cell before it for vacancy / same tile value (canAccept).
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}

// Versions of canMove. Determines the direction of checking movability by gettings cells by column/row/reverse column/reverse row.
function canMoveUp(grid) {
  return canMove(grid.cellsByColumn);
}

function canMoveDown(grid) {
  return canMove(grid.cellsByColumn.map((col) => [...col].reverse()));
}

function canMoveLeft(grid) {
  return canMove(grid.cellsByRow);
}

function canMoveRight(grid) {
  return canMove(grid.cellsByRow.map((col) => [...col].reverse()));
}

export { canMoveUp, canMoveDown, canMoveLeft, canMoveRight };
