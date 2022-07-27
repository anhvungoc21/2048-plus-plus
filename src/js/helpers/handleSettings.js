import setupGame from "../../index.js";
import {
  setGridSize,
  setColorTheme,
  getColorTheme,
  setSounds,
  getSounds,
  setMusic,
  getMusic,
} from "../config.js";
import {
  colorDictDefault,
  colorDictBlue,
  colorDictGreen,
} from "../colorConfig.js";
import {
  getLoggedIn,
  setBestScore,
  setEmail,
  setPassword,
  setGamesPlayed,
  setUserName,
} from "../userConfig.js";

const css = document.querySelector("[rel='stylesheet']");
const togglerDarkMode = document.getElementById("switch-dark");
const togglerSounds = document.getElementById("switch-sounds");
const togglerMusic = document.getElementById("switch-music");
const togglerAudio = document.getElementById("btn--muted");

let music = undefined;

/* BOARD SIZES */
function handleToggleBoardSize(e) {
  const choice = e.target.closest(".collapse__sublink");
  if (choice) {
    // Display tick icon
    handleTickIcon(choice);

    // Update in localStorage
    const gridSize = parseInt(choice.dataset.boardSize);
    const settings = JSON.parse(window.localStorage.getItem("settings2048++"));
    settings.gridSize = gridSize;
    window.localStorage.setItem("settings2048++", JSON.stringify(settings));

    // In case board size is changed when game is lost
    const lossModal = document.getElementById("modal--loss");
    const gameBoard = document.getElementById("game-board");
    lossModal.style.opacity = 0;
    gameBoard.style.opacity = 1;

    // Update config and reconstruct board
    setGridSize(gridSize);
    setupGame();
  }
}

/* COLOR SCHEMES */
const updateColorByDarkLight = () => {
  const docRoot = document.querySelector(":root");
  const colorTheme = getColorTheme();

  let colorDict;
  if (colorTheme == "original") {
    colorDict = colorDictDefault;
  } else if (colorTheme == "blue") {
    colorDict = colorDictBlue;
  } else if (colorTheme == "green") {
    colorDict = colorDictGreen;
  }

  if (css.href.includes("light-theme")) {
    docRoot.style.setProperty("--primary-color", colorDict["light"]["primary"]);
    docRoot.style.setProperty(
      "--secondary-color",
      colorDict["light"]["secondary"]
    );
    docRoot.style.setProperty(
      "--background-color",
      colorDict["light"]["background"]
    );
    docRoot.style.setProperty("--cell-color", colorDict["light"]["cell"]);
  } else {
    docRoot.style.setProperty("--primary-color", colorDict["dark"]["primary"]);
    docRoot.style.setProperty(
      "--secondary-color",
      colorDict["dark"]["secondary"]
    );
    docRoot.style.setProperty(
      "--background-color",
      colorDict["dark"]["background"]
    );
    docRoot.style.setProperty("--cell-color", colorDict["dark"]["cell"]);
  }
};

function handleToggleColorTheme(e) {
  const choice = e.target.closest(".collapse__sublink");

  if (choice) {
    // Display tick icon
    handleTickIcon(choice);

    // Update config and change color
    const color = choice.dataset.colorTheme;
    setColorTheme(color);

    // Update Tiles' colors
    const tiles = document.querySelectorAll(".tile");
    let colorDict;
    if (color == "original") {
      colorDict = colorDictDefault;
    } else if (color == "blue") {
      colorDict = colorDictBlue;
    } else if (color == "green") {
      colorDict = colorDictGreen;
    }

    tiles.forEach((tile) => {
      const tileValue = parseInt(tile.textContent);
      const tileColor = colorDict[tileValue];
      tile.style.setProperty("--color", tileColor);
    });

    // Update general colors
    updateColorByDarkLight();

    // Update in localStorage
    const settings = JSON.parse(window.localStorage.getItem("settings2048++"));
    settings.colorTheme = color;
    window.localStorage.setItem("settings2048++", JSON.stringify(settings));
  }
}

function handleTickIcon(element) {
  // Parent of chosen element. This is used for selecting other ticks
  const parent = element.closest(".collapse__menu");

  const thisTickIcon = element.querySelector(".check__icon");
  const otherTickIcons = parent.querySelectorAll(".check__icon");
  if (thisTickIcon && otherTickIcons) {
    otherTickIcons.forEach((icon) => icon.classList.add("hidden"));
    thisTickIcon.classList.remove("hidden");
  }
}

const toggleDarkMode = () => {
  const settings = JSON.parse(window.localStorage.getItem("settings2048++"));

  // Update CSS source and set settings for localStorage
  if (css.href.includes("light-theme")) {
    css.href = "./dark-theme.css";
    settings.darkMode = "dark-theme";
  } else {
    css.href = "./light-theme.css";
    settings.darkMode = "light-theme";
  }

  // Update in localStorage
  window.localStorage.setItem("settings2048++", JSON.stringify(settings));

  // Update colors of page
  updateColorByDarkLight();
};

const applyLSSettings = () => {
  const localSettings = window.localStorage.getItem("settings2048++");
  const { darkMode, gridSize, colorTheme } = JSON.parse(localSettings);

  // Grid size
  setGridSize(parseInt(gridSize));
  const gridOptionElement = document.querySelector(
    `[data-board-size="${gridSize}"]`
  );
  handleTickIcon(gridOptionElement);

  // Color theme
  setColorTheme(colorTheme);
  const colorOptionElement = document.querySelector(
    `[data-color-theme="${colorTheme}"]`
  );
  handleTickIcon(colorOptionElement);

  // Dark mode
  if (darkMode == "light-theme") {
    css.href = "./light-theme.css";
    togglerDarkMode.checked = false;
  } else {
    css.href = "./dark-theme.css";
    togglerDarkMode.checked = true;
  }

  updateColorByDarkLight();
};

