const scoreContainer = document.querySelector(".score-container");
const bestScoreContainer = document.querySelector(".best-container");

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

export { updateScore };
