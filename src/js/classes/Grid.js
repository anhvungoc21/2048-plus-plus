import Cell from "./Cell.js";

export default class Grid {
  #cells;
  constructor(gridElement, gridSize, percentVHMain) {
    // CSS variables
    const cellSize = percentVHMain / gridSize;
    gridElement.style.setProperty("--grid-size", gridSize);
    gridElement.style.setProperty("--cell-size", `${cellSize}vmin`);
    gridElement.style.setProperty("--cell-gap", `${cellSize / 10}vmin`);

    // Create cell elements based on Grid size
    // For each html cell element, create a corresponding Cell instance.
    // Row and Column indicies help identify different cells. (basically xy-coords)
    this.#cells = this.#createCellElements(gridElement, gridSize).map(
      (cellElement, index) => {
        return new Cell(
          cellElement,
          index % gridSize, // Row #
          Math.floor(index / gridSize) // Column #
        );
      }
    );
  }

  // Return array of empty cells. Private method.
  get #emptyCells() {
    return this.#cells.filter((cell) => cell.tile == null);
  }

  /**
   * Create all cell HTML elements based on gridSize as children of gridElement.
   * @param {*} gridElement
   * @param {*} gridSize
   * @returns Created HTML cell elements
   */
  #createCellElements(gridElement, gridSize) {
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cells.push(cell);
      gridElement.append(cell);
    }
    return cells;
  }

  // Get all cells
  get cells() {
    return this.#cells;
  }

  // Return a random empty cell. Used for spawning new tiles.
  randomEmptyCell() {
    const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
    return this.#emptyCells.at(randomIndex);
  }

  // Creates a 2D array where each sub-array is a column, and inside the sub-arrays are the cells in that column
  // Order of cells are preserved because we're indexing with cell.x and cell.y
  get cellsByColumn() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.x] = cellGrid[cell.x] || [];
      cellGrid[cell.x][cell.y] = cell;
      return cellGrid;
    }, []);
  }

  // Creates a 2D array where each sub-array is a row, and inside the sub-arrays are the cells in that row
  get cellsByRow() {
    return this.#cells.reduce((cellGrid, cell) => {
      cellGrid[cell.y] = cellGrid[cell.y] || [];
      cellGrid[cell.y][cell.x] = cell;
      return cellGrid;
    }, []);
  }
}
