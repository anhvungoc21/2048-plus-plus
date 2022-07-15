export default class Cell {
  #cellElement; // Is this called somewhere?
  #x;
  #y;
  #tile; // The tile that cell contains
  #mergeTile; // What for?

  constructor(cellElement, x, y) {
    this.#cellElement = cellElement;
    this.#x = x;
    this.#y = y;
  }

  /* Coords */
  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  /* Tile */
  get tile() {
    return this.#tile;
  }

  // Settter for tile inside cell.
  // Set x,y coords of cell the same as tile if tile exists on cell.
  set tile(value) {
    this.#tile = value;
    if (value == null) return;
    this.#tile.x = this.#x;
    this.#tile.y = this.#y;
  }

  /* Merge tile */
  get mergeTile() {
    return this.#mergeTile;
  }

  // Same as tile setter. Takes in a merge tile.
  set mergeTile(value) {
    this.#mergeTile = value;
    if (value == null) return;
    this.#mergeTile.x = this.#x;
    this.#mergeTile.y = this.#y;
  }

  /**
   * Checks whether a cell can accept a tile into it. This is true in 2 scenarios:
   * 1. Cell has no tile yet, aka this.tile == null
   * 2. Cell's tile has the same value as the incoming tile.
   * In the second case (merging tiles), we also need to check if cell already has a merge tile since we can only merge once per slide of a tile.
   * @param {*} newTile
   */
  canAccept(newTile) {
    return (
      this.tile == null ||
      (this.mergeTile == null && this.tile.value == newTile.value)
    );
  }

  /**
   * Merge tiles on this cell.
   * If this cell doesn't have a tile nor a mergeTile on it, return.
   * Else, set the value of this cell's tile to be the current tile value + the mergeTile value.
   * Clean up by removing the mergeTile element and setting this.mergeTile to null.
   */
  mergeTiles() {
    if (this.#tile == null || this.#mergeTile == null) return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile.remove();
    this.mergeTile = null;
  }
}
