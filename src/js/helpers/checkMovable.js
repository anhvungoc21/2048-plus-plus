/**
 * Check if we can move cells. This is used for different directions (up, down, left, right)
 * @param {*} cells Inputs cells. Determines the direction we move in.
 * @returns
 */
function canMove(cells) {
  return cells.some((group) => {
    return group.some((cell, index) => {
      // Far-most cell is always unable to move
      if (index === 0) return false;
      // Cells with no tiles are unable to move
      if (cell.tile == null) return false;

      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
}

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
