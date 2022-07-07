import Cell from "./Cell.js";

export default class Grid {
  #cells;
  constructor(gridElement, gridSize, percentVHMain) {
    // CSS variables

    gridElement.style.setProperty("--grid-size", gridSize);
    const cellSize = percentVHMain / gridSize;

    gridElement.style.setProperty("--cell-size", `${cellSize}vh`);
    gridElement.style.setProperty("--cell-gap", `${cellSize / 10}vh`);

    // Create cell elements based on Grid size
    this.#cells = createCellElements(gridElement, gridSize).map(
      (cellElement, index) => {
        return new Cell(
          cellElement,
          index % gridSize,
          Math.floor(index / gridSize)
        );
      }
    );
  }

  get cells() {
    return this.#cells;
  }

  // Return array of empty cells.
  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells.at(randomIndex);
  }

  get cellsByColumn() {
    // cellGrid begins as []
    return this.#cells.reduce((cellGrid, cell) => {
      // 2D array with index-0 being x-position
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      // Each index of y (0,1,2,3) is the cell
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }
}

function createCellElements(gridElement, gridSize) {
  const cells = [];
  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cells.push(cell);
    gridElement.append(cell);
  }
  return cells;
}
