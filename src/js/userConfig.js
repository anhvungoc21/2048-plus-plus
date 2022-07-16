let LOGGED_IN = false;
let EMAIL = null;
let PASSWORD = null;
let USERNAME = null;
let GAMESPLAYED = null;
let BESTSCORE = null;

export const getLoggedIn = () => LOGGED_IN;
export const setLoggedIn = (val) => (LOGGED_IN = val);

export const getEmail = () => EMAIL;
export const setEmail = (val) => (EMAIL = val);

export const getPassword = () => PASSWORD;
export const setPassword = (val) => (PASSWORD = val);

export const getUserName = () => USERNAME;
export const setUserName = (val) => (USERNAME = val);

export const getGamesPlayed = () => GAMESPLAYED;
export const setGamesPlayed = (obj) => (GAMESPLAYED = obj);

export const getBestScore = () => BESTSCORE;
export const setBestScore = (val) => (BESTSCORE = val);
