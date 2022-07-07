const menuBoardSize = document.getElementById("collapse--board-size");
const menuColors = document.getElementById("collapse--colors");

import setupGame from "../script.js";
import { setGridSize, setColor } from "../config.js";

function handleToggleBoardSize(e) {
  const choice = e.target.closest(".collapse__sublink");
  if (choice) {
    // Display tick icon
    const parent = choice.closest(".collapse__menu");
    handleTickIcon(choice, parent);

    // Update config and reconstruct board
    const gridSize = parseInt(choice.dataset.boardSize);
    setGridSize(gridSize);
    setupGame();
  }
}

function handleToggleColors(e) {
  const choice = e.target.closest(".collapse__sublink");
  if (choice) {
    // Display tick icon
    const parent = choice.closest(".collapse__menu");
    handleTickIcon(choice, parent);

    // Update config and change color
    const color = choice.dataset.color;
    setColor(color);
  }
}

function handleTickIcon(element, parent) {
  const thisTickIcon = element.querySelector(".check__icon");
  const otherTickIcons = parent.querySelectorAll(".check__icon");
  if (thisTickIcon && otherTickIcons) {
    otherTickIcons.forEach((icon) => icon.classList.add("hidden"));
    thisTickIcon.classList.remove("hidden");
  }
}

export default function handleCollapseMenu() {
  menuBoardSize.addEventListener("click", (e) => handleToggleBoardSize(e));
  menuColors.addEventListener("click", (e) => handleToggleColors(e));
}
