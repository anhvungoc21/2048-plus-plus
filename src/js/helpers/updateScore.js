const scoreBoard = document.getElementById("score-board");

function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) ||
        setTimeout(tick, 16);
    }
  };

  tick();
}

function updateScore(tile) {
  const scoreAdd = tile.value;
  scoreBoard.dataset.score = parseInt(scoreBoard.dataset.score) + scoreAdd;
  scoreBoard.textContent = `Score: ${scoreBoard.dataset.score} ` 

  // Remove old "plus-score" transitioning element
  const oldScoreHtml = document.querySelector(".plus-one");
  if (oldScoreHtml) {
    oldScoreHtml.remove();
  }

  // Add mew "plus-score" element
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