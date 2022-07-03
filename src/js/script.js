import Grid from "./classes/Grid.js";
import Tile from "./classes/Tile.js";

import { setupInput } from "./helpers/handleInput.js"
import { handleSettings } from "./helpers/handleSettings.js"

// TODO:
/*
- Fix scaling for board -- No hard-coded values for cellSize
- Implement color buttons
- Implement score updating
*/

/**
 * Sets up event listener for keydown events.
 * This event listener is used once. It is added back after handling each input in `handleInput`
 * @TODO: Allow for mobile swipe events with HTML5.
 */

/**
 * Main function to set up and start game
 */
function setupGame() {
  // Elements:
  const gameBoard = document.getElementById("game-board");

  // Create game board grid
  const grid = new Grid(gameBoard);

  // Generate 2 random tiles
  grid.randomEmptyCell().tile = new Tile(gameBoard);
  grid.randomEmptyCell().tile = new Tile(gameBoard);

  // Set up input listener
  setupInput(grid, gameBoard)
}

// Start Game:
setupGame();
handleSettings();