// bestScore: 2048
// email: "anhvungoc.21@gmail.com"
// gamesPlayed: {4x4: 30, 5x5: 75, total: 120, 6x6: 15}
// password: "TEST"
// settings: {colorTheme: 'green', darkMode: 'dark-theme', gridSize: 5}
// userName: "Fakahrina"

const applyUserSettings = (userObj) => {
  // Info
  setEmail(userObj.email);
  setUserName(userObj.userName);
  setPassword(userObj.password);
  setBestScore(userObj.bestScore);
  setGamesPlayed(userObj.gamesPlayed);

  // Settings
  setGridSize(userObj.settings.gridSize);
  setColorTheme(userObj.settings.colorTheme);
  // Dark mode
  if (userObj.settings.darkMode == "light-theme") {
    css.href = "./light-theme.css";
    togglerDarkMode.checked = false;
  } else {
    css.href = "./dark-theme.css";
    togglerDarkMode.checked = true;
  }

  // Change colors of existing tiles
  const tiles = document.querySelectorAll(".tile");
  const color = getColorTheme();
  let colorDict;
  if (color == "original") {
    colorDict = colorDictDefault;
  } else if (color == "blue") {
    colorDict = colorDictBlue;
  } else if (color == "green") {
    colorDict = colorDictGreen;
  }

  tiles.forEach((tile) => {
    const tileValue = parseInt(tile.textContent);
    const tileColor = colorDict[tileValue];
    tile.style.setProperty("--color", tileColor);
  });

  // Handle tick icons for grid and color choosing
  const gridOptionElement = document.querySelector(
    `[data-board-size="${userObj.settings.gridSize}"]`
  );
  handleTickIcon(gridOptionElement);

  // Color theme
  const colorOptionElement = document.querySelector(
    `[data-color-theme="${userObj.settings.colorTheme}"]`
  );
  handleTickIcon(colorOptionElement);

  // Update colors
  updateColorByDarkLight();
};

export const applySettings = (userObj = null) => {
  if (getLoggedIn() && userObj) {
    applyUserSettings(userObj);
  } else {
    applyLSSettings();
  }
};

const toggleSounds = () => {
  const curSoundsSettings = getSounds();
  // Change settings
  if (curSoundsSettings) {
    setSounds(false);
  } else {
    setSounds(true);
  }
};

const toggleMusic = () => {
  const curMusicSettings = getMusic();

  if (curMusicSettings) {
    setMusic(false);
    if (music != undefined) {
      music.pause();
      music.currentTime = 0;
    }
  } else {
    setMusic(true);
    playMusic();
  }
};

export const playMusic = () => {
  music = new Audio("./chillBackground.mp3");
  // Play music on loop
  const playMusic = () => {
    if (getMusic()) {
      music.play();
      music.addEventListener("ended", playMusic);
    }
  };

  music.addEventListener("canplaythrough", playMusic);
};

const toggleAudio = () => {
  // Update btn icon
  const audioIcons = togglerAudio.querySelectorAll(".icon--top");
  audioIcons.forEach((icon) => icon.classList.toggle("hidden"));

  // Update state
  if (togglerAudio.dataset.muted == "true") {
    // State
    togglerAudio.dataset.muted = "false";
    setSounds(false);
    setMusic(false);

    // Music
    if (music != undefined) {
      music.pause();
      music.currentTime = 0;
    }

    // Togglers display:
    togglerSounds.checked = false;
    togglerMusic.checked = false;
  } else {
    // State
    togglerAudio.dataset.muted = "true";
    setSounds(true);
    setMusic(true);

    // Music
    playMusic();

    // Togglers display:
    togglerSounds.checked = true;
    togglerMusic.checked = true;
  }
};

export const preventTransition = (restartGame) => {
  // Add no-transition classlist to all elements except tiles. This prevents darkMode CSS from running animations.
  document.body.classList.add("no-transition");

  // Same reason, but for restarting the game
  if (restartGame) {
    const lostModal = document.querySelector("#modal--loss");
    const gameBoard = document.querySelector("#game-board");
    lostModal.style.opacity = 0;
    gameBoard.style.opacity = 1;
    // [lostModal, gameBoard].forEach((ele) => ele.offsetHeight); // This is used to trigger CSS flush. Used to be needed.
  }

  // Callback to be called when a promise settles
  const addTransitionCallBack = () =>
    setTimeout(() => document.body.classList.remove("no-transition"), 100);

  // A promise which resolves after 1 second. This caters to changing dark mode where document might not load
  const promiseTime = new Promise((resolve) => {
    setTimeout(() => resolve("TIME"), 1000);
  });

  // A promise which resolves after document is ready
  const promiseReadyState = new Promise((resolve) => {
    document.addEventListener("readystatechange", () => {
      // Ensure that this never fires right when document is ready
      resolve("READY");
    });
  });

  // Race 2 promises to add transition
  Promise.race([promiseTime, promiseReadyState]).then(() => {
    addTransitionCallBack();
  });
};

export function handleSettings() {
  const menuBoardSize = document.getElementById("collapse--board-size");
  const menuColors = document.getElementById("collapse--colors");

  menuBoardSize.addEventListener("click", (e) => handleToggleBoardSize(e));
  menuColors.addEventListener("click", (e) => handleToggleColorTheme(e));
  togglerDarkMode.addEventListener("click", toggleDarkMode);
  togglerSounds.addEventListener("click", toggleSounds);
  togglerMusic.addEventListener("click", toggleMusic);
  togglerAudio.addEventListener("click", toggleAudio);
}
