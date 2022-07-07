const menuBoardSize = document.getElementById("collapse--board-size");
const menuColors = document.getElementById("collapse--colors");

import setupGame from "../script.js";
import { setGridSize, setColor } from "../config.js";

function handleToggleBoardSize(e, gridElement) {
  const choice = e.target.closest(".collapse__sublink");
  if (choice) {
    const gridSize = parseInt(choice.dataset.boardSize);
    // Update in config and reconstruct board
    setGridSize(gridSize);
    setupGame();
  }
}

function handleToggleColors(e) {
  const choice = e.target.closest(".collapse__sublink");
  choice && setColor(choice.dataset.color);
}

export default function handleCollapseMenu() {
  const gameBoard = document.getElementById("game-board");
  menuBoardSize.addEventListener("click", (e) =>
    handleToggleBoardSize(e, gameBoard)
  );
  menuColors.addEventListener("click", (e) => handleToggleColors(e));
}
