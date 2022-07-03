export default class Tile {
  #tileElement;
  #x;
  #y;
  #value;

  // Equal chances of spawning 2 or 4
  constructor(tileContainer, value = Math.random() > 0.5 ? 2 : 4) {
    this.#tileElement = document.createElement("div");
    this.#tileElement.classList.add("tile");
    tileContainer.append(this.#tileElement);
    this.value = value;
  }

  // The best way to set a variable based on another is using setters and getters
  set value(v) {
    this.#value = v;
    this.#tileElement.textContent = v;
    // Power increases by 1 per tile combination
    const power = Math.log2(v);
    const backgroundLightness = 100 - power * 10;
    this.#tileElement.style.setProperty(
      "--background-lightness",
      `${backgroundLightness}%`
    );
    this.#tileElement.style.setProperty(
      "--text-lightness",
      `${backgroundLightness <= 50 ? 90 : 10}%`
    );
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
