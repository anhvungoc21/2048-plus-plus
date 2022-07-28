import { createAccount, getAccount } from "../db/db.js";

import {
  getLoggedIn,
  setLoggedIn,
  getEmail,
  setEmail,
  getPassword,
  setPassword,
  setUserName,
  setGamesPlayed,
  setBestScore,
} from "../userConfig.js";

/* Login & Signup */
export const logIn = async (email, password) => {
  // Log in and set necessary configs
  const account = await getAccount(email);
  setLoggedIn(true);
  setEmail(email);
  setPassword(password);
  setUserName(account.userName);
  setGamesPlayed(account.gamesPlayed);
  setBestScore(account.bestScore);
};

export const logOut = () => {
  setLoggedIn(false);
  setEmail(null);
  setPassword(null);
  setUserName(null);
  setGamesPlayed(null);
  setBestScore(null);
};

export const tryLogIn = async (email, password) => {
  const account = await getAccount(email);
  if (!account) {
    return [false, null];
  }
  const registeredPassword = account.password;
  if (registeredPassword != password) {
    return [false, null];
  } else {
    await logIn(email, password);
    return [true, account];
  }
};

export const tryCreateAccount = async (userName, email, password) => {
  const account = await getAccount(email);
  if (!account) {
    await createAccount(userName, email, password);
    logIn(email, password);
    return true;
  } else {
    return false;
  }
};
