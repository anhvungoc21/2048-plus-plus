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

// TODO:
// 1. Create alert display, modal shaking -- DONE for successful/failed log-ins/sign-ups -- DONE
// 2. Apply settings & scores, update account modal upon successful login
// 3. Fix display problem probably because of setTimeouts
// 4. Before user exits browser or log out, send beacon to update dynamodb
// 5. Log out functionality

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
  if (!account) {
    return false;
  }
  const registeredPassword = account.password;
  if (registeredPassword != password) {
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
