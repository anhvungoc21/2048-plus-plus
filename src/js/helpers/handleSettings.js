const menuBoardSize = document.getElementById("collapse--board-size");
const menuColors = document.getElementById("collapse--colors");
const togglerDarkMode = document.getElementById("switch-dark");

import setupGame from "../script.js";
import { setGridSize, setColorTheme, getColorTheme } from "../config.js";
import {
  colorDictDefault,
  colorDictBlue,
  colorDictGreen,
} from "../colorConfig.js";



/* BOARD SIZES */
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

/* COLOR SCHEMES */
const updateColorByDarkLight = () => {
  const css = document.querySelector("[rel='stylesheet']");
  const docRoot = document.querySelector(":root");
  const colorTheme = getColorTheme();

  let colorDict;
  if (colorTheme == "original") {
    colorDict = colorDictDefault;
  } else if (colorTheme == "blue") {
    colorDict = colorDictBlue;
  } else if (colorTheme == "green") {
    colorDict = colorDictGreen;
  }

  if (css.href.includes("light-theme")) {
    docRoot.style.setProperty("--primary-color", colorDict["light"]["primary"]);
    docRoot.style.setProperty(
      "--secondary-color",
      colorDict["light"]["secondary"]
    );
    docRoot.style.setProperty(
      "--background-color",
      colorDict["light"]["background"]
    );
    docRoot.style.setProperty("--cell-color", colorDict["light"]["cell"]);
  } else {
    docRoot.style.setProperty("--primary-color", colorDict["dark"]["primary"]);
    docRoot.style.setProperty(
      "--secondary-color",
      colorDict["dark"]["secondary"]
    );
    docRoot.style.setProperty(
      "--background-color",
      colorDict["dark"]["background"]
    );
    docRoot.style.setProperty("--cell-color", colorDict["dark"]["cell"]);
  }
};

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

    // Update general colors
    updateColorByDarkLight();
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

const toggleDarkMode = () => {
  const css = document.querySelector("[rel='stylesheet']");

  if (css.href.includes("light-theme")) {
    css.href = "./src/css/dark-theme.css";
  } else {
    css.href = "./src/css/light-theme.css";
  }

  updateColorByDarkLight();
};

export default function handleSettings() {
  menuBoardSize.addEventListener("click", (e) => handleToggleBoardSize(e));
  menuColors.addEventListener("click", (e) => handleToggleColorTheme(e));
  togglerDarkMode.addEventListener("click", toggleDarkMode);
}
