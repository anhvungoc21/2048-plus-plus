const scoreContainer = document.querySelector(".score-container")
const bestScoreContainer = document.querySelector(".best-container")
/**
 * Fade element in until it reaches 1 opacity
 * @param {*} el Element to fade in
 * @param {*} time Time frames to increase element opacity
 */
function fadeIn(el, time) {
  el.style.opacity = 0;

  let last = +new Date();
  const tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };

  tick();
}

/**
 * Updates score everytime a tile is merged
 * @param {*} tile Tile that is recently added. FIXME: This is faulty. Need to add scores of merged tile.
 */
function updateScore(tile) {
  const scoreAdd = tile.value;
  scoreContainer.dataset.score = parseInt(scoreContainer.dataset.score) + scoreAdd;
  scoreContainer.textContent = `${scoreContainer.dataset.score}` 

  // Remove old "plus-score" transitioning element
  // const oldScoreHtml = document.querySelector(".plus-one");
  // if (oldScoreHtml) {
  //   oldScoreHtml.remove();
  // }

  // Add new "score-addition" element
  const addScoreHtml = document.createElement("div");
  addScoreHtml.classList.add("score-addition")
  addScoreHtml.innerHTML = `+${scoreAdd}`;
  scoreContainer.append(addScoreHtml);
  fadeIn(addScoreHtml, "200");
  setTimeout(function () {
    addScoreHtml.remove();
  }, 1000);
}

export { updateScore }