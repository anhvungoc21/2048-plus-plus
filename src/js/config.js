let GRID_SIZE = 4;
let PERCENT_VH_MAIN = 80;
let COLOR_THEME = "original";
let SOUNDS = false;
let MUSIC = false;

export const getGridSize = () => GRID_SIZE;
export const getPercentVHMain = () => PERCENT_VH_MAIN;
export const getColorTheme = () => COLOR_THEME;
export const getSounds = () => SOUNDS;
export const getMusic = () => MUSIC;

export const setGridSize = (val) => (GRID_SIZE = val);
export const setPercentVHMain = (val) => (PERCENT_VH_MAIN = val);
export const setColorTheme = (val) => (COLOR_THEME = val);
export const setSounds = (val) => (SOUNDS = val);
export const setMusic = (val) => (MUSIC = val);
