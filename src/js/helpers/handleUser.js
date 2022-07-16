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

export const logIn = async (email, password) => {
  const account = await getAccount(email);
  setLoggedIn(true);
  setEmail(email);
  setPassword(password);
  setUserName(account.userName);
  setGamesPlayed(account.gamesPlayed);
  setBestScore(account.bestScore);
};

// Maybe get from LocalStorage here? Maybe not actually
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
  const registeredPassword = account.password;
  if (!account || registeredPassword != password) {
    return false;
  } else {
    await logIn(email, password);
    return true;
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
