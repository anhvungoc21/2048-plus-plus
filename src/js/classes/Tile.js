import { colorDictDefault, textColorDictDefault } from "../colorConfig.js";
export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  // Equal chances of spawning 2 or 4
  constructor(tileContainer, value = Math.random() >= 0.25 ? 2 : 4) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  // The best way to set a variable based on another is using setters and getters
  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;

    // TODO: Use different color dicts based on color scheme
    const colorDict = colorDictDefault;
    const textColorDict = textColorDictDefault;

    let tileColor;
    // Set tile color
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

  get value() {
    return this.#value;
  }

  // Set x and y indices of tileElement => Actually place in correct position
  set x(value) {
    this.#x = value;
    this.#tileElement.style.setProperty("--x", value);
  }

  set y(value) {
    this.#y = value;
    this.#tileElement.style.setProperty("--y", value);
  }

  remove() {
    this.#tileElement.remove();
  }

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
}
