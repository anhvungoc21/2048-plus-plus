import { setCombo, getCombo, INC_PER_COMBO } from "../gameState.js";

const scoreContainer = document.querySelector(".score-container");
const bestScoreContainer = document.querySelector(".best-container");
const comboContainer = document.querySelector(".combo-container");
const comboBar = document.querySelector(".combo-bar");

/**
 * Updates score everytime a tile is merged
 * @param {*} tile Tile that is recently added.
 */
function updateScore(scoreAdd) {
  if (scoreAdd == 0) return;
  scoreContainer.dataset.score =
    parseInt(scoreContainer.dataset.score) + scoreAdd;
  scoreContainer.textContent = `${scoreContainer.dataset.score}`;

  // Check to update best score
  if (
    parseInt(scoreContainer.dataset.score) >
    parseInt(bestScoreContainer.dataset.bestScore)
  ) {
    const bestScore = scoreContainer.dataset.score;
    bestScoreContainer.dataset.bestScore = bestScore;
    bestScoreContainer.textContent = bestScore;

    // Store in localStorage
    window.localStorage.setItem("bestScore2048++", bestScore);
  }

  // Add new "score-addition" element
  const addScoreHtml = document.createElement("div");
  addScoreHtml.classList.add("score-addition");
  addScoreHtml.innerHTML = `+${scoreAdd}`;
  scoreContainer.append(addScoreHtml);
  setTimeout(function () {
    addScoreHtml.remove();
  }, 600); /* Animation time is 600ms */
}

function updateCombo(combosCount) {
  if (getCombo()) return;
  const currentWidth = parseInt(
    getComputedStyle(comboContainer).getPropertyValue("--width")
  );
  if (currentWidth == 100) return;

  const widthInc = combosCount * INC_PER_COMBO;
  const updatedWidth = widthInc + currentWidth;
  if (updatedWidth >= 100) {
    comboContainer.style.setProperty("--width", "100%");

    // Set combo state, animations.
    setCombo(true);
    comboContainer.style.setProperty("--transition-time", "10s");
    comboContainer.style.setProperty("--width", "0%"); // setInterval's callback doesn't affect this
    comboBar.style.background = "var(--black-color)";
    comboBar.classList.add("blinker");

    // Combo state persists for 10 seconds
    setTimeout(() => {
      setCombo(false);
      comboContainer.style.setProperty("--transition-time", "0.25s");
      comboBar.style.background = "var(--white-color)";
      comboBar.classList.remove("blinker");
    }, 10000);
  } else {
    comboContainer.style.setProperty("--width", `${updatedWidth}%`);
  }
}

export { updateScore, updateCombo };
