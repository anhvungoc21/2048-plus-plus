import {
  getLoggedIn,
  getBestScore,
  setBestScore,
  getGamesPlayed,
  setGamesPlayed,
} from "../userConfig";
import { getGridSize } from "../config";

// Called upon loss or game restart
export const incrementGameCount = () => {
  // Only count games when logged in
  if (!getLoggedIn()) return;

  // Only count a game if number if present tiles is greater than 2
  const gameBoard = document.getElementById("game-board");
  const tiles = gameBoard.querySelectorAll(".tile");
  if (tiles.length <= 2) return;

  const gridSize = getGridSize();
  let gamesPlayedObj = getGamesPlayed();
  let gamesPlayedContainer;
  let newGamesPlayedCount;

  if (gridSize == 4) {
    gamesPlayedObj["4x4"] += 1;
    newGamesPlayedCount = gamesPlayedObj["4x4"];
    gamesPlayedContainer = document.getElementById("games-played--4x4");
  } else if (gridSize == 5) {
    gamesPlayedObj["5x5"] += 1;
    newGamesPlayedCount = gamesPlayedObj["5x5"];
    gamesPlayedContainer = document.getElementById("games-played--5x5");
  } else if (gridSize == 6) {
    gamesPlayedObj["6x6"] += 1;
    newGamesPlayedCount = gamesPlayedObj["6x6"];
    gamesPlayedContainer = document.getElementById("games-played--6x6");
  }

  setGamesPlayed(gamesPlayedObj);

  // Update account modal
  gamesPlayedContainer.textContent = newGamesPlayedCount;
};

export const updateUserBestScore = (curScore) => {
  if (!getLoggedIn()) return;

  const bestScore = getBestScore();
  if (curScore > bestScore) {
    setBestScore(curScore);

    // Update account modal
    const bestScoreContainer = document.getElementById("best-score-data");
    bestScoreContainer.textContent = curScore;
  }
};
