const scoreBoard = document.getElementById("score-board");

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
  scoreBoard.dataset.score = parseInt(scoreBoard.dataset.score) + scoreAdd;
  scoreBoard.textContent = `Score: ${scoreBoard.dataset.score} ` 

  // Remove old "plus-score" transitioning element
  const oldScoreHtml = document.querySelector(".plus-one");
  if (oldScoreHtml) {
    oldScoreHtml.remove();
  }

  // Add new "plus-score" element
  const addScoreHtml = document.createElement("span");
  addScoreHtml.classList.add("plus-one");
  addScoreHtml.innerHTML = `+${scoreAdd}`;
  scoreBoard.append(addScoreHtml);
  fadeIn(addScoreHtml, "200");
  setTimeout(function () {
    addScoreHtml.remove();
  }, 1000);
}

export { updateScore }