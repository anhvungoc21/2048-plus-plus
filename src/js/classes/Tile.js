import {
  colorDictDefault,
  textColorDictDefault,
  colorDictBlue,
  colorDictGreen,
} from "../colorConfig.js";
import { getColorTheme } from "../config.js";
import { getCombo } from "../gameState.js";
export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  // Equal chances of spawning 2 or 4 normally
  // During combos, spawn 4 or 8
  constructor(tileContainer) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    const randomGen = Math.random();
    if (getCombo()) {
      // Setters!
      this.value = randomGen >= 0.25 ? 4 : 8;
    } else {
      this.value = randomGen >= 0.25 ? 2 : 4;
    }
  }

  // NOTE: The best way to set a variable based on another is using setters and getters
  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;

    // Also set the style of the tile based on its new value
    this.setStyle(v);
  }

  get value() {
    return this.#value;
  }

  // Set x and y indices of tile and tileElement's CSS. This places the tiles in the correct place.
  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  // Remove tile's HTML element
  remove() {
    this.#tileElement.remove();
  }

  /**
   * Wait for the tile to finish transitioning / animating.
   * Animation here is the cell-appearing animation.
   * Transition here is the tile-sliding transition.
   */
  waitForTransition(animation = false) {
    return new Promise((resolve) => {
      this.#tileElement.addEventListener(
        animation ? "animationend" : "transitionend",
        resolve,
        {
          once: true,
        }
      );
    });
  }

  // Set the CSS variables of tile based on its value
  setStyle(v) {
    // Find appropriate color dictionary
    let colorDict;
    const colorTheme = getColorTheme();
    if (colorTheme == "original") {
      colorDict = colorDictDefault;
    } else if (colorTheme == "blue") {
      colorDict = colorDictBlue;
    } else if (colorTheme == "green") {
      colorDict = colorDictGreen;
    }

    const textColorDict = textColorDictDefault;

    // Set tile color
    let tileColor;
    if (v in colorDict) {
      tileColor = colorDict[v];
    } else {
      tileColor = colorDict["super"];
    }
    this.#tileElement.style.setProperty("--color", tileColor);

    // Set text color
    let textColor;
    if (v <= 8) {
      textColor = textColorDict["small"];
    } else {
      textColor = textColorDict["large"];
    }
    this.#tileElement.style.setProperty("--text-color", textColor);
  }
}
