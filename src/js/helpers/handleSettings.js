const menuBoardSize = document.getElementById("collapse--board-size");
const menuColors = document.getElementById("collapse--colors");

import setupGame from "../script.js";
import { setGridSize, setColorTheme, getColorTheme } from "../config.js";
import {
  colorDictDefault,
  colorDictBlue,
  colorDictGreen,
  textColorDictDefault,
} from "../colorConfig.js";

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

function handleToggleColorTheme(e) {
  const choice = e.target.closest(".collapse__sublink");
  if (choice) {
    // Display tick icon
    const parent = choice.closest(".collapse__menu");
    handleTickIcon(choice, parent);

    // Update config and change color
    const color = choice.dataset.colorTheme;
    setColorTheme(color);

    // Update Tiles' colors
    const tiles = document.querySelectorAll(".tile");
    let colorDict;
    const colorTheme = getColorTheme();
    if (colorTheme == "original") {
      colorDict = colorDictDefault;
    } else if (colorTheme == "blue") {
      colorDict = colorDictBlue;
    } else if (colorTheme == "green") {
      colorDict = colorDictGreen;
    }

    tiles.forEach((tile) => {
      const tileValue = parseInt(tile.textContent);
      const tileColor = colorDict[tileValue];
      tile.style.setProperty("--color", tileColor);
    });

    // const textColorDict = textColorDictDefault;
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

export default function handleSettings() {
  menuBoardSize.addEventListener("click", (e) => handleToggleBoardSize(e));
  menuColors.addEventListener("click", (e) => handleToggleColorTheme(e));
}
