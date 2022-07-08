const scoreContainer = document.querySelector(".score-container");
const bestScoreContainer = document.querySelector(".best-container");

/**
 * Updates score everytime a tile is merged
 * @param {*} tile Tile that is recently added.
 */
function updateScore(tile) {
  // FIXME: This is faulty. Need to add scores of merged tile.
  const scoreAdd = tile.value;
  scoreContainer.dataset.score =
    parseInt(scoreContainer.dataset.score) + scoreAdd;
  scoreContainer.textContent = `${scoreContainer.dataset.score}`;

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
